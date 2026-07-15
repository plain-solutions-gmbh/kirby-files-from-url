<?php

use Kirby\Cms\App;
use Kirby\Filesystem\F;
use Kirby\Cms\File;
use Kirby\Toolkit\Str;
use Kirby\Toolkit\I18n;
use Kirby\Toolkit\V;
use Kirby\Exception\Exception;
use Kirby\Uuid\Uuid;


$app = App::instance();

$files = F::load(
    $app->root('kirby') . '/config/fields/files.php',
    allowOutput: false
);

$apis = $files['api']();

$writeUuidMetadata = function (File $file) use ($app): File {
    $uuid = $file->content('default')->get('uuid')->value() ?: Uuid::generate();
    $extension = $app->contentExtension();

    $write = function (string $path) use ($uuid) {
        if (F::exists($path) === false) {
            F::write($path, 'Uuid: ' . $uuid);
        }
    };

    if ($app->multilang() === true) {
        foreach ($app->languages() as $language) {
            $write($file->root() . '.' . $language->code() . '.' . $extension);
        }
    } else {
        $write($file->root() . '.' . $extension);
    }

    return $file->parent()->file($file->filename()) ?? $file;
};

foreach ($apis as &$api) {
    if (($api['pattern'] ?? null) !== 'upload') {
        continue;
    }

    $api['action'] = function () use ($writeUuidMetadata) {
        $field = $this->field();

        return $field->upload($this, $field->uploads(), function ($file) use ($field, $writeUuidMetadata) {
            return $field->fileResponse($writeUuidMetadata($file));
        });
    };
}
unset($api);

array_push($apis, [
    'pattern' => 'uploadfromurl',
    'action'  => function () use ($writeUuidMetadata) {

        $url = $this->requestQuery('url');
        $field = $this->field();
        $params = $field->uploads();

        if ($params === false) {
            throw new Exception(
                message: 'Uploads are disabled for this field'
            );
        }

        $parent = $field->uploadParent($params['parent'] ?? null);

        // Validate the Url
        if (!V::url($url)) {
            throw new Exception(I18n::translate('error.validation.url'));
        }

        //Try get filenname
        $path = parse_url($url, PHP_URL_PATH);
        $filename = pathinfo($path, PATHINFO_FILENAME);
        $temp_file = sys_get_temp_dir() . "/" . $filename;

        //Get data
        try {
            F::write($temp_file, file_get_contents($url));
        } catch (\Throwable $th) {
            $msg = $th->getMessage();
            throw new Exception(Str::after($msg, ': '));
        };

        // Set file extension
        $mime      = F::mime($temp_file);
        $filename .= "." . F::mimeToExtension($mime);

        $uuid = Uuid::generate();

        $file = $parent->createFile([
            'source' => $temp_file,
            'template' => $params['template'] ?? null,
            'filename' => $filename,
            'content' => [
                'uuid' => $uuid
            ]
        ], true);

        if ($file instanceof File === false) {
            throw new Exception(
                message: 'The file could not be uploaded'
            );
        }

        return $field->fileResponse($writeUuidMetadata($file));
    }
]);

$files['api'] = fn() => $apis;

return ['files' => $files];
