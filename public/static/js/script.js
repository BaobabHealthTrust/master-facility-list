$(document).load(function() {
  $(".select").material_select();
  $(".button-collapse").sideNav();
  $(".tooltipped").tooltip({ delay: 10 });

  $(document).tooltip();

  if ($("#back-to-top").length) {
    var scrollTrigger = 100, // px
      backToTop = function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#back-to-top").addClass("show");
        } else {
          $("#back-to-top").removeClass("show");
        }
      };
    backToTop();
    $(window).on("scroll", function() {
      backToTop();
    });
    $("#back-to-top").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({ scrollTop: 0 }, 700);
    });
  }
});

$(window).on("load", function() {
  // makes sure the whole site is loaded
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader")
    .delay(350)
    .fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body")
    .delay(350)
    .css({ overflow: "visible" });
});
