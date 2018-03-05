/**
 * Created by admin on 2015/11/25.
 */
//列表页头部tab下拉
var listtab={
    currentDiv:"",
    oldDiv:'',
    dialogshow:function(element){
        if($(element).hasClass("c-base")){
            this.dialogclose();
        }
        else{
            this.dialogclose();
            this.currentDiv=$(element).parent().data("div");
            $(element).addClass("c-base");
            if(this.dodiv()){
                setTimeout(function(){
                    $("#"+listtab.currentDiv).stop().animate({
                        top:$("#searchtab").outerHeight(true)+$(".head-search").outerHeight(true)+$(".bc-tab").outerHeight(true)
                    },300);
                },300);
            }else{
                $("#"+this.currentDiv).stop().animate({
                    top:$("#searchtab").outerHeight(true)+$(".head-search").outerHeight(true)+$(".bc-tab").outerHeight(true)
                },300);
            }
            $("#mask").fadeIn();
        }
    },
    dialogclose:function(){
        this.oldDiv=this.currentDiv;
        var height=$("#"+this.oldDiv).outerHeight(true);
        $("#"+this.oldDiv).stop().animate({
            top:-height+"px"
        },300);
        $("#mask").hide();
        $("#searchtab").find("a").removeClass("c-base");
    },
    panelhandle:function(obj){
        var text=$(obj).text();
        var height=$("#"+this.currentDiv).outerHeight(true);
        //$(".page-list").find("a").addClass("prevent");
        $("#searchtab").find("li[data-div="+this.currentDiv+"]").find("a").find("span").text(text);
        $(obj).parent().siblings().find("a").removeClass("c-base");
        $(obj).addClass("c-base");
        this.dialogclose();
    },
    dodiv:function(){
        var flag=false;
        $(".tab-search-panel").each(function(){
            var top=$(this).position().top;
            if(top>0){
                flag=true;
                return false;
            }
        });
        return flag;
    }
};

var touchobj=$("#searchtab").find("a"),tabpanel=$(".tab-search-panel").find("a");
$(function(){
    $(".tab-search-panel").each(function(){
        var height=$(this).outerHeight(true);
        $(this).css({"top":-height+"px","max-height":$(window).height()-$(".head-box").outerHeight(true)});
    });
    touch.on(touchobj,'tap',function(event){
        listtab.dialogshow($(this));
    });
  /*  touch.on('span,i','tap',touchobj,function(event){
        listtab.dialogshow($(this).parent());
        event.stopPropagation();
    });*/
    touch.on(tabpanel,'tap',function(ev){
        listtab.panelhandle($(this));
        window.location.href=$(this).attr("href");
        ev.preventDefault();
    });
    touch.on("#mask","tap",function(){
        listtab.dialogclose();
    });
	touch.on("#mask","touchend",function(event){
            event.preventDefault();
    });
    touch.on(tabpanel,'touchend',function(event){
        event.preventDefault();
    });
});