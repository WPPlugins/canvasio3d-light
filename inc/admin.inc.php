<?php
add_action( 'init', 'wp3D_buttons' );
function wp3D_buttons() {
	wp_enqueue_script( 'jquery' );
	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) return;
	add_filter("mce_external_plugins", "wp3D_add_buttons");
    add_filter('mce_buttons', 'wp3D_register_buttons');
}	
function wp3D_add_buttons($plugin_array) {
	$plugin_array['wp3D'] = plugins_url().'/canvasio3D/inc/js/menu3D.js';
	return $plugin_array;
}
function wp3D_register_buttons($buttons) {
	array_push( $buttons, 'canvasioBtn' );
	return $buttons;
}
?>