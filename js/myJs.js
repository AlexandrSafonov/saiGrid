(function ($) {
    $(document).ready(function () {
        window.bw = $("body").width();
        window.allDropWidth = [];
        /* Add body class */
        var ua = navigator.userAgent;
        if (ua.search(/MSIE/) > -1)
            $("body").addClass("ie");
        if (ua.search(/Firefox/) > -1)
            $("body").addClass("firefox");
        if (ua.search(/Opera/) > -1)
            $("body").addClass("opera");
        if (ua.search(/Chrome/) > -1)
            $("body").addClass("chrome");
        else if (ua.search(/Safari/) > -1)
            $("body").addClass("safari");
        /* end */

        /* Add li class if he has childe */
        $(".nav li a").each(function () {
            if ($(this).next().length != false) {
                $(this).parent().addClass("parent");
                $(this).append("<i class='fa fa-angle-right'></i>");
                $(this).find("i").on("click", function (e) {
                    e.preventDefault();
                    $(this).parent().next().stop(true, true).slideToggle(300);
                });
            }
        });
        /* end */

        /* Unbind  navigation hover  */
        $(".toggleMenu").off("click mouseenter mouseleave").on("click", function (e) {
            $(this).next().css("top", $(this).closest(".header").height() + $(this).closest(".header").offset().top);
            $(this).next().stop(true, true).fadeToggle(200);
        });
        /* end */

        /*  Сheck that the navigation does not extend beyond the screen */
        $(".nav > nav > ul > li").each(function () {
            $(this).addClass("first_heir");
        });
        /* end */

        resizeDoc();
    });
    $(window).on('resize orientationchange', function () {
        resizeDoc();
    });
    function resizeDoc() {
        bw = $("body").width();

        if (bw <= 970) {
            /* Unbind  navigation hover  */
            if (!$(".nav").hasClass("click")) {
                $(".nav .dropdown").removeAttr("style");
                $(".nav .parent").off("mouseenter mouseleave");

                $(".nav").addClass("click").removeClass("hover");
            }
            /* end */

        } else if (bw > 970) {
            /* Bind navigation hover  */
            if (!$(".nav").hasClass("hover")) {
                $(".nav").removeClass("click");
                $(".nav .dropdown").removeAttr("style");
                $(".toggleMenu").next().removeAttr("style");

                $(".nav .parent").off("click mouseenter mouseleave").on("mouseenter mouseleave", function () {
                    $(this).toggleClass("open");
                    /* If dropdown level 1 */
                    if ($(this).hasClass("first_heir")) {

                        $(this).find("> a").next().css("padding-top", ($(".header").height() - $(this).height()) / 2);

                        if ($("body").hasClass("chrome")) {
                            $(this).find("> a").next().css("padding-top", ($(".header").height() - $(this).height()) / 2 - 1);
                        }
                        if ($("body").hasClass("safari")) {
                            $(this).find("> a").next().css("padding-top", ($(".header").height() - $(this).height()) / 2 + 1);
                        }
                    }

                    $(this).find("> a").next().stop(true, true).fadeToggle(200);
                    /* end */
                });

                $(".nav").addClass("hover").removeClass("click");
            }
            /* end */
        }
    }

})(jQuery);