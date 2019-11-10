<?php get_header(); ?>

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="row">
                    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                        <!-- post -->

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                </div>

                                <div class="card-body">
                                    <?php if(has_post_thumbnail()): ?>
                                        <?php the_post_thumbnail('thumbnail', array('class' => 'float-left mr-3'));?>
                                    <?php else: ?>
                                        <img src="https://picsum.photos/150/150" width="150" height="150" alt="" class="float-left mr-3">
                                    <?php endif; ?>
                                    <p class="card-text"><?php the_excerpt(); //the_content(''); ?></p>
                                </div>

                                <div class="card-footer">
                                    <a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('Читать далее', 'test') ?></a>
                                </div>
                            </div>
                        </div>

                    <?php endwhile; ?>
                        <!-- post navigation -->
                        <?php the_posts_pagination(array(
                            'show_all'     => false,
                            'end_size'     => 1,
                            'mid_size'     => 2,
                            'type'         => 'list'
                        )); ?>
                    <?php else: ?>
                        <!-- no posts found -->
                        <p>Постов нет...</p>
                    <?php endif; ?>
                </div>
            </div>
            <?php get_sidebar(); ?>

        </div>
    </div>




<?php get_footer(); ?>