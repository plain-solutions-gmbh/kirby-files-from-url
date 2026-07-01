<?php

use Kirby\Cms\App;

App::plugin('plain/filesfromurl', [
    'api' => require __DIR__ . '/config/api.php',
    'fields' => require __DIR__ . '/config/fields.php',
]);
