(function ($) {
  'use strict';

  /* ========================================================================= */
  /*	Page Preloader
  /* ========================================================================= */

  // window.load = function () {
  // 	document.getElementById('preloader').style.display = 'none';
  // }

  function activateTypewriter()
{
  //(Array.from(document.getElementsByClassName("animated-banner"))).forEach(function(banner){
    (Array.from(document.getElementsByClassName("typewriter"))).forEach(function(typewriter){
        var texts = typewriter
            .getElementsByClassName("typewritertexts")[0]
            .getElementsByTagName("span");
    
        var text=0; var char=0;
        var speed = 35;
        var prewait = 0; var prewwaittime = 500;
        var postwait = 0; var postwaittime = 3000;

        var textContentElement = typewriter.getElementsByClassName("textcontent");
        if(textContentElement.length > 0)
        {
            setInterval(function(){
                var curtext = texts[text].innerHTML;
                if((char < curtext.length) || (prewait <= prewwaittime))
                {
                    if(prewait <= prewwaittime)
                        prewait += speed;
                    else if (char < curtext.length)
                        textContentElement[0].innerHTML += curtext[char++];
                }
                else
                {
                    if(text < texts.length -1)
                    {
                        textContentElement[0].innerHTML += "<br/>";
                        char = 0;
                        text ++;
                    }
                    else
                    {
                        if(postwait <= postwaittime)
                            postwait += speed;
                        else
                        {
                            var content = textContentElement[0].innerHTML;
                            if(content.length > 0)
                                textContentElement[0].innerHTML = content.substr(0, content.length-2);
                            else
                            {
                                char = 0;
                                text = 0;
                                postwait = 0;
                                prewait = 0;
                            }
                        }
                    }
                }
            }, speed);
        }
    });
  //});
}

  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
    activateTypewriter();
  });

  
  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'></button>',
    dots: false,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false
  });
  $('.hero-slider').slickAnimation();


  /* ========================================================================= */
  /*	Header Scroll Background Change
  /* ========================================================================= */

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll > 200) {
      //console.log('a');
      $('.navigation').addClass('sticky-header');
    } else {
      //console.log('a');
      $('.navigation').removeClass('sticky-header');
    }
  });

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
  /* =========================================================================  */

    // filter
    setTimeout(function(){
      var containerEl = document.querySelector('.filtr-container');
      var filterizd;
      if (containerEl) {
        filterizd = $('.filtr-container').filterizr({});
      }
    }, 500);

  /* ========================================================================= */
  /*	Testimonial Carousel
  /* =========================================================================  */

  //Init the slider
  $('.testimonial-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });


  /* ========================================================================= */
  /*	Clients Slider Carousel
  /* =========================================================================  */

  //Init the slider
  $('.clients-logo-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1
  });




  /* ========================================================================= */
  /*	Company Slider Carousel
  /* =========================================================================  */
  $('.company-gallery').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1
  });


  /* ========================================================================= */
  /*   Contact Form Validating
  /* ========================================================================= */

  $('#contact-form').validate({
      rules: {
        name: {
          required: true,
          minlength: 4
        },
        email: {
          required: true,
          email: true
        },
        subject: {
          required: false
        },
        message: {
          required: true
        }
      },
      messages: {
        user_name: {
          required: 'Come on, you have a name don\'t you?',
          minlength: 'Your name must consist of at least 2 characters'
        },
        email: {
          required: 'Please put your email address'
        },
        message: {
          required: 'Put some messages here?',
          minlength: 'Your name must consist of at least 2 characters'
        }
      },
      submitHandler: function (form) {
        $(form).ajaxSubmit({
          type: 'POST',
          data: $(form).serialize(),
          url: 'sendmail.php',
          success: function () {
            $('#contact-form #success').fadeIn();
          },
          error: function () {
            $('#contact-form #error').fadeIn();
          }
        });
      }
    }

  );

  /* ========================================================================= */
  /*	On scroll fade/bounce effect
  /* ========================================================================= */
  var scroll = new SmoothScroll('a[href*="#"]');

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    if ($('.counter').length !== 0) {
      var oTop = $('.counter').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.counter').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  // -----------------------------
  //  On Scroll
  // -----------------------------
  $(window).scroll(function () {
    counter();
  });

})(jQuery);
