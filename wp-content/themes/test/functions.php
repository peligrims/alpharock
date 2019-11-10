<?php

require_once __DIR__ . '/Test_Menu.php';

function debug($data){
    echo '<pre>' . print_r($data, 1) . '</pre>';
}

/*
 * Подключение скриптов и стилей
 */
function test_scripts(){
    wp_enqueue_style('test-bootstrapcss', get_template_directory_uri() . '/assets/bootstrap/css/bootstrap.min.css');
    wp_enqueue_style('test-style', get_stylesheet_uri());

    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), false, true);
    //wp_enqueue_script( 'jquery' );
    wp_enqueue_script('test-popper', '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', array('jquery'), false, true);
    wp_enqueue_script('test-bootstrapjs', get_template_directory_uri() . '/assets/bootstrap/js/bootstrap.min.js', array('jquery'), false, true);
}
add_action('wp_enqueue_scripts', 'test_scripts');

function test_setup(){
    load_theme_textdomain('test', get_template_directory() . '/languages');
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');

    add_theme_support('custom-logo', array(
        'width' => '150',
        'height' => '40',
    ));

    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
        'default-image' => get_template_directory_uri() . '/assets/image/background.png',
    ));

    add_theme_support('custom-header', array(
        'default-image' => get_template_directory_uri() . '/assets/image/coffee.jpg',
        'width' => '2000',
        'height' => '1300',
    ));

    add_image_size( 'my-thumb', 100, 100 );
    register_nav_menus( array(
        'header_menu1' => __('Меню в шапке 1', 'test'),
        'footer_menu2' => __('Меню в футере 2', 'test'),
    ) );
}
add_action( 'after_setup_theme', 'test_setup' );

// удаляет H2 из шаблона пагинации
add_filter('navigation_markup_template', 'my_navigation_template', 10, 2 );
function my_navigation_template( $template, $class ){
    return '
	<nav class="navigation" role="navigation">
		<div class="nav-links">%3$s</div>
	</nav>    
	';
}

// выводим пагинацию
the_posts_pagination( array(
    'end_size' => 2,
) );

function test_widgets_init(){
    register_sidebar( array(
        'name' => __('Сайдбар справа', 'test'),
        'id' => 'right-sidebar',
        'description' => __('Область для виджетов в сайдбаре справа', 'test'),
    ) );
}
add_action('widgets_init', 'test_widgets_init');

// Customizer
function test_customize_register($wp_customize){
    $wp_customize->add_setting('test_link_color', array(
        'default' => '#007bff',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'=>'postMessage',
    ));
    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            'test_link_color',
            array(
                'label' => __('Цвет ссылок', 'test'),
                'section' => 'colors',
                'setting' => 'test_link_color',
            )
        )
    );

    // custom section
    $wp_customize->add_section('test_site_data', array(
        'title' => __('Информация сайта', 'test'),
        'priority' => 10,
    ));
    $wp_customize->add_setting('test_phone', array(
        'default' => '',
        'transport'=>'postMessage',
    ));
    $wp_customize->add_control(
        'test_phone',
        array(
            'label' => __('Телефон', 'test'),
            'section' => 'test_site_data',
            'type' => 'text',
        )
    );

    $wp_customize->add_setting('test_show_phone', array(
        'default' => true,
        'transport'=>'postMessage',
    ));
    $wp_customize->add_control(
        'test_show_phone',
        array(
            'label' => __('Показывать телефон', 'test'),
            'section' => 'test_site_data',
            'type' => 'checkbox',
        )
    );

}
add_action('customize_register', 'test_customize_register');

function test_customize_css(){
$test_link_color = get_theme_mod('test_link_color');
echo <<<HEREDOC
<style type="text/css">
a { color: $test_link_color; }
</style>
HEREDOC;

/**/?><!--
    <style type="text/css">
        a { color: <?php /*echo get_theme_mod('test_link_color'); */?>; }
    </style>
    --><?php
}
add_action('wp_head', 'test_customize_css');

function test_customize_js(){
    wp_enqueue_script('test-customizer', get_template_directory_uri() . '/assets/js/test-customize.js', array( 'jquery','customize-preview' ),	'', true);
}
add_action('customize_preview_init', 'test_customize_js');