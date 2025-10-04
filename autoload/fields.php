<?php

use Kirby\Cms\App;
use Kirby\Filesystem\F;
use Kirby\Cms\File;
use Kirby\Toolkit\Str;
use Kirby\Toolkit\I18n;
use Kirby\Filesystem\Mime;
use Kirby\Toolkit\V;
use Kirby\Exception\Exception;
use Kirby\Query\Query;


$app = App::instance();

$files = F::load(
    $app->root('kirby') . '/config/fields/files.php',
    allowOutput: false
);

$apis = $files['api']();

array_push($apis, [
    'pattern' => 'uploadfromurl',
    'action'  => function () {

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

        $file = $parent->createFile([
            'source' => $temp_file,
            'template' => $params['template'] ?? null,
            'filename' => $filename
        ], true);

        if ($file instanceof File === false) {
            throw new Exception(
                message: 'The file could not be uploaded'
            );
        }

        return $field->fileResponse($file);
    }
]);

$files['api'] = fn() => $apis;

return ['files' => $files];