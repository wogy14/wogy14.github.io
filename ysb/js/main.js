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
function order_form(){            
    $('.popup').removeClass('d-none').addClass('d-flex');
}
function checker_form(){
    if($(".policy_agree .round span").css("display") == 'inline-block'){
        $(".policy_agree .round span").css("display",'none');
    }
    else{
        $(".policy_agree .round span").css("display",'inline-block');
    }
}
$(document).ready(function(){
    var containers = $(".containers_one"); 
 
    $(".popup").on('click', function (e) {        
        if (e.target == this) $(".popup").addClass('d-none').removeClass("d-flex");
    });
    $(".exit_image").on('click', function (e) {          
        $(".popup").addClass('d-none').removeClass("d-flex");
    });
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        var imgSource = $(this).find('img').attr('src');
        var img = '<img src="' + imgSource + '"/>';        
        $(this).parents('.btn-group').find('.dropdown-toggle').html(img + ' ' + selText + ' <span class="caret"></span>');
    });
    
});