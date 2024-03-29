<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <?php wp_head(); ?>
</head>
<body <?php body_class() ?>>

<?php if(is_front_page()): ?>
    <div class="header-image" style="background: url(<?php echo get_custom_header()->url; ?>) center no-repeat; background-size: cover; height: 50vh;"></div>
<?php endif; ?>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <?php if( has_custom_logo() ): the_custom_logo(); ?>
    <?php else: ?>
        <a class="navbar-brand" href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a>
    <?php endif; ?>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <?php
        wp_nav_menu( array(
            'theme_location' => 'header_menu1',
            'container' => '',
            'menu_class' => 'navbar-nav mr-auto',
            'container_id' => 'navbarSupportedContent',
            'walker' => new Test_Menu,
        ) );
        ?>
        <p class="test-phone"<?php if(false === get_theme_mod('test_show_phone')) echo ' style="display: none;"' ?>>
            Телефон: <span><?php echo get_theme_mod('test_phone'); ?></span>
        </p>
    </div>

    <!--<div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>-->
</nav>

<div class="wrapper">

