function menu(){
    if($(".menu_mob ul").css("display") == "none"){
       $(".menu_mob ul").show("slow");
    }else{
        $(".menu_mob ul").hide("slow");
    }
}