<?php
/**
 * @package canvasio3D
 * @version 1.1.8
 */
/*
Plugin Name: canvasio3D Light
Plugin URI: http://www.virtuellwerk.de/canvasio3D_en
Description: Free 3D-Model viewer | Documentation: <a href="http://www.virtuellwerk.de/pub/doc/canvasio3d_light/English" target="_blank" >English</a> | <a href="http://www.virtuellwerk.de/pub/doc/canvasio3d_light/Deutsch" target="_blank">German</a> || If you need more, maybe our <a href="http://www.virtuellwerk.de/canvasio3d_en/">Canvasio3DPro</a> is for you.
Author: Thomas Scholl
Version: 1.1.8
Author URI: http://www.virtuellwerk.de/
*/

$canvasioId = 0;
//
add_filter('upload_mimes', 'custom_upload_mimes');
//
include('inc/admin.inc.php');
include('inc/init.inc.php');
//
function custom_upload_mimes ( $existing_mimes=array() ) {
	$existing_mimes['js'] = 'application/javascript';
	$existing_mimes['stl'] = 'application/octet-stream';
	$existing_mimes['obj'] = 'application/octet-stream';
	$existing_mimes['dae'] = 'application/octet-stream';
	$existing_mimes['mtl'] = 'application/octet-stream';
	$existing_mimes['bin'] = 'application/octet-stream';
	$existing_mimes['kml'] = 'application/xml';
	return $existing_mimes;
}
?>