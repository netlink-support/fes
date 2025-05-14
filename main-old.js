function numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function numCom() {
    setTimeout(function () {
        $("#counter .col span").each(function () {
            var e = numberWithCommas($(this).text());
            $(this).text(e);
        });
    }, 100);
}
if (
    ($(document).ready(function () {
        if (
            ($(window).scroll(function () {
                var e = $("header").offset().top;
                $("header").outerHeight(), $(window).height(), $(this).scrollTop();
                $(window).width() > 1024 &&
                    (e > 100
                        ? ($("header .logo").addClass("active"), $("header .menu-wrap").addClass("active"), $("header .hamburger").addClass("active"))
                        : 0 == e && ($("header .logo").removeClass("active"), $("header .menu-wrap").removeClass("active"), $("header .hamburger").removeClass("active")));
            }),
            $(".hamburger").on("click tap", function () {
                $(this).toggleClass("open"), $("header .menu-wrap").toggleClass("open"), $("header .hamburger-logo").toggleClass("active"), $("body").toggleClass("bodyOverflowHidden"), $(".overlay-body").toggleClass("active");
            }),
            $(window).width() < 1025 &&
                ($("header ul.menu > .li-link").removeClass("active"),
                $("header ul.menu > .li-link > a, .plus").on("click", function (e) {
                    $(this).parents("li").siblings().removeClass("active"),
                        $(this).parents("li").toggleClass("active"),
                        $(this).parents("li").find(".dropdown").hasClass("active") || ($(".dropdown").slideUp(), $(".link").removeClass("active")),
                        $(this).parents("li").find(".link").toggleClass("active"),
                        $(".dropdown").removeClass("active"),
                        $(this).parents("li").find(".dropdown").slideToggle(),
                        $(this).parents("li").find(".dropdown").toggleClass("active");
                })),
            $("header ul.menu .inner-li-link").on("click", function (e) {
                var t = $(this).find(".inner-dropdown");
                $(this).closest(".dropdown").find(".inner-dropdown").not(t).slideUp(),
                    $(this).hasClass("active") ? $(this).removeClass("active") : ($(this).closest(".dropdown").find(".inner-li-link.active").removeClass("active"), $(this).addClass("active")),
                    t.stop(!1, !0).slideToggle();
            }),
            $(window).width() < 1025 &&
                $(".content-wrap .col .bigCounter").on("click", function () {
                    return (
                        $(this).hasClass("active")
                            ? ($(this).removeClass("active"), $(this).siblings(".arrow").removeClass("active"), $(this).siblings(".stats-container").slideUp())
                            : ($(this).siblings(".arrow").addClass("active"), $(this).siblings(".stats-container").slideDown(), $(this).addClass("active")),
                        !1
                    );
                }),
            $(".sec-slider").length)
        ) {
            var e,
                t,
                a = $("#homeBanner.owl-carousel"),
                o = document.getElementById("myVideo");
            a.owlCarousel({
                loop: !0,
                nav: !0,
                dots: !0,
                dotsData: !1,
                items: 1,
                smartSpeed: 600,
                autoplaySpeed: 600,
                autoplay: !1,
                autoplayTimeout: 11e3,
                mouseDrag: !0,
                video: !0,
                onInitialized: function (e) {
                    i(),
                        $(document).on("keydown", function (e) {
                            37 == e.keyCode && a.trigger("prev.owl"), 39 == e.keyCode && a.trigger("next.owl");
                        });
                },
                onTranslate: function (e) {
                    var t, a;
                    (a = { event: "command", func: "pauseVideo" }), null != (t = $(".owl-item.active").find(".ytplayer-wrap iframe").get(0)) && t.contentWindow.postMessage(JSON.stringify(a), "*");
                },
            });
            $(".owl-item.active").find(".video").length;
            function i(i) {
                0 == $(".owl-dot.active").index() &&
                    (0 == o.currentTime && o.play(),
                    (t = setInterval(function () {
                        o.currentTime == o.duration &&
                            o.ended &&
                            (o.pause(),
                            (o.currentTime = 0),
                            a.trigger("next.owl.carousel"),
                            clearInterval(t),
                            (e = setInterval(function () {
                                a.trigger("next.owl.carousel");
                            }, 1e4)));
                    }, 500)));
            }
            $(".owl-dot").on("click", function () {
                $(this).hasClass("active") ||
                    (o.pause(),
                    (o.currentTime = 0),
                    clearInterval(t),
                    clearInterval(e),
                    (e = setInterval(function () {
                        a.trigger("next.owl.carousel");
                    }, 1e4)));
            }),
                a.on("changed.owl.carousel", function (t) {
                    3 == t.item.index && (clearInterval(e), i());
                });
        }
        (window.addEventListener("scroll", function (e) {
            if ($(".sec-partners").length) {
                if (isOnScreen($("#partners")))
                    $("#partners .owl-carousel").owlCarousel({
                        margin: 30,
                        loop: !0,
                        nav: !0,
                        dots: !1,
                        smartSpeed: 250,
                        slideTransition: "linear",
                        mouseDrag: !1,
                        lazyLoad: !0,
                        autoplay: !0,
                        autoplayTimeout: 4e3,
                        autoplayHoverPause: !0,
                        responsive: {
                            0: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 80 },
                            361: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 100 },
                            375: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 70 },
                            481: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 90 },
                            768: { items: 3, slideBy: 2 },
                            1200: { items: 4, slideBy: 3 },
                        },
                    });
                if (isOnScreen($("#funders")))
                    $("#funders .owl-carousel").owlCarousel({
                        margin: 30,
                        loop: !0,
                        nav: !0,
                        dots: !1,
                        smartSpeed: 250,
                        slideTransition: "linear",
                        mouseDrag: !1,
                        lazyLoad: !0,
                        autoplay: !0,
                        autoplayTimeout: 4e3,
                        autoplayHoverPause: !0,
                        responsive: {
                            0: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 80 },
                            361: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 100 },
                            375: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 80 },
                            481: { center: !0, items: 1, margin: 0, nav: !1, stagePadding: 90 },
                            768: { items: 3, slideBy: 2 },
                            1200: { items: 4, slideBy: 3 },
                        },
                    });
            }
        }),
        $(".sec-news").length) &&
            $("#news .owl-carousel").owlCarousel({
                autoWidth: !0,
                loop: !1,
                nav: !0,
                dots: !1,
                smartSpeed: 500,
                slideTransition: "linear",
                mouseDrag: !1,
                autoplay: !1,
                lazyLoad: !0,
                responsive: { 0: { items: 1, singleItem: !0, nav: !1 }, 600: { items: 2 }, 768: { items: 3 } },
            });
        if ($(".sec-testimonials").length) {
            var s = $("#testimonials .owl-carousel");
            s.owlCarousel({
                navigation: !0,
                items: 1,
                loop: !0,
                nav: !0,
                dots: !1,
                animateOut: "fadeOut",
                animateIn: "fadeIn",
                mouseDrag: !1,
                autoplayHoverPause: !0,
                smartSpeed: 250,
                slideTransition: "linear",
                lazyLoad: !0,
                autoplay: !0,
                autoplayTimeout: 9e3,
                onInitialized: function (e) {
                    $(document).on("keydown", function (e) {
                        37 == e.keyCode && s.trigger("prev.owl"), 39 == e.keyCode && s.trigger("next.owl");
                    });
                },
            }),
                s.on("changed.owl.carousel", function (e) {
                    s.trigger("stop.owl.autoplay"), s.trigger("play.owl.autoplay");
                });
        }
        if ($(".our-approach-main").length) {
            var r = $("#ApproachBanner.owl-carousel");
            r.owlCarousel({
                loop: !0,
                nav: !0,
                dots: !0,
                dotsData: !1,
                items: 1,
                smartSpeed: 600,
                autoplaySpeed: 600,
                autoplay: !0,
                autoplayTimeout: 7e3,
                mouseDrag: !0,
                onInitialized: function () {
                    $(document).on("keydown", function (e) {
                        37 == e.keyCode && r.trigger("prev.owl"), 39 == e.keyCode && r.trigger("next.owl");
                    });
                },
            });
        }
        if (
            ($("ul.tabs li.tab-link").click(function () {
                var e = $(this).index();
                $(".sec-abt-bn .content").show(),
                    1 != e && $(".sec-abt-bn .content").hide(),
                    $(window).width() > 1024
                        ? $("#tab-1.active .svg-desktop").load("images/work/our-approach/overview-infographic.svg")
                        : ($(".tab-drop-wrap ul.tabs span.line").remove(), $("#tab-1.active .svg-mobile").load("images/work/our-approach/overview-infographic-mob.svg"));
                var t = $(this).attr("data-name");
                $(".bgImg .tab1").removeClass("active"), (e = "our-approach" === t) && $(".bgImg .tab1").addClass("active");
                var a = $(this).attr("data-tab"),
                    o = $(this).attr("data-link"),
                    i = "https://prodigedigital.com/projects/humanx/FES/images/inner-banner/",
                    s = i + o + "-bn.jpg",
                    r = i + o + "-small.png";
                $("ul.tabs li").removeClass("active"),
                    $(".tab-content").removeClass("active"),
                    $(".dots-line-wrap ul.ul-line li").removeClass("active"),
                    $(".bgImg .container .content #bn-" + a).removeClass("active"),
                    $(".bgImg").css("background-image", "url(" + s + ")"),
                    $(".smallImg").css("background-image", "url(" + r + ")"),
                    $(this).addClass("active"),
                    $(".dots-line-wrap ul.ul-line #line-" + a).addClass("active"),
                    $(".bgImg .container .content #bn-" + a).addClass("active"),
                    $("#" + a).addClass("active");
            }),
            $(window).width() < 1025)
        ) {
            $("ul.tabs").on("click", ".init", function () {
                $(this).closest("ul").children("li:not(.init)").toggle(), $("ul.tabs").toggleClass("active"), $("span.arrow").toggleClass("active");
            });
            var l = $("ul.tabs").children("li:not(.init)");
            $("ul.tabs").on("click", "li:not(.init)", function () {
                $("span.arrow").toggleClass("active"),
                    l.removeClass("selected"),
                    $(this).addClass("selected"),
                    $("ul.tabs").children(".init").html($(this).html()),
                    $("ul.tabs").removeClass("active"),
                    l.toggle(),
                    $(this).find(".tab-content").hasClass("active") || $("ul.tabs li").removeClass("active").removeAttr("style");
                var e = $(this).attr("data-list");
                $(this).removeClass("active").removeAttr("style"),
                    $(this).addClass("active"),
                    $("#" + e)
                        .fadeIn(500)
                        .addClass("active")
                        .removeAttr("style");
            });
             $(".arrow").on("click", ".init", function () {
                $(this).closest("stats-container").toggle(), $(".arrow").toggleClass("active"), $("span.arrow").toggleClass("active");
            });
            
        }
        if ($(".board-wrap").length) {
            if ($(window).width() > 1024) {
                var n = 350,
                    c = '<div class="btn-read flex-wrap"><span>read more</span> <img src="images/circle-arrow.svg" alt=""></div>';
                $("p.more").each(function () {
                    var e = $(this).html();
                    if (e.length > n) {
                        var t = e.substr(0, n) + '<span class="moreellipses">...&nbsp;</span><span class="morecontent"><span>' + e.substr(n, e.length - n) + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + c + "</a></span>";
                        $(this).html(t);
                    }
                }),
                    $(".morelink").click(function () {
                        return (
                            $(this).hasClass("less")
                                ? ($(this).removeClass("less"), $(this).html(c))
                                : ($(this).addClass("less"), $(this).html('<div class="btn-read flex-wrap readLess"><span>read less</span> <img src="images/circle-arrow.svg" alt=""></div>')),
                            $(this).parent().prev().toggle(),
                            $(this).prev().toggle(),
                            !1
                        );
                    });
            }
            $(".board-wrap ul.mobile-wrap li").on("click", function (e) {
                e.preventDefault(), $(this).find(".memberData").hasClass("active") || ($(this).removeClass("active"), $(".memberData").removeClass("active"));
                var t;
                (t = $(this).index()), $("body").toggleClass("active"), $("header").toggleClass("active"), $(".tab-drop-wrap").toggleClass("zindex"), $(".desktopPop-wrap").toggleClass("is-visible");
                var a = $(this).attr("data-mem");
                $(this).removeClass("active"),
                    $(".memberData").removeClass("active").removeAttr("style"),
                    $(this).addClass("active"),
                    $("#" + a)
                        .fadeIn(500)
                        .addClass("active")
                        .removeAttr("style");
                var o = $("ul.desktopPop .memberData"),
                    i = t;
                $(".btn-popup-group .btn-next").on("click", function () {
                    o.eq(i).removeClass("active").removeAttr("style"), (i = i + 1 < o.length ? i + 1 : 0), o.eq(i).addClass("active");
                }),
                    $(".btn-popup-group .btn-prev").on("click", function () {
                        o.eq(i).removeClass("active").removeAttr("style"), (i = i > 0 ? i - 1 : o.length - 1), o.eq(i).addClass("active");
                    });
            }),
                $("ul.desktopPop .close").on("click", function (e) {
                    e.preventDefault(),
                        $("body").toggleClass("active"),
                        $("header").toggleClass("active"),
                        $(".tab-drop-wrap").toggleClass("zindex"),
                        $(".desktopPop-wrap").toggleClass("is-visible"),
                        $("ul.mobile-wrap li").removeClass("active").removeAttr("style"),
                        $(".memberData").removeAttr("style").removeClass("active");
                });
        }
    }),
    $(window).load(function () {
        $(".bgImg .container .tab-content").eq(0).addClass("active"), $("ul.tabs li.tab-link").eq(0).addClass("active selected"), $(".tab-container .tab-content").eq(0).addClass("active");
        var e = window.location.href.split("?").pop();
        $("ul.tabs li.tab-link").each(function () {
            $(this).attr("data-link") == e && $(this).click();
        }),
            $(window).width() > 1024
                ? $("#tab-1.active .svg-desktop").load("images/work/our-approach/overview-infographic.svg")
                : $("#tab-1.active .svg-mobile").load("images/work/our-approach/overview-infographic-mob.svg"),
            $(document).on("click", ".leaf", function() {
        var datalink = $(this).attr('data-link');
        // var tabUrl = window.location.href;
        // var tabHref = tabUrl.split("?").shift();
        //console.log(datalink, 'svg url', tabUrl, 'tabHref', tabHref);
        //window.location = tabHref + '?' + datalink;
        window.location = datalink + '.html';
    });
    }),
    $("#counter").length)
) {
    var a = 0;
    $(window).scroll(function () {
        var e = $("#counter").offset().top - window.innerHeight;
        0 == a &&
            $(window).scrollTop() > e &&
            ($(".counter-value").each(function () {
                var e = $(this),
                    t = e.attr("data-count");
                $({ countNum: e.text() }).animate(
                    { countNum: t },
                    {
                        duration: 5e3,
                        easing: "swing",
                        step: function () {
                            e.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            e.text(this.countNum), numCom();
                        },
                    }
                );
            }),
            (a = 1));
    });
}
if ($(".sec-map").length) {
    var jsonData = [
        {
            id: "Group-19",
            firstBlockFigure: "1,333",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "4,747",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "4,927",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Rajasthan",
            fourthBlockText: "rajasthan.html",
        },
        {
            id: "Group-20",
            firstBlockFigure: "79",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "423",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "712",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Gujarat",
            fourthBlockText: "gujarat.html",
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
            fourthBlockText: "maharashtra.html",
        },
        {
            id: "Group-24",
            firstBlockFigure: "1,194",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "3,107",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "4,331",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Andhra Pradesh",
            fourthBlockText: "andhra.html",
        },
        {
            id: "Group-25",
            firstBlockFigure: "3,337",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "5,287",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "12,720",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Odisha",
            fourthBlockText: "odisha.html",
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
            fourthBlockText: "NE.html",
        },
        {
            id: "Stroke-45",
            firstBlockFigure: "210",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "804",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "1,262",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Karnataka",
            fourthBlockText: "karnataka.html",
        },
        {
            id: "Stroke-7",
            firstBlockFigure: "369",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "564",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "1,255",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Jharkhand",
            fourthBlockText: "jharkhand.html",
        },
        {
            id: "Group-8",
            firstBlockFigure: "1,883",
            firstBlockText: "Thousand acres restored",
            secondBlockFigure: "239",
            secondBlockText: "Thousand lives impacted",
            thirdBlockFigure: "3,399",
            thirdBlockText: "Villages strengthened",
            fourthBlockFigure: "Go to Himachal Pradesh",
            fourthBlockText: "himachal.html",
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
            fourthBlockText: "MP.html",
        },
    ];
    window.onload = function () {
        var svgHotSpotId = "";
        document
            .querySelectorAll(".map-wrapper")[0]
            .getElementsByTagName("svg")[0]
            .addEventListener("click", function (e) {
                var targetId = e.target.parentNode.id;
                if (svgHotSpotId == targetId) return !1;
                svgHotSpotId = targetId;
                var hotspotClickData = "";
                if (
                    ((hotspotClickData = jsonData.filter(function (e) {
                        return e.id == targetId;
                    })),
                    "" == hotspotClickData)
                )
                    return (document.querySelectorAll(".mapData")[0].style.opacity = 0), $(".map-inner-wrap > svg").find(".mapHighlight").removeClass("mapHighlight"), !1;
                for (var i = 1; i <= document.querySelectorAll(".mapData")[0].querySelectorAll(".flex-box")[0].children.length; i++) {
                    switch (i) {
                        case 1:
                            val = "firstBlock";
                            break;
                        case 2:
                            val = "secondBlock";
                            break;
                        case 3:
                            val = "thirdBlock";
                            break;
                        case 4:
                            val = "fourthBlock";
                            break;
                        default:
                            val = "unknown";
                    }
                    var jsonVal = "hotspotClickData[0]." + val + "Figure",
                        jsonText = "hotspotClickData[0]." + val + "Text";
                    "fourthBlock" != val
                        ? ((document
                              .querySelectorAll(".mapData")[0]
                              .querySelectorAll("." + val)[0]
                              .getElementsByTagName("span")[0].innerHTML = eval(jsonVal)),
                          (document
                              .querySelectorAll(".mapData")[0]
                              .querySelectorAll("." + val)[0]
                              .getElementsByTagName("span")[1].innerHTML = eval(jsonText)))
                        : ((document
                              .querySelectorAll(".mapData")[0]
                              .querySelectorAll("." + val)[0]
                              .getElementsByTagName("span")[0].innerHTML = eval(jsonVal)),
                          document
                              .querySelectorAll(".mapData")[0]
                              .querySelectorAll("." + val)[0]
                              .getElementsByTagName("a")[0]
                              .setAttribute("href", eval(jsonText)));
                }
                (document.querySelectorAll(".mapData")[0].style.opacity = 1), (document.querySelectorAll(".mapData")[0].style.top = e.layerY - document.querySelectorAll(".mapData")[0].clientHeight - 15 + "px");
                var winWidth = window.innerWidth,
                    clientx = e.clientX,
                    mapdataWidth = document.querySelectorAll(".mapData")[0].offsetWidth;
                winWidth - clientx > mapdataWidth
                    ? ((document.querySelectorAll(".mapData")[0].style.left = e.layerX - 24 + "px"), (document.querySelectorAll(".mapData")[0].style.zIndex = "2"), document.querySelectorAll(".mapData")[0].classList.remove("mystyle"))
                    : ((document.querySelectorAll(".mapData")[0].style.left = e.layerX - mapdataWidth + 24 + "px"),
                      (document.querySelectorAll(".mapData")[0].style.zIndex = "2"),
                      document.querySelectorAll(".mapData")[0].classList.add("mystyle")),
                    $(".map-inner-wrap > svg")
                        .find("#" + e.target.parentNode.id)
                        .addClass("mapHighlight")
                        .siblings("g")
                        .removeClass("mapHighlight");
            });
    };
}
function isOnScreen(e) {
    var t = e.offset().top,
        a = t + e.outerHeight(),
        o = $(window).scrollTop(),
        i = o + $(window).height();
    return a > o && t < i;
}

