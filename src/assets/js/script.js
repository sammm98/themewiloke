(function() {
  "use-strict";

  // owl slider
  $(".owl-slider").owlCarousel({
    navigation: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    items: 2,
    itemsDesktop: [1199, 2],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    itemsMobile: [479, 1],
    pagination: true
  });

  $(".owl-slider-2").owlCarousel({
    autoPlay: 8000,
    navigation: true,
    paginationSpeed: 400,
    singleItem: true,
    pagination: false,
    transitionStyle: "fade",
    navigationText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ]
  });

  // menu btn mobile

  // function menuMobile(el, option) {
  //   var defaultOption = {
  //     effect: "sideUp",
  //     classActive: "active",
  //     onToggleMenu: function() {}
  //   };
  //   this.$el = $(el);
  //   this.opts = $.extend({}, defaultOption, option);
  // }

  // menuMobile.prototype = {
  //   init: function() {
  //     var $el = this.$el;
  //     var opts = this.opts;
  //     $(".menu-mobile-btn").on("click", function() {
  //       $el.addClass(opts.classActive);
  //     });
  //     // menu close mobile
  //     $(".menu__close").on("click", function() {
  //       $el.removeClass(opts.classActive);
  //     });
  //   }
  // };

  class menuMobile {
    constructor(el, option) {
      const defaultOption = {
        effect: "sideUp",
        classActive: "active",
        onAfterOpenMenu: function() {}
      };
      this.$el = $(el);
      this.opts = Object.assign({}, defaultOption, option);
    }

    handleOpenMenu(event) {
      const { currentTarget } = event;
      const { $el, opts } = this;
      $el.addClass(opts.classActive);
      opts.onAfterOpenMenu(currentTarget, opts.classActive);
    }

    init() {
      const { $el, opts } = this;
      $(".menu-mobile-btn").on("click", this.handleOpenMenu.bind(this));
      // menu close mobile
      $(".menu__close").on("click", () => {
        $el.removeClass(opts.classActive);
      });
    }
  }

  $.fn.menuMobile = function(option) {
    var newMenuMobile = new menuMobile(this, option);
    newMenuMobile.init();
  };

  $(".menu__mobile-toggle").menuMobile({
    classActive: "menu-mobile-active",
    onAfterOpenMenu: (elementTarget, classActive) => {
      console.log(elementTarget, classActive);
    }
  });

  // $.fn.menuMobile = function(option) {
  //   var defaultOption = {
  //     classActive: "active"
  //   };
  //   var options = $.extend({}, defaultOption, option);
  //   // menu btn
  //   var that = this;
  //   $(".menu-mobile-btn").on("click", function() {
  //     $(that).addClass(options.classActive);
  //   });
  //   // menu close mobile
  //   $(".menu__close").on("click", function() {
  //     $(that).removeClass(options.classActive);
  //   });
  // };

  // $(".menu__mobile-toggle").menuMobile({
  //   classActive: "menu-mobile-active"
  // });

  // Box More
  function boxMore() {
    var calWidth = $(".box-view-more")
        .parent()
        .prev()
        .find(".product")
        .width(),
      calHeight = $(".box-view-more")
        .parent()
        .prev()
        .find(".product")
        .height();
    $(".box-view-more").css({
      width: calWidth,
      height: calHeight
    });
  }

  function responsiveHero() {
    var ww = window.innerWidth,
      wh = window.innerHeight,
      heroContentWidth = $(".hero__content").outerWidth(),
      heroContentHeight = $(".hero__content").outerHeight();
    if (ww <= heroContentWidth) {
      $(".hero__content").css({
        transform: "scale(" + ww / heroContentWidth + ") translate(-50%, -50%)"
      });
    } else if (wh <= heroContentHeight) {
      $(".hero__content").css({
        transform: "scale(" + wh / heroContentHeight + ") translate(-50%, -50%)"
      });
    } else {
      $(".hero__content").removeAttr("style");
    }
  }

  $(window).on("resize load", function() {
    boxMore();
    responsiveHero();
  });
})(jQuery);
