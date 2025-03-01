<?php

@include_once __DIR__ . '/utils/Plugin.php';

use Plain\Helpers\Plugin;

Plugin::load('plain/filesfromurl', autoloader: ['config']);