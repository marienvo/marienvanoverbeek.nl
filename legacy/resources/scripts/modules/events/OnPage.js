/*global $:true*/
(function($) {
  var fn = {}, data = {};

  fn.init = function(){
    //console.log("init");
  };
  fn.scroll = function(el){
    var target = $(el).attr("href");

    $("html, body").animate({
      scrollTop: $(target).offset().top
    }, {
      duration: 750,
      easing: "easeInOutQuint"
    });
  };

  $.onPage = function(options) {
    $.extend({
      overlay: ""
    }, options);
    data.settings = options;
    fn.init();
  };

  $.onPage.scroll = function(el){
    fn.scroll(el);
  };

})(jQuery);
