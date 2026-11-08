$(document).ready(function () {
  $(".hidden-content")
    .css({ opacity: 0, transform: "translateY(30px)" })
    .animate(
      { opacity: 1 },
      {
        duration: 800,
        step: function (now, fx) {
          if (fx.prop === "opacity") {
            const moveY = 30 - now * 30;
            $(this).css("transform", `translateY(${moveY}px)`);
          }
        },
      },
    );

  $(".note-btn").click(function () {
    const target = $(this).attr("data-note");
    $(".note-box").addClass("d-none");
    $(target).removeClass("d-none").hide().fadeIn(300);
  });

  $(".size-btn").click(function () {
    $(".size-btn").removeClass("btn-gold active").addClass("btn-outline-gold");
    $(this).removeClass("btn-outline-gold").addClass("btn-gold active");

    const newPrice = $(this).attr("data-price");
    $("#priceDisplay").fadeOut(150, function () {
      $(this).text(newPrice).fadeIn(150);
    });
  });
});
