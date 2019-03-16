var check = 0;
var header_height = $('#navbar').outerHeight();
$("#main_block").css('padding-top',header_height + 100);
$(function(){
    $(".cbalink").css("display",'none');
    $(".cumf_bt_form_wrapper").css("display",'none');
    $("#navigation").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top,
            scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if(scrolled == 0){
           $('body,html').animate({scrollTop: top - 0.6*$('#navbar').outerHeight()}, 1000);
        }
        else{
            $('body,html').animate({scrollTop: top - $('#navbar').outerHeight() + 10}, 1000);
        }
    });
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled != 0){
        $('#navbar').addClass('dark_nav');        
    }    
});
var blocks = ['main_block','about','portfolio','technologies','process','contacts'];
window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(check == 0){
        if(scrolled != 0){
            $('#navbar').addClass('dark_nav');        
        }
        else{        
            $('#navbar').removeClass('dark_nav');
        }
    }
    
    blocks.forEach(function(item,i,arr){        
        if(scrolled >= $('#'+item).offset().top - $('#navbar').outerHeight(true) && scrolled <= $('#'+item).offset().top + $('#' + item).outerHeight(true)){            
            $('#navigation .active').removeClass('active');
            $('#navigation a[href="#'+item+'"]').addClass('active');
        }
    });    
    
};
function collapse(){
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(check == 0){
        $('#navbar').addClass('dark_nav');
        check = 1;
    }
    else{
        if(scrolled == 0){
            $('#navbar').removeClass('dark_nav');
        }
        check = 0;
    }
}
function submitForm(el){
    var name = $(el).find('input[name="name"]').val(),
        phone = $(el).find('input[name="phone"]').val(),
        email = $(el).find('input[name="email"]').val(),
        text = $(el).find('textarea[name="message"]').val();
    $.post('https://pproger.com/site/form',{form_info:{name:name,phone:phone,text:text,email:email}},function(data){
        $(".error_m").remove();           
        if(data == 'OK'){
            $(el).find('input[name="name"]').val(''),
            $(el).find('input[name="phone"]').val(''),
            $(el).find('input[name="email"]').val(''),
            $(el).find('textarea[name="message"]').val('');
            $(el).hide(600);
            $('.contact_form:first-child').append("<h3 class='success_m'>Успішно відправлено!</h3>");            
        }
        if(data == 'Error:1'){
            $(el).find('input[name="name"]').after("<p class='error_m'>Ім'я має містити в собі мінімум 2 символи!</p>");            
        }else
        if(data == 'Error:2'){
            $(el).find('input[name="email"]').after("<p class='error_m'>Введіть правильний E-mail!</p>");            
        }else
        if(data == 'Error:3'){
            $(el).find('input[name="phone"]').after("<p class='error_m'>Введіть правильний телефон у форматі: +380XXXXXXXXX або +7XXXXXXX!</p>");          
        }else
        if(data == 'Error:4'){
            $(el).find('textarea[name="message"]').after("<p class='error_m'>Повідомлення повинно містити мінімум 10 символів і максимум 300!</p>");          
        }       
    });    
}