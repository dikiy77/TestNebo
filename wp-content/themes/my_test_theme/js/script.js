"use strict";

$( document ).ready(function() {
  var activItems = parseInt($(".card_wrapper").width()/288);
  activItems >= 4 ? 4 : activItems;
  var prevItem = 0;
  var nextItem = activItems + 1;
  var items = $(".singl_card_wrapper");
  var countItems = items.length;

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
    alert('Item selected');
    if(prevItem > 0){

      $(`#${--nextItem}`).hide( "slow");
      $(`#${prevItem--}`).show( "slow" );
      
    }
    
  });//$(".arrow_right")

  $(".tab_item").click(function(){
    alert('Item selected');
    //console.log("rkbr");
      
    
  });//$(".tab_list")

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
       

 