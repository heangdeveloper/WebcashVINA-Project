$(document).ready(function(e) {

	'use strict';

	/* header script */
	var clk = 0;
	var index = $('.gnb_nav ul li.active').index();
	//var lf = $('.gnb_nav ul li.active').offset().left;

	$('body').delegate('.btn_gotoTop','click',function(){
		$('html, body').animate({scrollTop : 0},500);
		return false;
	});

	$('.gnb_nav').hover(function() {
		$('.header').addClass('active');
	});

	$('.gnb_nav ul li').click(function() {

		index = $(this).index();
		clk = +1;
		$(this).addClass('active');

	});

	$('.gnb_nav').mouseleave(function() {

		if(clk === 0){
			$('.gnb_nav ul li').removeClass('active');
			$('.gnb_nav ul li').eq(index).addClass('active');
			$('.ani').css({"left":"0","width":"0"});
		}

		if ($(document).scrollTop() >= 1) {
			$('.gnb_nav ul li').removeClass('active');
		} else {
			$('.header').removeClass('active');
			$('.gnb_nav ul li').removeClass('active');
		}

		if(index < 0){
			$('.gnb_nav ul li').removeClass('active');
		}else{
			$('.gnb_nav ul li').eq(index).addClass('active');
			var lf = $('.gnb_nav ul li').eq(index).offset().left;
			$('.ani').css({"left":lf,"width":"95px"});
		}
	});

	$('.gnb_nav ul li').hover(function() {
		var lf = $(this).offset().left;

		$('.ani').css({"left":lf,"width":"95px"});
		$('.ani').css({"left":lf,"width":"95px","-webkit-transition":"all 0.6s ease","transition":"all 0.6s ease"});
	});

	if($('.gnb_nav ul li.active').hasClass('active')){
		var lf = $('.gnb_nav ul li.active').offset().left;
		$('.ani').css({"left":lf,"width":"95px"});
	}


	$(window).resize(function(e) {
		var lf = $('.gnb_nav ul li.active').offset().left;
		$('.ani').css({"left":lf,"width":"95px","-webkit-transition":"all 0s ease","transition":"all 0s ease"});

	});

	$(window).scroll(function() {
		 var hT = $('.container').offset().top,
			hH = $('.container').outerHeight(),
			FH = $('.footer').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();
		if (wS >= (hT+hH-wH)){
			$('.bnt_totop_wrap').css({"position":"fixed","bottom":FH+120});
			$('.bnt_totop_wrap').addClass('noTransition');
		}else{

			$('.bnt_totop_wrap').css("position","fixed");
			$('.bnt_totop_wrap').removeClass('noTransition');
		}

	});

	$(document).on('scroll', function() {

		if ($(this).scrollTop() >= 1) {
			$('.header').addClass('active');
			$('.bnt_totop_wrap').css("bottom","40px");
		} else {
			$('.header').removeClass('active');
			$('.bnt_totop_wrap').css("bottom","-60px");
		}

		$('.header').css('left', -$(this).scrollLeft() + "px");

		var scrollTop = $(window).scrollTop();
		var docHeight = $(document).height();
		var winHeight = $(window).height();
		var scrollPercent = (scrollTop) / (docHeight - winHeight);
		var scrollPercentRounded = Math.round(scrollPercent*100);
		$('.progressbar').css('width', scrollPercentRounded +"%");


	});

});


