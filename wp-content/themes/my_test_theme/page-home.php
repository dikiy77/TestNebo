<?php

get_header();
?>
            <!--intro start -->
            <section class="intro">
                <div class="wrapper">
                    <h1 class="intro_title">
                        <span class="color_txt">Н</span>астенные и напольные 
                        игровые элементы
                    </h1>
                    <p class="intro_utp">
                        <img src="<?php echo MY_THEM_IMG; ?>/svg/УТП.svg" alt="
                        Отправьте заявку прямо сейчас 
                        и получите
                        максимальную выгоду!" >
                    </p>

                    <button type="submit" onClick="location.href='#!'" class="intro_button">
                        Отправить заявку
                    </button>
                        

                </div>
                
            </section>
            <!--intro end -->
            <p><a name="catalog"></a></p>
            <!--catalog start -->
            <section class="catalog">
            
                <div class="catalog_bg">

                </div>
                <div class="catalog_wrapper">
                    <h2 class="catalog_title">
                        Настенные игровые панели и модули
                    </h2>
                    <!--tabsection start -->
                    <div class="tab_wrapper">
                        <ul class="tab_list">
                            <?php 
                            $categories = get_categories(array(
                                'orderby' => 'term_id',
                                'order' => 'ASC',
                                'hide_empty' => '0'
                            ));


                            foreach( $categories as $category ){

                                $imgsrc = MY_THEM_IMG . $category->description;
                                if($category->term_id == 1)
                                echo '<li id="' . $category->term_id . '-cat" class="tab_item activ">';
                                else
                                echo '<li id="' . $category->term_id . '-cat" class="tab_item">';
                                echo '<img src="' . $imgsrc . '" alt="' . $category->name . '" class="tab_item_img">';                         
                                echo '<p class="tab_item_txt">' . $category->name . '</p>';                                
                                echo '</li>';
                            }
                            ?>
                            
                    
                        </ul>
                    </div>
                    <!--tab_section end -->

                    
                    <!--cards_section start -->
                    <div class="card_wrapper">
                        <div class="arrows">
                            <img src="<?php echo MY_THEM_IMG; ?>/svg/left.svg" alt="left" class="arrow_left">
                            <img src="<?php echo MY_THEM_IMG; ?>/svg/right.svg" alt="right" class="arrow_right">
                        </div>
                        <?php
                        global $post; // не обязательно

                        // 5 записей из рубрики 9
                        $myposts = get_posts( array(
                            'category' => 1,
                            'nopaging' => 1,
                            'order'=> 'ASC'
                        ) );

                        $card_id = 1;

                        foreach( $myposts as $post ):
                            setup_postdata( $post );
                            // стандартный вывод записей 
                           
                            $price = get_post_meta( $post->ID, 'mt_price', true );
                            
                        ?>
                        <div id="<?php echo $card_id++; ?>" class="singl_card_wrapper">
                            <div class="card">
                                <img src="<?php echo MY_THEM_IMG; ?>/svg/card_img.svg" alt="card_img"class="card_img"></img>
                                <div class="card_title">"<?php echo $post->post_title; ?>"</div>
                                <p class="card_discription"><?php echo $post->post_excerpt; ?></p>
                                <div class="card_price">
                                    <p class="price"><?php echo $price; ?> ₽</p>
                                </div>
                                <div class="Card_icons">
                            <?php
                                $mytags = get_the_tags( $post->ID );

                        foreach( $mytags as $mytag ): ?>
                                    <div class="photo" ><img src="<?php echo MY_THEM_IMG; ?>/svg/<?php echo $mytag->slug; ?>.svg" alt=""></div>
                                <?php endforeach; ?>
                                </div>
                                <button  class="button_card">
                                    Купить
                                </button>
                            </div>
                            <div class="card_hover">
                                <img src="<?php echo MY_THEM_IMG; ?>/svg/card_img.svg" alt="card_img"class="card_img"></img>
                                <div class="hover_img">
                                    
                                </div>
                                <img src="<?php echo MY_THEM_IMG; ?>/svg/serch.svg" alt="card_img"class="card_img_vover"></img>
                                <div class="card_title">"<?php echo $post->post_title; ?>"</div>
                                <p class="card_discription"><?php echo $post->post_excerpt; ?></p>
                                <a href="#" class="card_more">Больше информации></a>
                                <div class="card_price">
                                    <p class="price"><?php echo $price; ?> ₽</p>
                                </div>
                                <div class="Card_icons">
                                <?php

                                foreach( $mytags as $mytag ): ?>
                                    <div class="photo" data-title="<?php echo $mytag->name; ?>"><img src="<?php echo MY_THEM_IMG; ?>/svg/<?php echo $mytag->slug; ?>.svg" alt=""></div>
                                <?php endforeach; ?>
                                </div>
                                <button type="submit" onClick="location.href='#!'" class="card_button">
                                    Купить
                                </button>
                            </div>
                        </div>
                                    
                        <?php 
                        
                        
                        endforeach; 
                        
                        wp_reset_postdata(); // сбрасываем переменную $post
                        ?>
                       
                    </div>

                    <!--cards_section start -->

                </div>



            </section>
            <!--catalog end -->
<?php
get_footer();
