var idxOfProduct=0;
var timerOfProduct;
var peopleCount = 0;
var isClickedSlideButton = false;

$(function() {

    // slide 처리
    try {
        var queryString = window.location ? window.location.search : "";
        if (queryString.indexOf("?") > -1) {
            var startIndex = queryString.indexOf("?") + 1,
                endIndex = queryString.indexOf("#")
                ;
            queryString = (endIndex > -1) ? queryString.substring(startIndex, endIndex) :  queryString.substring(startIndex);
            var queryArray = queryString.split("&");
            var keyValue = queryArray[0].split("="),
                key = keyValue[0],
                value;
            if (keyValue.length === 2 && "pcnt" == key) {
                value = keyValue[1];
                if ( "string" == typeof value ) {
                    value = parseInt(value);
                }
                if ( value > -1 && value < 6 ) {
                    peopleCount = value;
                    showPeople( peopleCount );
                }
            }
        }
    }catch(e){

    }

    function nextPeopleIdx(){
        var nextIdx = peopleCount;
        nextIdx++;
        if ( nextIdx > 5 ) {
            nextIdx = 0;
        }
        return nextIdx;
    }
    
    function prePeopleIdx(){
        var preIdx = peopleCount;
        preIdx--;
        if ( preIdx < 0) {
            preIdx = 5;
        }
        return preIdx;
    }
    
    function showPeople( idx , direction) {
        isClickedSlideButton = true;
        if ( "string" == typeof direction && ("left" == direction || "right" == direction ) ){
            $("#faceSlide").children(".cont_slide").hide();
            $("#faceSlide").children(".cont_slide").eq(idx).show("slide",{
                "direction":direction
                , "complete": function(){ 
                        isClickedSlideButton = false;
                    }
                },400
            );
            $("#interviewContents").children(".interview_content").hide();
            $("#interviewContents").children(".interview_content").eq(idx).show();
            $("#current_page").text( idx + 1);
        } else {
            $("#faceSlide").children(".cont_slide").hide();
            $("#interviewContents").children(".interview_content").hide();
            $("#faceSlide").children(".cont_slide").eq(idx).show();
            $("#interviewContents").children(".interview_content").eq(idx).show();
            $("#current_page").text( idx + 1);
            isClickedSlideButton = false;
        }
    }
    

    //왼쪽 슬라이드 이동
    $("#btn_prev").on("click", function(){
        if ( !isClickedSlideButton) {
            peopleCount = prePeopleIdx();
            showPeople( peopleCount , 'left');
        }
    });

    //오른쪽 슬라이드 이동
    $("#btn_next").on("click", function(){
        if ( !isClickedSlideButton) {
            peopleCount = nextPeopleIdx();
            showPeople( peopleCount, 'right' );
        }
    });

 // slide 처리

    	function appendPageLabel() {
		setTimeout(function() {
			$('#fsvs-pagination').find('li.pagination-link')
					.find('.page-label').remove().end().each(
							function(i) {
								$(this).append(
										'<div class="page-label font-roboto">'
												+ sectionNames[i] + '</div>');
							}).on(
							'mouseenter',
							function() {
								$(this).find('.page-label').addClass(
										'animated fadeInRight').css('display',
										'block');
							}).on(
							'mouseleave',
							function() {
								$(this).find('.page-label').removeClass(
										'animated fadeInRight').css('display',
										'none');
							});
		}, 500);
	}

	var $mapView = $('.contact-map'), $messageView = $('.page-email-wrap'), $mapHolder = $(
			'.contact-map').fadeOut(), $messageHolder = $('.page-email-wrap')
			.fadeOut(), $mapBtn = $('.map-btn'), $messageBtn = $('.message-btn'), $emailCancelBtn = $('.email-btn.close');
	var $html = $('html');

	fsvs = $.fn.fsvs({
		speed : 600,
		bodyID : 'fsvs-body',
		selector : '> .page-slide',
		mouseSwipeDisance : 10,
		afterSlide : function() {
		},
		beforeSlide : function() {
			var activePage = $('.active-slide').children(), pageTitle = $(
			'.page-section').find('.page-title > p'), pageContentSectionInfo = $('.content-section-info'), pageContentTitle = pageContentSectionInfo
			.find('.content-title'), pageContentDescription = pageContentSectionInfo
			.find('.page-content-caption');

			/*
			pageTitle.removeClass('animated');
			pageContentTitle.removeClass('animated fadeInUp');
			pageContentDescription.removeClass('animated fadeInUp');
			activePage.find(pageTitle).addClass('animated');
			activePage.find(pageContentTitle).addClass('animated fadeInUp');
			activePage.find(pageContentDescription).addClass('animated fadeInUp');
			appendPageLabel();
			*/

			/*
			if ($('#fsvs-body').css('transition') != 'translate(0px, -400%)') {
				$('.page-email-wrap').hide();
				$('.message-btn').removeClass('btn-close');
				$mapView.hide();
				$mapBtn.removeClass('btn-close');
			}
			*/
		},
		mouseWheelEvents : true,
		mouseWheelDelay : false,
		scrollableArea : 'scrollable',
		mouseDragEvents : false,
		touchEvents : true,
		arrowKeyEvents : true,
		pagination : true,
		nthClasses : false,
		detectHash : true
	});

	var sectionNames = [ 'HOME', 'ONLY', 'PRODUCT', 'SAY', 'PEOPLE', 'ABOUT US' ];
//	var sectionNames = [ 'HOME', 'CONTACT US' ];
	var $body = $('body');

	$messageBtn.on('click', function() {
		if ($mapView.css('display') == 'block') {
			$mapView.hide();
			$mapBtn.toggleClass('btn-close');
		}
		$messageHolder.fadeToggle(function() {
			$messageBtn.toggleClass('btn-close');
		});
	});

	$emailCancelBtn.on('click', function() {
		$messageView.fadeOut();
		$messageBtn.removeClass('btn-close');
	});

	//Main-Product blink effect
	startBlinkProduct();

	$(".product-kind-wrap" ).find("li").hover(function() {
		$(this).removeClass('on');
		stopBlinkProduct(timerOfProduct);
	});



	//Aboutus_contact
	$("#btn_send").click(function () {

		var isReady=true;
		if(!$("#cbox_email").is(":checked"))
		{
			alert("개인 정보 제공에 동의 하셔야 메세지 전송이 가능합니다");
			$("#cbox_email").focus();
		}else
		{
			$('form[name="emailForm"]').find("input, textarea").each(function (){

				var inputName = $(this).attr("placeholder");

				if(!$(this).val())
				{
					alert(inputName+"을 넣어 주세요");
					$(this).focus();
					isReady= false;
					return false;
				}else if("E-Mail"==inputName)
				{
					var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
					if(!regEmail.test($(this).val())) {
					    alert('이메일 주소가 올바르지 않습니다. id@domain.com 형식에 맞게 넣어주세요.');
					    isReady= false;
					    return false;
					}
				}
			});

			if(isReady)
			{
				if(confirm("메세지를 전송하시겠습니까?"))
				{
					$('form[name="emailForm"]').submit();
					$('form[name="emailForm"]').find("input, textarea").val("");
					$("#cbox_email").prop('checked',false);
				}
			}
		}
	});

	$("#btn_cancel").click(function () {
		if(confirm("작성을 취소하시겠습니까?"))
		{
			$('form[name="emailForm"]').find("input, textarea").val("");
		}
	});
	
    // Scroll Top button Event Bind
    if( $(".bt_gotoTop").length > 0 ) {
        $(window).scroll(function( e ) {
            e.stopPropagation();
            
            var posi = $(window).scrollTop();
            if( posi >= 300 ) {
                $(".bt_gotoTop").fadeIn( 1000 );
            } else {
                $(".bt_gotoTop").fadeOut( 1000 );
            }
        });
        
        $("body").on("click", ".bt_gotoTop", function(e) {
            $("html, body").animate({ scrollTop: 0 }, 500 );
            return false;
        });
    }
	
});

function stopBlinkProduct(timerId){
	clearInterval(timerId);
	$(".product-kind-wrap" ).find("li").removeClass('on');
}

function startBlinkProduct(){
	timerOfProduct = setInterval(function () {

		if(idxOfProduct>4)
		{
			idxOfProduct = 0;
		}

		$(".product-kind-wrap" ).find("li").eq(''+idxOfProduct).addClass('on');

		setTimeout(function () {
			$(".product-kind-wrap" ).find("li").eq(''+idxOfProduct).removeClass('on');
			idxOfProduct++;
		},1000);

	}, 2000);
};

//더보기 버튼 토글(20170704)
function toggleTab( id ) {
    if( id ) {
        var elem = document.getElementById( id );
        if( elem.style.display == "none" ) {
            $("#"+id).prev(".section-cont-more").children("a").addClass('close');
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
            $("#"+id).prev(".section-cont-more").children("a").removeClass('close');
        }
    }
}