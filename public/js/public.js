var winWidth=$(window).width();
var browser = {
	 versions: function () {
	   var u = navigator.userAgent, app = navigator.appVersion;
	   return {     //移动终端浏览器版本信息
		 mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	   };
	 }(),
	 language: (navigator.browserLanguage || navigator.language).toLowerCase()
}            
if (browser.versions.mobile) {
	//判断是否是移动设备打开。browser代码在下面
} 
else {
	 //否则就是PC浏览器打开
	 var winWidth=640;
};
$("html").css("fontSize",(winWidth/640)*40+"px");


$(function () {
		// 轮播
		if($('#home_slider').size()>0){
			$('#home_slider').flexslider({
				animation : 'slide',
				controlNav : true,
				directionNav : true,
				animationLoop : true,
				slideshow : false,
				useCSS : false,
				slideshow:true,
				slideshowSpeed: 3000
			});	
		}
		if($('#tab').size()>0){
			tabs.init("tab");	
		}
	if($('#details-tab').size()>0) {
		tab("details-tab");
	}
		if($('.number').size()>0){
			if($("#route-list").length>0){
					var totalp=0;
						$(".route-price").each(function(){
							var price=$(this).find("strong").text();
							totalp=operation.accAdd(totalprice,price);
						});
						$("#totalprice").text(totalp);
					}
					else{
						totalprice(1);
					}
			$(".number").numSpinner({
				min:1,max:5,
				onChange:function(evl,value){
					if($("#route-list").length>0){
						routetotalprice();
					}
					else{
						totalprice(value);
					}
				}
			});	
			
			
		}
		$("#mask").height($(document).height());
		$(".tips-wrapper").css("min-height",$(window).height());
		//touch.on(".page-list",'tap',function(){
		//	$(this).find("a").removeClass("prevent");
		//})
		//$("#mask").on("touchstart",function(){
		//	$(".search-item").removeClass("search-show");
		//	$("#list-tab").find("a").removeClass("active");
		//	$("#mask").hide();
		//}).on("touchend",function(){
		//	$(".common-list,.order-list,.goods-list").find("a").addClass("pointer");
		//});
		//$(".common-list,.order-list,.goods-list").on("touchend",function(){
		//	$(".common-list,.order-list,.goods-list").find("a").removeClass("pointer");
		//});
	//返回顶部
	$(window).scroll(function () {
		if($(document).scrollTop() > $(window).height()/4){
			$('.toTop').fadeIn(300);
		}
		if($(document).scrollTop() < $(window).height()/4){
			$('.toTop').fadeOut(300);
		}
	});
	$('.toTop span').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 300);
	});
	//
	if($(".list-tab").length>0){
		$(".list-tab ul").width($(".list-tab li").length*$(".list-tab li").width()+1);
	}
	//底部弹出导航
	/*if($(".footer-layer").length>0){
		$(".footer-layer").css({"bottom":-$(".footer-layer").outerHeight(true)});
		$(".addmore").on("touchstart",function(){
			if($(this).hasClass("on")){
				$(".footer-layer").css({"bottom":-$(".footer-layer").outerHeight(true)});
				$(".addmore").removeClass("on");
			}
			else{
				$(".footer-layer").css({"bottom":"3rem"});
				$(this).addClass("on");
			}
			
		});
	}*/
	//底部弹出导航
	if($(".footer-layer").length>0){
		$(".footer-layer").css({"bottom":-$(".footer-layer").outerHeight(true)});
		$(".addmore").on("touchstart",function(e){
			e.stopPropagation();
			if($(".addmore").hasClass("on")){
				$(".footer-layer").css({"bottom":-$(".footer-layer").outerHeight(true)});
				$(this).removeClass("on");
			}
			else{
				$(".footer-layer").css({"bottom":"3rem"});
				$(this).addClass("on");
				
			}
		});
		
		$(".footer-layer").on("touchstart",function(e){
			e.stopPropagation();
			$(".footer-layer").css({"bottom":"3rem"});
			$(".addmore").addClass("on");
		});
		$(document).on('touchstart',function(){
			$(".footer-layer").css({"bottom":-$(".footer-layer").outerHeight(true)});
			$(".addmore").removeClass("on");	
		});
			
	}
	//智能浮动效果
    if($("#detailmenu").length>0){
        var detailmenuh=$("#detailmenu").outerHeight(true);//菜单高
        $("#detailmenu").find("a").click(function(){
            $("html, body").animate({
                scrollTop: ($($(this).attr("href")).offset().top-detailmenuh+1) + "px"
            }, {
                duration: 400,
                easing: "swing"
            });
            return false;
        });

        var obj = document.getElementById("detailmenu"),eq=0;
        var top = getTop(obj);
        var isIE6 = /msie 6/i.test(navigator.userAgent);
        var navTar = $("#detailmenu");
		$(window).on('scroll touchmove',function(){
			var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//$(".toTop").text(bodyScrollTop);
			//console.log("元素顶部"+top);
			//console.log("滚动高度"+bodyScrollTop);
            if (bodyScrollTop > top){
                obj.style.position = (isIE6) ? "absolute" : "fixed";
                obj.style.top = (isIE6) ? bodyScrollTop + "px" : "0";
            } else {
                obj.style.position = "static";
            }
            navTar.find("a").removeClass("active");
            $(".menu-module").each(function(i){
                var scrolltop=$(this).offset().top;
                if( scrolltop-bodyScrollTop+$(this).height()-detailmenuh+1>0){ //当前元素离body顶部的高-被滚动条卷去的高
                    eq=i;
                    return false;
                }
            });
            navTar.find("li:eq("+eq+")").find("a").addClass("active");
		});


    }
});

var tabs={
	init:function(divid){
		$("#"+divid).find("a").click(function(e){
			var itmeId=$(this).attr("href");
			if(itmeId.substr(0,1)=="#"){
				e.preventDefault();
			}
			$(itmeId).addClass('active').siblings().removeClass("active");
			$(this).parent().addClass('active').siblings().removeClass("active");
		});
	}
};

function totalprice(num){
	var price=$("#price").text();
	$("#totalprice").text(operation.accMul(price,num));
}


function routetotalprice(){
	var totalprice=0;
	$(".number").each(function(){
		var val=$(this).val();
		var price=$(this).parent().next().find("strong").text();
		totalprice=operation.accAdd(totalprice,operation.accMul(val,price));
	});
	$("#totalprice").text(totalprice);
}

//四则运算
var operation={
	accMul:function(arg1,arg2){
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{m+=s1.split(".")[1].length}catch(e){}
		try{m+=s2.split(".")[1].length}catch(e){}
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	},
	accDiv:function(arg1,arg2){
		var t1=0,t2=0,r1,r2;
	    try{t1=arg1.toString().split(".")[1].length}catch(e){}
	    try{t2=arg2.toString().split(".")[1].length}catch(e){}
	    with(Math){
	        r1=Number(arg1.toString().replace(".",""));
	        r2=Number(arg2.toString().replace(".",""));
	        return (r1/r2)*pow(10,t2-t1);
	    }
	},
	accAdd:function(arg1,arg2){
		var r1,r2,m;
	    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
	    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
	    m=Math.pow(10,Math.max(r1,r2));
	    return (arg1*m+arg2*m)/m;
	},
	accSub:function(arg1,arg2){
		var r1,r2,m,n;
	     try{
	         r1=arg1.toString().split(".")[1].length;
	         }catch(e){
	             r1=0;
	             }
	     try{
	         r2=arg2.toString().split(".")[1].length;
	         }catch(e){
	             r2=0;
	             }
	     m=Math.pow(10,Math.max(r1,r2));
	     //last modify by deeka
	     //动态控制精度长度
	     n=(r1>=r2)?r1:r2;
	     return ((arg2*m-arg1*m)/m).toFixed(n);
	}
};
function getTop(e){
    var offset = e.offsetTop;
    if(e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}
 //tab切换
 function tab(id){
	var touchObj=$("#"+id).find("a");
	 $("#tab-panel").find(".details-tab-item:eq(0)").css("height","auto");
	 touch.on(touchObj,'tap',function(){
		 var index=$(this).parent().index(),divid=$(this).data("div");
		 touchObj.removeClass("active");
		 $(this).addClass("active");
		 $("#tab-panel").css("margin-left",-(Math.round(index * 10000)/100).toFixed(2) + '%').find(".details-tab-item").removeAttr("style");
		 $("#"+divid).css("height","auto");
	 });
 }