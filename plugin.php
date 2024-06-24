<?php
/**
 * Solar calculator
 *
 */

function my_theme_enqueue_styles() {
	
	$current_page_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	if (preg_match('/.*calculator.*$/u', $current_page_url)) {
		wp_enqueue_style('solar-calculator-plugin-css', get_template_directory_uri() . '/solar-calculator/assets/index.css', [], wp_rand());
		wp_enqueue_script('solar-calculator-plugin-js', get_template_directory_uri() . '/solar-calculator/assets/index.js', ['jquery', 'wp-element'], wp_rand(), true);
	}
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );