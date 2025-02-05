<?php

use Kirby\Cms\File;
use Kirby\Toolkit\Str;
use Kirby\Toolkit\I18n;
use Kirby\Filesystem\F;
use Kirby\Filesystem\Mime;
use Kirby\Toolkit\V;
use Kirby\Exception\Exception;
use Kirby\Query\Query;

return [
    'routes' => [
        [
            'pattern' => 'uploadfromurl',
            'action'  => function () {

                $params = $this->requestQuery();

                $url = $params['url'];

                // Validate the Url
                if (!V::url($url)) {
                    throw new Exception(I18n::translate('error.validation.url'));
                }

                // Get Parent
                $query = Query::factory($params['parent']);
                $parent = $query->resolve();

                //Get data
                try {
                    $content = file_get_contents($url);
                } catch (\Throwable $th) {
                    $msg = $th->getMessage();
                    throw new Exception(Str::after($msg, ': '));
                };

                // Try to get a filename from url
                preg_match("/(\w+)\.\w+(?!.*(\w+)(\.\w+)+)/", $url, $filename);
                $filename = end($filename);

                if (empty($filename)) {
                    // Set random filename
                    $filename = Str::uuid();
                }

                $temp_file = sys_get_temp_dir() . "/" . $filename;

                F::write($temp_file, $content);

                // Get/Set the extension
                $mime      = F::mime($temp_file);
                $filename .= "." . F::mimeToExtension($mime);

                // Check Mime
                $accept = $params['accept'] ?? "*";
                $mime = Mime::type($temp_file);

                if ($accept === "*" || Mime::isAccepted($mime, $accept)) {

                    // Create image
                    $file = File::create([
                        'parent' => $parent,
                        'source' => $temp_file,
                        'filename' => $filename,
                        'template' => $params['template'] ?? null
                    ], true);

                    // Check if image uploaded right
                    if ($file instanceof File === false) {
                        F::unlink($temp_file);
                        throw new Exception(I18n::translate('upload.error.default'));
                    }

                    // Formating for output
                    return $file->panel()->pickerData(json_decode($params['fieldinfo'], true));
                } else {

                    // Wrong mime (delete temp_file)
                    F::unlink($temp_file);
                    throw new Exception(I18n::template('error.file.mime.forbidden', ['mime' => $mime]));
                }
            }
        ]
    ]
];
