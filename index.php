<?php

use Kirby\Cms\App;

//Extend downwards compatibility
if (version_compare(App::version() ?? '0.0.0', '4.9.9', '>')) {
	/** @disregard P1044 */
	App::plugin('microman/filesfromurl', [
		'api' => require(__DIR__ . '/config/api.php')
	], license: [
		'name'     => 'MIT',
		'status'    => [
			'value'     => 'missing',
			'link'      => 'https://license.microman.ch/?product=904955',
			'theme'     => 'orange',
			'label'     => 'Buy me a coffee',
			'icon'      => 'cup',
		]
	]);
} else {
	App::plugin('microman/filesfromurl', [
		'api' => require(__DIR__ . '/config/api.php')
	]);
}
