// const { tree } = require("gulp");

$(document).ready(function(){

  // slider
  $('.slider__inner').slick({
		prevArrow: '<button type="button" class="slick-prev"><img src="../img/slider/left.svg"></button>',
    nextArrow:'<button type="button" class="slick-next"><img src="../img/slider/right.svg"></button>'
    
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 1,
         
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
     
    // ]

  });

  // tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__cards').removeClass('catalog__cards_active').eq($(this).index()).addClass('catalog__cards_active');
  });

  // cards-link
  function toggleSlide(item){

    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-card__content').eq(i).toggleClass('catalog-card__content_active');
        $('.catalog-card__list').eq(i).toggleClass('catalog-card__list_active');
      })
    });

  };
  toggleSlide('.catalog-card__link');
  toggleSlide('.catalog-card__back');

// modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thx').fadeOut();
  });

  $('.btn_mini').on('click', function(){
    $('.overlay, #order').fadeIn();
  });

  $('.btn_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__subtitle').text($('.catalog-card__title').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  });

// validate
  function validateForms(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        mail: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите Ваше имя",
        phone: "Пожалуйста, введите Ваш номер телефона",
        mail: {
           required:"Пожалуйста, введите свою почту",
           email: "Неправильно введен адрес почты"
        }
      }
   });
  };
  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

// input masked
  $('input[name=phone]').mask("+7 (999) 999-99-99");


// scroll
  $(window).scroll(function(){
    if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });


  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  // ajax
  $('form').sumbit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php", 
        data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thx').fadeIn();

      $('form').trigger('reset');
    });
      return false;
  });
});


