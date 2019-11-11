<?php

/*
Plugin Name:Zoho Forms 
Plugin URI: http://wordpress.org/extend/plugins/zohoforms
Description: Embed forms just about anywhere on your WordPress website. Concentrate on just your content and let us take care of the coding for you.
Version: 2.0
Author: Zoho Forms
Author URI: https://forms.zoho.com
*/

//Shortcode for embeding the form

add_shortcode('zohoForms', 'zohoForms');


function zohoForms($atts, $content = null) {  
	extract(shortcode_atts(array(
		'src' => '',
		'width' => '',
		'height' => ''
	), $atts));	
    return '<iframe height="'.$atts['height'].'" width="'.$atts['width'].'" frameborder="0" allowTransparency="true" scrolling="auto" src="'.$atts['src'].'"> </iframe>';  
}  


// Creation of TinyMCE button

add_action('init', 'add_zohoforms_button');

// Adding filters for the external plugins.

function add_zohoforms_button() {  
   
     add_filter('mce_external_plugins', 'add_zohoForms_plugin');  
     add_filter('mce_buttons', 'register_zohoForms_button');  
     
}  

// Registering the TinyMCE button.

function register_zohoForms_button($buttons) {  
   array_push($buttons, "zohoForms");  
   return $buttons;  
}  

// Returns the plugin_array which contains the values for the shortcode. 

function add_zohoForms_plugin($plugin_array) {  
   $plugin_array['zohoForms'] = plugin_dir_url( __FILE__ ) . 'tinymce/zforms_editor_plugin.js'; 
   return $plugin_array;  
} 

//Including block files
function loadZohoFormsBlockFiles() {
  wp_enqueue_script(
    'zoho-forms-block-js',
    plugin_dir_url(__FILE__) . 'zohoforms-block.js',
    array('wp-blocks', 'wp-i18n', 'wp-editor'),
    true
  );
  wp_localize_script( 'zoho-forms-block-js', 'zohoFormsBlock', array(
      'blockCSS' => plugin_dir_url(__FILE__) . 'zohoforms-block.css',
      'favIconPath' => plugin_dir_url(__FILE__) . 'tinymce/zFormsIcon.png',
      'footerIcon' => plugin_dir_url(__FILE__) . 'tinymce/zoho-logo.png'
    ) );
}



add_action('enqueue_block_editor_assets', 'loadZohoFormsBlockFiles'); 

?>
