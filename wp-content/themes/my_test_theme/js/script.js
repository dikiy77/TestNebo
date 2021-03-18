"use strict";

$( document ).ready(function() {
  // для отзывчивости переменная хранит количество карточек
  // которые помещаются на экране
  var activItems = parseInt($(".card_wrapper").width()/288);
  activItems >= 4 ? 4 : activItems;
  //хранит id предидущей и следующей карточек
  var prevItem = 0;
  var nextItem = activItems + 1;
  //хранит ссылки на все карточки текущей категории
  var items = $(".singl_card_wrapper");
  // количество всех карточек
  var countItems = items.length;
  // текущая категория
  var activCategory = 1;
  // скрываем лишние карточки
  $.each(items,function(index,value){

    if(value.id > activItems )
   
    value.style = "display:none";
    
  
  });//each

  //клик по стрелке карусели
  $(".arrow_right").click(function(){
    if(prevItem < countItems && nextItem <= countItems){
      $(`#${++prevItem}`).hide( "slow");
      $(`#${nextItem++}`).show( "slow" );
    }//if

  });//$(".arrow_right")
   
  //клик по стрелке карусели
  $(".arrow_left").click(function(){
    if(prevItem > 0){
      $(`#${--nextItem}`).hide( "slow");
      $(`#${prevItem--}`).show( "slow" );
    }//if
    
  });//$(".arrow_left")

  // Смена категории
  $(".tab_item").click(function(event){
     //если выбрана та же категория то обрываем выполнение
      if(activCategory === parseInt(event.currentTarget.id))
      return;

      //аргументы для пост-запроса
      var data = {
        action: 'get_category', //обработчик на сервере
        nonce_code : myajax.nonce,
        cat_id: parseInt(event.currentTarget.id), //id требуемой категории товаров
      };
  
      //отправка запроса и обработка ответа
      $.post( myajax.url, data, function(response) {
        //переменная хранит переданные данные всех постов
        let posts = parseJSON(response); // ответ приходит в виде JSON его нужно распарсить
          //меняем активную категорию и выделение в разметке
          $(`#${activCategory}-cat`).removeClass("activ");
          $(`#${event.currentTarget.id}`).addClass("activ");
          activCategory = parseInt(event.currentTarget.id);

        if(posts){
          //если группа не пустая то удаляем карточки старой группы
          $( "div" ).remove( ".singl_card_wrapper" );
          //если перед этим была пустая группа то чистим и за ней
          $("h2").remove(".catalog_title_empty");
          //обновляем переменные
          countItems = posts.length;
          prevItem = 0;
          nextItem = activItems + 1;
          // переменная для хранения id для карточек
          let iterator = countItems;
          // перебираем посты 
          posts.forEach(post => {
            // добавляем посты по одному в DOM документа после блока стрелок
            $(`.arrows`).after(`<div id="${iterator--}" class="singl_card_wrapper unactiv">
              <div class="card">
                  <img src="${post['thumbnail']}" alt="card_img"class="card_img"></img>
                  <div class="card_title">„${post['card_title']}“</div>
                  <p class="card_discription">${post['card_discription']}</p>
                  <div class="card_price">
                      <p class="price">${post['price']} ₽</p>
                  </div>
                  <div class="Card_icons">
                  ${post['tags']}
                  </div>
                  <button  class="button_card">
                      Купить
                  </button>
              </div>
              <div class="card_hover">
                  <img src="${post['thumbnail']}" alt="card_img"class="card_img"></img>
                  <div class="hover_img">
                      
                  </div>
                  <img src="${post['img_path']}/svg/serch.svg" alt="card_img"class="card_img_vover"></img>
                  <div class="card_title">„${post['card_title']}“</div>
                  <p class="card_discription">${post['card_discription']}</p>
                  <a href="#" class="card_more">Больше информации></a>
                  <div class="card_price">
                      <p class="price">${post['price']} ₽</p>
                  </div>
                  <div class="Card_icons">
                  ${post['tags']}
                  </div>
                  <button type="submit" onClick="location.href='#!'" class="card_button">
                      Купить
                  </button>
              </div>
            </div>`);
          });//forEach

          // обновляем коллекцию карточек
          items = $(".singl_card_wrapper");
          //скрываем лишние карточки
          $.each(items,function(index,value){
            if(value.id > activItems )
            value.style = "display:none";
          });//each
          
        }//if
        else{
          // если постов нет то сообщаем об этом и удаляем старые карточки
          $("h2").remove(".catalog_title_empty");
          $( "div" ).remove( ".singl_card_wrapper" );
          $(`.arrows`).after(`<h2 class="catalog_title_empty"> В этой категории ничего нет!</h2>`);
        }//if

        

      });// $.post
    
    
  });//$(".tab_list")

  // функция для безопасного парсинга JSON
  function parseJSON(parJSON)
{
    //если переданный параметр - строка (а то мало ли)
    if(typeof parJSON == "string"){
        //начинаем парсит JSON
        //если браузер поддерживает встроенный JSON, то используем его. Если нет (IE6-7) то используем eval
        return window.JSON && window.JSON.parse ? JSON.parse(parJSON) : eval('('+parJSON+')'); 
    }//if
    return parJSON;
}  //parseJSON

  // отзывчивость карусели, реагируем на изменение размера окна
  $(window).resize(function() {
    let tempItems = parseInt($(".card_wrapper").width()/288);
    // если количество выводимых карточек не меняется то обрываем
    if(tempItems === activItems)
      return;
    
    // иначе реагируем
    activItems = tempItems;
    nextItem = prevItem + activItems +1;
    
    $.each(items,function(index,value){

    let tempItems = parseInt($(".card_wrapper").width()/288);
      if(+prevItem < +value.id && +value.id < +nextItem ) {
        value.style = "display:block";
      }       
      else{
        value.style = "display:none";
      }
     
    });

  });//$(window).resize

  


});//$( document ).ready
       

 