<?php
add_filter('show_admin_bar', '__return_false');
add_theme_support( 'post-thumbnails' );


define('MY_THEM_ROOT', get_template_directory_uri());
define('MY_THEM_CSS', get_template_directory_uri(). '/css' );
define('MY_THEM_JS', get_template_directory_uri(). '/js' );
define('MY_THEM_IMG', get_template_directory_uri(). '/img' );
define('MY_THEM_FONTS', get_template_directory_uri(). '/fonts' );

// подключаю скрипты и файлы стилей
add_action( 'wp_enqueue_scripts', 'theme_myTestThem_scripts' );
function theme_myTestThem_scripts() {
	wp_enqueue_style( 'style-myTestThem_reset', MY_THEM_CSS . '/reset.css' );
	wp_enqueue_style( 'style-myTestThem', MY_THEM_CSS . '/style.css', array(), '1.0.2');
	

	wp_enqueue_script( 'script-jQueri', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), '3.3.1', true );
	wp_enqueue_script( 'script-myTestThem', MY_THEM_JS . '/script.js', array(), '1.0.5', true );

}
add_action( 'wp_enqueue_scripts', 'myajax_data', 99 );
function myajax_data(){

	
	wp_localize_script( 'script-myTestThem', 'myajax', 
		array(
			'url' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('myajax-nonce')
		)
	);  

}

/*
 * Удаление метабокса
 */
/*function udalenie_metaboksa_metok() {
	$id = 'tagsdiv-post_tag'; // у каждого метабокса есть свой ID, который можно глянуть в исходном коде страницы
	$tip = 'post'; // откуда будем удалять - в данном случае со страниц редактирования записей
	$raspolozhenie = 'side'; // расположение удаляемого метабокса, side - значит в боковой колонке справа
	remove_meta_box( $id, $tip, $raspolozhenie );
}
add_action( 'admin_menu', 'udalenie_metaboksa_metok');*/
/*
 * Добавление метабокса
 */
function dobavlenie_metaboksa(){
	$id = 'truetagsdiv-post_tag'; // ID может быть любой, главное, чтобы отличался от уже существующих метабоксов
	$zagolovok = 'Метки';
	$funkcija = 'kod_metaboksa'; // название обратной (callback) функция, которая собственно и будет выводить содержимое метабокса
	$tip = 'post';
	$raspolozhenie = 'side';
	$prioritet = 'high'; // приоритет вывода, нам подойдет default
	add_meta_box( $id, $zagolovok, $funkcija, $tip, $raspolozhenie, $prioritet );
}
add_action( 'admin_menu', 'dobavlenie_metaboksa');
 
/*
 * Содержимое метабокса
 */
function kod_metaboksa($post) {  
 
	// в данном случае мы просто получаем все метки на блоге в виде массива объектов
	$vse_metki = get_terms('post_tag', array('hide_empty' => 0) ); 
 
	// а теперь - все метки, которые присвоены к записи
	$vse_metki_posta = get_the_terms( $post->ID, 'post_tag' );  
 
	// создаем массив меток поста, состоящий из их ID - он понадобится нам позднее
	$id_metok_posta = array();
	if ( $vse_metki_posta ) {
		foreach ($vse_metki_posta as $metka ) {
			$id_metok_posta[] = $metka->term_id;
		}
	}
 
	// начинаем выводить HTML
	echo '<div id="taxonomy-post_tag" class="categorydiv">';
	echo '<input type="hidden" name="tax_input[post_tag][]" value="0" />';
	echo '<ul>';
	// запускаем цикл для каждой из меток
	foreach( $vse_metki as $metka ){
		// по умолчанию чекбокс отключен
		$checked = "";
		// но если ID метки содержится в массиве присвоенных меток поста, то отмечаем чекбокс
		if ( in_array( $metka->term_id, $id_metok_posta ) ) {
			$checked = " checked='checked'";
		}
		// ID чекбокса (часть) и ID li-элемента
		$id = 'post_tag-' . $metka->term_id;
		echo "<li id='{$id}'>";
		echo "<label><input type='checkbox' name='tax_input[post_tag][]' id='in-$id'". $checked ." value='$metka->slug' /> $metka->name</label><br />";
		echo "</li>";
	}
	echo '</ul></div>'; // конец HTML
}//kod_metaboksa

//Добавляю обработчик Ajax запроса для загрузки категории товаров
if( defined('DOING_AJAX') ){
	add_action( 'wp_ajax_get_category', 'get_category_callback' );
	add_action( 'wp_ajax_nopriv_get_category', 'get_categoryn_callback' );
	
}


function get_category_callback(){

	if( ! wp_verify_nonce( $_POST['nonce_code'], 'myajax-nonce' ) ) die( 'Stop!');

	$cat_id = intval( $_POST['cat_id'] );

	global $post;

	// 
	$tempposts = get_posts( array(
		'category' => $cat_id,
		'nopaging' => 1,
		'order'=> 'DESC'
	) );

	

		foreach( $tempposts as $post ){
			setup_postdata( $post );
			// стандартный вывод записей  
			$mytags = get_the_tags( $post->ID );
			$tags = "";
			foreach( $mytags as $mytag ){
				$img_path = MY_THEM_IMG . '/svg/' . $mytag->slug . '.svg';
					$tags .= '<div class="photo" ><img src="' . $img_path . '" alt=""></div>';
			}
			$mypost = array(
				"id" => $post->ID,
				"thumbnail" => get_the_post_thumbnail_url(),
				"price" => get_post_meta( $post->ID, 'mt_price', true ),
				"card_title" => $post->post_title,
				"card_discription" => $post->post_excerpt,
				"tags" => $tags,
				"img_path" => MY_THEM_IMG
			);

			$myposts[] = $mypost;
		}

	wp_reset_postdata(); // сбрасываем переменную $post
	
	$json_my_posts = json_encode ( $myposts ,  10 , 512 );
	
	echo $json_my_posts;
    wp_die();

}//get_category_callback


