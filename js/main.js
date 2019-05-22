function menu(){
    if($(".menu_mob ul").css("display") == "none"){
       $(".menu_mob ul").show("slow");
    }else{
        $(".menu_mob ul").hide("slow");
    }
}
$(document).ready(function(){
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
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }       
      ]
    });
});