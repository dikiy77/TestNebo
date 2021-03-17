"use strict";

$( document ).ready(function() {
  var activItems = parseInt($(".card_wrapper").width()/288);
  activItems >= 4 ? 4 : activItems;
  var prevItem = 0;
  var nextItem = activItems + 1;
  var items = $(".singl_card_wrapper");
  var countItems = items.length;
  var activCategory = 1;

  $.each(items,function(index,value){

    if(value.id > activItems )
   
    value.style = "display:none";
    
  
  });//each

  $(".arrow_left").click(function(){
    if(prevItem < countItems && nextItem <= countItems){
      $(`#${++prevItem}`).hide( "slow");
      $(`#${nextItem++}`).show( "slow" );
    }//click
   
   

  });//$(".arrow_left")
   
  $(".arrow_right").click(function(){
    
    if(prevItem > 0){

      $(`#${--nextItem}`).hide( "slow");
      $(`#${prevItem--}`).show( "slow" );
      
    }
    
  });//$(".arrow_right")

  $(".tab_item").click(function(event){
    
      var data = {
        action: 'get_category',
        nonce_code : myajax.nonce,
        cat_id: parseInt(event.currentTarget.id),
      };
  
      // 'ajaxurl' не определена во фронте, поэтому мы добавили её аналог с помощью wp_localize_script()
      $.post( myajax.url, data, function(response) {
        let posts = parseJSON(response);
        $(`#${activCategory}-cat`).removeClass("activ");
          $(`#${event.currentTarget.id}`).addClass("activ");
          activCategory = parseInt(event.currentTarget.id);

        if(posts){
          
          $( "div" ).remove( ".singl_card_wrapper" );
          $("h2").remove(".catalog_title_empty");
          countItems = posts.length;
          prevItem = 0;
          nextItem = activItems + 1;

          let iterator = countItems;
          posts.forEach(post => {
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
          });

          items = $(".singl_card_wrapper");

          $.each(items,function(index,value){

            if(value.id > activItems )
           
            value.style = "display:none";
            
          
          });//each
          
        }//if
        else{
          $("h2").remove(".catalog_title_empty");
          $( "div" ).remove( ".singl_card_wrapper" );
          $(`.arrows`).after(`<h2 class="catalog_title_empty"> В этой категории ничего нет!</h2>`);
        }

        

      });
    
    
  });//$(".tab_list")

  function parseJSON(parJSON)
{
    //если переданный параметр - строка (а то мало ли)
    if(typeof parJSON == "string"){
        //начинаем парсит JSON
        //если браузер поддерживает встроенный JSON, то используем его. Если нет (IE6-7) то используем eval
        return window.JSON && window.JSON.parse ? JSON.parse(parJSON) : eval('('+parJSON+')'); 
    }
    return parJSON;
}  

  $(window).resize(function() {
    let tempItems = parseInt($(".card_wrapper").width()/288);
    if(tempItems === activItems)
      return;
    
    
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
       

 