function menu(){
    if($(".menu_mob ul").css("display") == "none"){
       $(".menu_mob ul").show("slow");
    }else{
        $(".menu_mob ul").hide("slow");
    }
}
function resizeImgB(el){
    if($(window).width() < 992){        
        if($(el).parent().find(".bimage").css("margin-top") != '0px'){  
            $(".bimage").animate({marginTop:'-'+$('.bimage').height()},500);
            $(el).parent().find(".bimage").animate({marginTop:0},500);
            $(el).parent().find(".bimage .hover_img_block").css("display","block");
        }else{
            $(el).parent().find(".bimage").animate({marginTop:'-'+$('.bimage').height()},500);
        }
    }
}
$(document).ready(function(){
    var containers = $(".containers_one"); 
//    for(var i = 0;i< containers.size();i++){        
//        $(containers[i]).find(".map>iframe").height(($(containers[i]).find(".cont").height())+"px");
//    }    
    $('.feedback_slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        prevArrow:'<span class="slick-prev"><i class="fas fa-angle-left"></i></span>',
        nextArrow:'<span class="slick-next"><i class="fas fa-angle-right"></i></span>',
        responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }       
      ]
    });
});