(function ($) {
  "use strict";

  // COLOR MODE
  $(".color-mode").click(function () {
    $(".color-mode-icon").toggleClass("active");
    $("body").toggleClass("dark-mode");
  });

  // HEADER
  $(".navbar").headroom();

  // PROJECT CAROUSEL
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
  });

  // SMOOTHSCROLL
  $(function () {
    $(".nav-link, .custom-btn-link").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });

  // TOOLTIP
  $(".social-links a").tooltip();

  //for hiding navbar on outside click
  $(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggler")) {
      $(".navbar-toggler").click();
    }
  });
  //website views counter(incomplete)
  // $.ajax({
  //   method: "GET",
  //   url: "https://api.api-ninjas.com/v1/counter?id=asaugat.com.np&hit=true",
  //   headers: { "X-Api-Key": "ALbQUdJXjOWIivucCF65jQ==szAueuDVpd2xwV6k" },
  //   contentType: "application/json",
  //   success: function (result) {
  //     console.log(result);
  //     $(".visits").text(result.visits);
  //   },
  //   error: function ajaxError(jqXHR) {
  //     console.error("Error: ", jqXHR.responseText);
  //   },
  // });
  // views counter end
})(jQuery);
