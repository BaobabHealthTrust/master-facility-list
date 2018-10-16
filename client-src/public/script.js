$(document).ready(function() {
  // $('.select').material_select();
  $(".button-collapse").sideNav();
  $(".tooltipped").tooltip({ delay: 10 });
  const documentHeight = $(document).innerHeight();
  const contentHeight = $(".mfl-page-wrap").innerHeight();
  const marginDiff = documentHeight - contentHeight;

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

  const content = $(".content");
  const nav = $(".header");
  const footer = $(".footer");
  const win = $(window);

  const height = win.height() - nav.height() - footer.height();
  content.css("min-height", height);

  win.on({
    resize: () => content.css("min-height", height),
    change: () => content.css("min-height", height),
    load: () => content.css("min-height", height),
    reload: () => content.css("min-height", height)
  });

  $("#status").fadeOut();

  $("#preloader")
    .delay(350)
    .fadeOut("slow");

  $("body")
    .delay(350)
    .css({ overflow: "visible" });
});
