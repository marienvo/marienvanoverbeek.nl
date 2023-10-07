/*global $:true*/
(function ($) {
  var fn = {},
    data = {};

  // Data
  data.grid = $(".js-grid");

  // Functions
  fn.init = function () {
    data.grid.isotope({
      itemSelector: ".grid__item",
      layoutMode: "masonry",
      masonry: {
        columnWidth: ".grid__item_small",
      },
    });
  };

  fn.filter = function (el) {
    var value = "." + $(el).data("value");
    if (value == ".all") {
      data.grid.isotope({ filter: "" });
    } else {
      data.grid.isotope({ filter: value });
    }

    //console.log("filter "+value);
  };

  // Methods
  $.voorpagina = function (options) {
    $.extend(
      {
        overlay: "",
      },
      options,
    );
    data.settings = options;
    fn.init();
  };

  $.voorpagina.filter = function (el) {
    fn.filter(el);
  };
})(jQuery);
