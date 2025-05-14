$(document).ready(function() {
     
    
    // disable Scroll
    function disableScroll() {
        // Get the current page scroll position 
        scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft,

            // if any scroll is attempted, 
            // set this to the previous value 
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }

    // Enable Scroll
    function enableScroll() {
        window.onscroll = function() {};
    }

    $(window).scroll(function() {
        var hT = $('header').offset().top,
            hH = $('header').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        // console.log(hH);

        if ($(window).width() > 1024) {
            if (hT > 100) {
                // alert('you have scrolled top!');
                //console.log('you have scrolled down!');
                $('header .logo').addClass('active');
                $('header .menu-wrap').addClass('active');
                $('header .hamburger').addClass('active');
            } else if (hT == 0) {
                //console.log('you have scrolled top!');
                $('header .logo').removeClass('active');
                $('header .menu-wrap').removeClass('active');
                $('header .hamburger').removeClass('active');
            }
        }

    });

    $('.hamburger').on("click tap", function() {
        $(this).toggleClass('open');
        $('header .menu-wrap').toggleClass('open');
        $('header .hamburger-logo').toggleClass('active');
        $('body').toggleClass('bodyOverflowHidden');
        $('.overlay-body').toggleClass('active');
        //alert('hi');
    });


    if ($(window).width() < 1025) {
        $('header ul.menu > .li-link').removeClass('active');
        $('header ul.menu > .li-link > a, .plus').on("click", function(e) {
            //console.log('header link');
            //e.preventDefault();
            $(this).parents("li").siblings().removeClass('active');
            $(this).parents("li").toggleClass('active')

            if (!$(this).parents("li").find('.dropdown').hasClass('active')) {
                $('.dropdown').slideUp();
                $('.link').removeClass('active');
                // console.log('hi ====');   
            }
            // console.log('hello ====');
            $(this).parents("li").find('.link').toggleClass('active');
            $('.dropdown').removeClass('active');
            $(this).parents("li").find('.dropdown').slideToggle();
            $(this).parents("li").find('.dropdown').toggleClass('active');
            //console.log('exit ====');


        });
    }

    $('header ul.menu .inner-li-link').on("click", function(j) {
        //alert('inner li');    
        var dropDown = $(this).find('.inner-dropdown');
        $(this).closest('.dropdown').find('.inner-dropdown').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.dropdown').find('.inner-li-link.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();
        //j.preventDefault();

    });


    // map counter dropdown
    if ($(window).width() < 1025) {
        // var allPanels = $('.content-wrap .col .stats-container').hide();
        $('.content-wrap .col .bigCounter').on("click", function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.arrow').removeClass('active');
                $(this).siblings('.stats-container').slideUp();
            } else {
                $(this).siblings('.arrow').addClass('active');
                $(this).siblings('.stats-container').slideDown();
                $(this).addClass('active');
            }
            return false;
        });
    }




    if ($('.sec-slider').length) {
        var owlHomeBanner = $('#homeBanner.owl-carousel');

        var vid = document.getElementById("myVideo");
        owlHomeBanner.owlCarousel({
            loop: true,
            nav: true,
            dots: true,
            dotsData: false,
            items: 1,
            smartSpeed: 600,
            autoplaySpeed: 600,
            autoplay: false,
            autoplayTimeout: 11000,
            mouseDrag: true,
            video: true,

            onInitialized: function(event) {
                owlSlideInitiate();
                // listen for keyboard input
                $(document).on('keydown', function(event) {
                    //attach event listener
                    if (event.keyCode == 37) {
                        owlHomeBanner.trigger('prev.owl');
                        //console.log('prev owl owlHomeBanner');
                    }
                    if (event.keyCode == 39) {
                        owlHomeBanner.trigger('next.owl');
                        //console.log('next owl owlHomeBanner');
                    }
                });
            },

            onTranslate: function(event) {
                var currentSlide, player, command;
                currentSlide = $('.owl-item.active');
                player = currentSlide.find(".ytplayer-wrap iframe").get(0);
                command = {
                    "event": "command",
                    "func": "pauseVideo"
                };
                if (player != undefined) {
                    player.contentWindow.postMessage(JSON.stringify(command), "*");
                }
            }
        });

        var videoInterval;
        var clearTO;
        var playTimerInterval;
        var isVideo = $('.owl-item.active').find('.video').length;

        function owlSlideInitiate(isVideo) {
            //console.log($('.owl-dot.active').index());
            if ($('.owl-dot.active').index() == 0) {
                if (vid.currentTime == 0) {
                    vid.play();
                }
                playTimerInterval = setInterval(function() {
                    if (vid.currentTime == vid.duration && vid.ended) {
                        vid.pause();
                        vid.currentTime = 0;
                        owlHomeBanner.trigger('next.owl.carousel');
                        clearInterval(playTimerInterval);
                        //console.log('index if - ' + $('button.owl-dot.active').index());
                        clearTO = setInterval(function() {
                            owlHomeBanner.trigger('next.owl.carousel');
                            //console.log('index if - ' + $('button.owl-dot.active').index());
                        }, 10000)
                    }
                }, 500);
            }
        }
        $('.owl-dot').on('click', function() {
                if (!$(this).hasClass('active')) {
                    vid.pause();
                    vid.currentTime = 0;
                    clearInterval(playTimerInterval);
                    clearInterval(clearTO);
                    clearTO = setInterval(function() {
                        owlHomeBanner.trigger('next.owl.carousel');
                        //console.log('index if - ' + $('button.owl-dot.active').index());
                    }, 10000);
                }
            })
            // videoTimer();

        owlHomeBanner.on('changed.owl.carousel', function(e) {
            if (e.item.index == 3) {
                clearInterval(clearTO);
                owlSlideInitiate();
            }
        });


    }

    window.addEventListener('scroll', function(e) {

        if ($('.sec-partners').length) {

            if (isOnScreen($('#partners'))) {
                //console.log('partners');
                var owlPartners = $('#partners .owl-carousel');
                owlPartners.owlCarousel({
                    margin: 30,
                    loop: true,
                    nav: true,
                    dots: false,
                    smartSpeed: 250,
                    slideTransition: 'linear',
                    mouseDrag: false,
                    lazyLoad: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 80
                        },
                        361: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 100
                        },
                        375: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 70
                        },
                        481: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 90
                        },
                        768: {
                            items: 3,
                            slideBy: 2
                        },
                        1200: {
                            items: 4,
                            slideBy: 3
                        }
                    },
                });
            }

            if (isOnScreen($('#funders'))) {
                //console.log('funders');
                var owlFunders = $('#funders .owl-carousel');
                owlFunders.owlCarousel({
                    margin: 30,
                    loop: true,
                    nav: true,
                    dots: false,
                    smartSpeed: 250,
                    slideTransition: 'linear',
                    mouseDrag: false,
                    lazyLoad: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 80
                        },
                        361: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 100
                        },
                        375: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 80
                        },
                        481: {
                            center: true,
                            items: 1,
                            margin: 0,
                            nav: false,
                            stagePadding: 90
                        },
                        768: {
                            items: 3,
                            slideBy: 2
                        },
                        1200: {
                            items: 4,
                            slideBy: 3
                        }
                    },
                });
            }
        }


    });


    if ($('.sec-news').length) {
        var owlNews = $('#news .owl-carousel');
        owlNews.owlCarousel({
            autoWidth: true,
            // margin: 60,
            loop: false,
            nav: true,
            dots: false,
            smartSpeed: 500,
            slideTransition: 'linear',
            mouseDrag: false,
            autoplay: false,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1,
                    singleItem: true,
                    // center:true,
                    nav: false
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                }
            },
        });
    }

    if ($('.sec-testimonials').length) {
        var owlTestimonials = $('#testimonials .owl-carousel');
        owlTestimonials.owlCarousel({
            navigation: true,
            items: 1,
            loop: true,
            nav: true,
            dots: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            mouseDrag: false,
            autoplayHoverPause: true,
            smartSpeed: 250,
            slideTransition: 'linear',
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 9000,

            onInitialized: function(event) {
                // listen for keyboard input
                $(document).on('keydown', function(event) { //attach event listener
                    if (event.keyCode == 37) {
                        owlTestimonials.trigger('prev.owl');
                        //console.log('prev owl testimonials');
                    }
                    if (event.keyCode == 39) {
                        owlTestimonials.trigger('next.owl');
                        //console.log('next owl testimonials');
                    }
                });
            }
        });

        owlTestimonials.on('changed.owl.carousel', function(e) {
            // console.log('onchange owlTestimonials');
            owlTestimonials.trigger('stop.owl.autoplay');
            owlTestimonials.trigger('play.owl.autoplay');
        });
    }

    if ($('.our-approach-main').length) {
        var owlApproachBanner = $('#ApproachBanner.owl-carousel');

        owlApproachBanner.owlCarousel({
            loop: true,
            nav: true,
            dots: true,
            dotsData: false,
            items: 1,
            smartSpeed: 600,
            autoplaySpeed: 600,
            autoplay: true,
            autoplayTimeout: 7000,
            mouseDrag: true,

            onInitialized: function() {

                // listen for keyboard input
                $(document).on('keydown', function(event) {
                    //attach event listener
                    if (event.keyCode == 37) {
                        owlApproachBanner.trigger('prev.owl');
                        //console.log('prev owl owlApproachBanner');
                    }
                    if (event.keyCode == 39) {
                        owlApproachBanner.trigger('next.owl');
                        //console.log('next owl owlApproachBanner');
                    }
                });
            }

        });


    }

    $('ul.tabs li.tab-link').click(function() {

        var index = $(this).index();
        // var contentIndex = $('.sec-core-bn .content').length;
        // console.log('index = ', index, '  &&  contentIndex = ', contentIndex);
        $('.sec-abt-bn .content').show();
        if (index != 1) {
            $('.sec-abt-bn .content').hide();
        }

        if ($(window).width() > 1024) {
            $('#tab-1.active .svg-desktop').load('https://fes.org.in/images/overview_infographic.svg');
        } else {
            $(".tab-drop-wrap ul.tabs span.line").remove();

            $('#tab-1.active .svg-mobile').load('https://fes.org.in/images/overview-infographic-mobile.svg');
        }

        var tabName = $(this).attr('data-name');
        //console.log('tabName', tabName);
        $('.bgImg .tab1').removeClass('active');
        if (index = 1 && tabName === 'our-approach') {
            //console.log('hi, our-approach');
            $('.bgImg .tab1').addClass('active');
        }


        //tabLink();
        var tab_id = $(this).attr('data-tab');
        var tabLink = $(this).attr('data-link');
        //console.log('tabLink', tabLink);
        //var imgPath = 'https://prodigedigital.com/projects/humanx/FES/images/inner-banner/';
        var imgPath = 'https://fes.org.in/images/inner-banner/';
        var imgURL = imgPath + tabLink + "-bn.jpg";
        var circleimgURL = imgPath + tabLink + "-small.png";
        //console.log(imgURL);

        $('ul.tabs li').removeClass('active');
        $('.tab-content').removeClass('active');
        $('.dots-line-wrap ul.ul-line li').removeClass('active');
        $('.bgImg .container .content #bn-' + tab_id).removeClass('active');
        $(".bgImg").css("background-image", "url(" + imgURL + ")");
        $(".smallImg").css("background-image", "url(" + circleimgURL + ")");

        $(this).addClass('active');
        $('.dots-line-wrap ul.ul-line #line-' + tab_id).addClass('active');
        $('.bgImg .container .content #bn-' + tab_id).addClass('active');
        $("#" + tab_id).addClass('active');

        // var atag = $(this).find("a").text();
        // console.log(atag);

    });

    if ($(window).width() < 1025) {
        $("ul.tabs").on("click", ".init", function() {
            $(this).closest("ul").children('li:not(.init)').toggle();
            $("ul.tabs").toggleClass('active');
            $('span.arrow').toggleClass('active');
        });

        var allOptions = $("ul.tabs").children('li:not(.init)');

        $("ul.tabs").on("click", "li:not(.init)", function() {
            $('span.arrow').toggleClass('active');
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $("ul.tabs").children('.init').html($(this).html());
            $("ul.tabs").removeClass('active');
            allOptions.toggle();

            if (!$(this).find('.tab-content').hasClass('active')) {
                $("ul.tabs li").removeClass('active').removeAttr("style");
                //$('.tab-content').removeClass('active');
                //console.log('hi ====');
            }
            //$('.tab-content').removeClass('active');
            var tab_id = $(this).attr('data-list');
            //console.log(tab_id);
            $(this).removeClass('active').removeAttr("style");
            //$('.tab-content').removeClass('active').removeAttr("style");
            $(this).addClass('active');
            $("?" + tab_id).fadeIn(500).addClass('active').removeAttr("style");

        });

    }

    // Board Block
    if ($('.board-wrap').length) {

        if ($(window).width() > 1024) {
            var showChar = 350; // How many characters are shown by default
            var ellipsestext = "...";
            var moretext = '<div class="btn-read flex-wrap"><span>read more</span> <img src="images/circle-arrow.svg" alt=""></div>';
            var lesstext = '<div class="btn-read flex-wrap readLess"><span>read less</span> <img src="images/circle-arrow.svg" alt=""></div>';


            $('p.more').each(function() {
                var content = $(this).html();
                if (content.length > showChar) {
                    var c = content.substr(0, showChar);
                    var h = content.substr(showChar, content.length - showChar);
                    var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
                    $(this).html(html);
                }
            });

            $(".morelink").click(function() {
                if ($(this).hasClass("less")) {
                    $(this).removeClass("less");
                    $(this).html(moretext);
                } else {
                    $(this).addClass("less");
                    $(this).html(lesstext);
                }
                $(this).parent().prev().toggle();
                $(this).prev().toggle();
                return false;
            });
        }


        $('.board-wrap ul.mobile-wrap li').on('click', function(e) {
            e.preventDefault();
            if (!$(this).find('.memberData').hasClass('active')) {
                $(this).removeClass('active');
                $('.memberData').removeClass('active');
                //  console.log('hi ====');
            }
            var index = 0;
            index = $(this).index();
            //console.log(index);


            $('body').toggleClass('active');
            $('header').toggleClass('active');
            $('.tab-drop-wrap').toggleClass('zindex');
            $('.desktopPop-wrap').toggleClass('is-visible');

            var tab_id = $(this).attr('data-mem');
            //console.log(tab_id);

            $(this).removeClass('active');
            $('.memberData').removeClass('active').removeAttr("style");

            $(this).addClass('active');
            $("#" + tab_id).fadeIn(500).addClass('active').removeAttr("style");

            // prev next 
            var divs = $('ul.desktopPop .memberData');
            var now = index;
            //console.log('now ---', now);            
            //console.log(divs.length, now);

            $(".btn-popup-group .btn-next").on('click', function() {

                divs.eq(now).removeClass('active').removeAttr("style");
                //console.log('now ---', now);
                now = (now + 1 < divs.length) ? now + 1 : 0;
                divs.eq(now).addClass('active');
                //console.log('next - ', now);

            });
            $(".btn-popup-group .btn-prev").on('click', function() {

                divs.eq(now).removeClass('active').removeAttr("style");
                now = (now > 0) ? now - 1 : divs.length - 1;
                divs.eq(now).addClass('active');
                //console.log('prev - ', now);
            });

        });

        $('ul.desktopPop .close').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('active');
            $('header').toggleClass('active');
            $('.tab-drop-wrap').toggleClass('zindex');
            $('.desktopPop-wrap').toggleClass('is-visible');

            $('ul.mobile-wrap li').removeClass('active').removeAttr("style");
            $('.memberData').removeAttr("style").removeClass('active');

        });


    }

    /* filter functionality for resources page starts */
    if($(".filter-box").length) {
        // $(".filter-box ul > li").each(function() {
        //     if($(this).children("ul").length) {
        //         $(this).addClass("has-child");
        //     }
        // });

        $(document).on("click", ".filter-box .has-child > label" ,function(e) {
            //console.log($(this).siblings("ul").is(":visible"));

            if(e.target.tagName == "I") {
                if($(this).siblings("ul").length) {
                    if($(this).siblings("input").prop("checked")) {
                        $(this).siblings("input").prop("checked", false);
                        $(this).siblings("ul").find("li").find("input").prop("checked", false);
                    }
                    else {
                        $(this).siblings("input").prop("checked", true);
                        $(this).siblings("ul").find("li").find("input").prop("checked", true);
                    }
                    return false;
                }
            }

            

            if($(window).width() > 640) {
                $(this).siblings("ul").slideToggle();
                $(this).parent(".has-child").toggleClass("display-children");
            }
            else {
                $(this).siblings("ul").slideToggle(0).parent(".has-child").siblings(".has-child").children("ul").hide();
                $(this).parent(".has-child").toggleClass("display-children").siblings(".has-child").removeClass("display-children");
            }
            
        })

    };


});



$(window).load(function() {
    //alert("window is loaded");
    $(".bgImg .container .tab-content").eq(0).addClass("active");
    $("ul.tabs li.tab-link").eq(0).addClass("active selected");
    $(".tab-container .tab-content").eq(0).addClass("active");

    var url = window.location.href;
    var headerHref = url.split("?").pop();
    //console.log(headerHref, 'url');

    $("ul.tabs li.tab-link").each(function() {
        var dataLink = $(this).attr('data-link');

        if (dataLink == headerHref) {
            //console.log('page to action', headerHref , dataLink);
            $(this).click();
        }

    });

    if ($(window).width() > 1024) {
        $('#tab-1.active .svg-desktop').load('https://fes.org.in/images/overview_infographic.svg');
    } else {
        $('#tab-1.active .svg-mobile').load('https://fes.org.in/images/overview-infographic-mobile.svg');
    }
    

    $(document).on("click", ".leaf", function() {
        var datalink = $(this).attr('data-link');
        // var tabUrl = window.location.href;
        // var tabHref = tabUrl.split("?").shift();
        //console.log(datalink, 'svg url', tabUrl, 'tabHref', tabHref);
        //window.location = tabHref + '?' + datalink;
        window.location = datalink + '.html';
    });
    

    

    




});


// Couner Number Comma
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numCom() {
    setTimeout(function() {
        $("#counter .col span").each(function() {
            var num = $(this).text();
            //console.log(num, '== num');        
            var commaNum = numberWithCommas(num);
            //console.log(commaNum, '-- commNum');
            $(this).text(commaNum);
        });
    }, 100);
}


// Number Counter
if ($('#counter').length) {
    var a = 0;
    $(window).scroll(function() {

        var oTop = $('#counter').offset().top - window.innerHeight;
        // console.log(oTop);

        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //console.log('finished');
                        // number with comma function call
                        numCom();
                    }

                });
            });
            a = 1;
        }

    });
    

}

// Map 
if ($(".sec-map").length) {
    var jsonData = [
        {
            id: "Group-19",
            firstBlockFigure: "1,458",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "5,075",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "5,175",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Rajasthan",
            fourthBlockText: "impact/rajasthan.html",
        },
        {
            id: "Group-20",
            firstBlockFigure: "79",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "423",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "715",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Gujarat",
            fourthBlockText: "impact/gujarat.html",
        },
        {
            id: "Group-21",
            firstBlockFigure: "65",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "136",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "127",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Maharashtra",
            fourthBlockText: "impact/maharashtra.html",
        },
        {
            id: "Group-24",
            firstBlockFigure: "1,196",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "3,320",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "4,700",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Andhra Pradesh",
            fourthBlockText: "impact/andhra.html",
        },
        {
            id: "Group-25",
            firstBlockFigure: "3,439",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "5,474",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "13,049",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Odisha",
            fourthBlockText: "impact/odisha.html",
        },
        {
            id: "Group-42",
            firstBlockFigure: "92",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "105",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "63",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to The North East",
            fourthBlockText: "impact/NE.html",
        },
        {
            id: "Stroke-45",
            firstBlockFigure: "217",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "636",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "993",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Karnataka",
            fourthBlockText: "impact/karnataka.html",
        },
        {
            id: "Stroke-7",
            firstBlockFigure: "410",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "596",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "1,308",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Jharkhand",
            fourthBlockText: "impact/jharkhand.html",
        },
        {
            id: "Group-8",
            firstBlockFigure: "2,007",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "256",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "3,697",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Himachal Pradesh",
            fourthBlockText: "impact/himachal.html",
        },
        {
            id: "Group-41",
            firstBlockFigure: "122",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "137",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "344",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Madhya Pradesh",
            fourthBlockText: "impact/MP.html",
        },
    ];
    window.onload = function() {
        var svgHotSpotId = "";
        // document.addEventListener("click", function(e) {
        //     var getParentNode = e.target.nodeName;

        //     if (getParentNode.indexOf("polygon") == -1) {
        //         if (e.target.id == "Stroke-26" || e.target.id == "Combined-Shape") {
        //             return false;
        //         }
        //         document.querySelectorAll(".mapData")[0].style.opacity = 0;
        //         document.querySelectorAll(".mapData")[0].style.zIndex = "0";
        //     }
        // });


        document.querySelectorAll(".map-wrapper")[0].getElementsByTagName("svg")[0].addEventListener("click", function(e) {
            //console.log(e);
            //console.log(e.target.id + "|||" + e.target.parentNode.id);
            var targetId = e.target.parentNode.id;
            if (svgHotSpotId != targetId) {
                svgHotSpotId = targetId;
            } else {
                return false;
            }
            //console.log(svgHotSpotId);
            //console.log(targetId);
            //console.log(e.clientX);
            var hotspotClickData = "";
            hotspotClickData = jsonData.filter(function(i) {
                return i.id == targetId;
            });
            //console.log(hotspotClickData);
            if (hotspotClickData == "") {
                document.querySelectorAll(".mapData")[0].style.opacity = 0;
                document.querySelectorAll(".mapData")[0].style.display = "none";
                $(".map-inner-wrap > svg").find(".mapHighlight").removeClass("mapHighlight");
                return false;
            }

            for (var i = 1; i <= document.querySelectorAll(".mapData")[0].querySelectorAll(".flex-box")[0].children.length; i++) {
                switch (i) {
                    case 1:
                        val = "firstBlock"
                        break;
                    case 2:
                        val = "secondBlock"
                        break;
                    case 3:
                        val = "thirdBlock"
                        break;
                    case 4:
                        val = "fourthBlock"
                        break;
                    default:
                        val = "unknown"
                }
                var jsonVal = "hotspotClickData[0]." + val + "Figure";
                var jsonText = "hotspotClickData[0]." + val + "Text";

                if (val != 'fourthBlock') {
                    document.querySelectorAll(".mapData")[0].querySelectorAll("." + val)[0].getElementsByTagName("span")[0].innerHTML = eval(jsonVal);
                    document.querySelectorAll(".mapData")[0].querySelectorAll("." + val)[0].getElementsByTagName("span")[1].innerHTML = eval(jsonText);
                } else {
                    document.querySelectorAll(".mapData")[0].querySelectorAll("." + val)[0].getElementsByTagName("span")[0].innerHTML = eval(jsonVal);
                    document.querySelectorAll(".mapData")[0].querySelectorAll("." + val)[0].getElementsByTagName("a")[0].setAttribute('href', eval(jsonText));
                }

            }

            //console.log(e);
            document.querySelectorAll(".mapData")[0].style.opacity = 1;
            document.querySelectorAll(".mapData")[0].style.display = "block";
            // document.querySelectorAll(".mapData")[0].style.top = e.offsetY - document.querySelectorAll(".mapData")[0].clientHeight - 15 + "px";
            document.querySelectorAll(".mapData")[0].style.top = e.layerY - document.querySelectorAll(".mapData")[0].clientHeight - 15 + "px";
            // console.log(e);
            // console.log(window.innerWidth + "||||" + e.clientX + "|||" + document.querySelectorAll(".mapData")[0].offsetWidth);

            var winWidth = window.innerWidth;
            var clientx = e.clientX;
            var mapdataWidth = document.querySelectorAll(".mapData")[0].offsetWidth;

            if ((winWidth - clientx) > mapdataWidth) {
                document.querySelectorAll(".mapData")[0].style.left = e.layerX - 24 + "px";
                document.querySelectorAll(".mapData")[0].style.zIndex = "2";
                document.querySelectorAll(".mapData")[0].classList.remove("mystyle");
            } else {
                // document.querySelectorAll(".mapData")[0].style.left = (e.offsetX - mapdataWidth) + 24 + "px";
                document.querySelectorAll(".mapData")[0].style.left = (e.layerX - mapdataWidth) + 24 + "px";
                document.querySelectorAll(".mapData")[0].style.zIndex = "2";
                document.querySelectorAll(".mapData")[0].classList.add("mystyle");
            }

            $(".map-inner-wrap > svg").find("#" + e.target.parentNode.id).addClass("mapHighlight").siblings("g").removeClass("mapHighlight");
        });
    }
}

// viewport detect
function isOnScreen(elem) {
    // if the element doesn't exist, abort
    var elementTop = elem.offset().top;
    var elementBottom = elementTop + elem.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
}
