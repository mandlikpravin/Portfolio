
"use strict";


/*======== Doucument Ready Function =========*/
jQuery(document).ready(function () {

    //CACHE JQUERY OBJECTS
    var $window = $(window);

    
    $window.on( 'load', function () {
        /*======== Preloader =========*/

        $("#status").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        
        /* END of Preloader */

        /*========= Masonry Grid Script ==========*/

        $(".grid-masonry").masonry({
            itemSelector: ".grid-item",
            columnWidth: ".grid-item",

        });

        /*========== End Masonry Grid ==========*/

        /*========== Init Wow ==========*/
        new WOW().init();
        /*========== End Init Wow ==========*/

    });

    

    /*======= jQuery navbar on scroll =========*/
    $window.on('scroll' , function () {

        if ($(".navbar-default").add(".navbar-inverse").offset().top > 50) {
            $(".reveal-menu-home").addClass("sticky-nav");
            $(".reveal-menu").addClass("sticky-nav-white");
        } else {
            $(".reveal-menu-home").removeClass("sticky-nav");
            $(".reveal-menu").removeClass("sticky-nav-white");
        }
    });

    /*======= End jQuery navbar on scroll =========*/


    /*======= Progress Bar =========*/

    var progress_way = $('.mt_skill-progress');
    if (progress_way.length > 0) {
        progress_way.waypoint(function() {
            jQuery('.mt_skill-bar').each(function() {
                jQuery(this).find('.progress-content').animate({
                    width: jQuery(this).attr('data-percentage')
                }, 2000);
                jQuery(this).find('.progress-mark').animate({
                    left: jQuery(this).attr('data-percentage')
                }, {
                    duration: 2150,
                    step: function(now, fx) {
                        var data = Math.round(now);
                        jQuery(this).find('.percent').html(data + '%');
                    }
                });
            });
        }, {
            offset: '90%'
        });
    }

    /*======= End Progress Bar =======*/

    /*======= Typed Js Initialization =======*/

    if ($('.kp_typed').length) {
        $('.kp_typed').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2'),$(this).data('text3')],
                loop: $(this).data('loop') ? $(this).data('loop') : false ,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000 ,                
                typeSpeed: 10,
            });
        });
    }

    /*======= End Typed Js Initialization =======*/

    /*======== One Page Scrolling ======= */

    $("#navigation").onePageNav({
        currentClass: "active",
        changeHash: true,
        scrollSpeed: 1000,
        scrollThreshold: 0.5,
        filter: "",
        easing: "swing",
        begin: function () {
            //I get fired when the animation is starting
        },
        end: function () {
            //I get fired when the animation is ending
        },
        scrollChange: function ($currentListItem) {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });

    /*======== End One Page Scrolling ========*/

    /*======== Contact Form ========*/

    $('#submit-btn').on('click',function (event){
        event.preventDefault();
        $.ajax({
            dataType: 'JSON',
            url: 'sendmail.php',
            type: 'POST',
            data: $('#contact_form').serialize(),
            beforeSend: function (xhr) {
                $('.mt_load').show();
            },
            success: function (response) {
                if (response) {
                    console.log(response);
                    if (response['signal'] == 'ok') {
                        toastr.success(response['msg']);
                        $('#msg').hide();
                        $('input, textarea').val(function () {
                            return this.defaultValue;
                        });
                    }
                    else {
                        $('#msg').show();
                        $('#msg').html('<div class="mt_error">'+ response['msg'] +'</div>');
                    }
                }
            },
            error: function () {
                $('#msg').show();
                $('#msg').html('<div class="mt_error">Errors occur. Please try again later.</div>');
            },
            complete: function () {
                $('.mt_load').hide();
            }
        });
    });
    /*======== End Contact Form ========*/

    /*======== Testimonial Section =========*/

    $("#owl-testimonials").owlCarousel({
        loop: false,
        margin: 10,
        autoPlay : 3000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        smartSpeed:850,
        dots: false,
        nav: true,
        navText: ['<span class="testimonial_nav_prev"><i class="fa fa-angle-left"></i></span>','<span class="testimonial_nav_next"><i class="fa fa-angle-right"></i></span>'],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            },
            1201: {
                items: 2,
            }
        }
    });

    /*======== End Testimonial Section =========*/

    /*======== Portfolio Gallery 2 =========*/

    $(".portfolio_gallery .owl-carousel").owlCarousel({
        center: true,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveBaseElement: window,
        responsiveClass: true,
        navText: ["<img src='images/arrow-left.png'>","<img src='images/arrow-right.png'>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true
            },
            1201: {
                items: 1,
                nav: true
            }
        }
    });

    /*======== End Portfolio Gallery2 =========*/


    /*======== Fancy Box Init ========*/

    var FancYB = $('.fancybox');
    FancYB.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        padding : 0,
        closeBtn: true,
        helpers: {
            title: {
                type: 'inside'
            },
            overlay: {
              locked: false
            },
            buttons: {}
        }
    });
    FancYB.attr('rel','gallery');

    /*======== End Fancy Box ========*/

});
/*======== End Doucument Ready Function =========*/


const stack = document.querySelector(".stack");
const cards = Array.from(stack.children)
.reverse()
.filter((child) => child.classList.contains("card"));

cards.forEach((card) => stack.appendChild(card));

function moveCard() {
const lastCard = stack.lastElementChild;
if (lastCard.classList.contains("card")) {
lastCard.classList.add("swap");

setTimeout(() => {
lastCard.classList.remove("swap");
stack.insertBefore(lastCard, stack.firstElementChild);
}, 1200);
}
}

stack.addEventListener("click", function (e) {
const card = e.target.closest(".card");
if (card && card === stack.lastElementChild) {
card.classList.add("swap");

setTimeout(() => {
card.classList.remove("swap");
stack.insertBefore(card, stack.firstElementChild);
resetAutoplay();
}, 1200);
}
});

let autoplayInterval = setInterval(moveCard, 4000);

function resetAutoplay() {
clearInterval(autoplayInterval);
autoplayInterval = setInterval(moveCard, 4000);
}
