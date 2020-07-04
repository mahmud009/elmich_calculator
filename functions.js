function init() {
  let imgId = $("#pedestal-config-A").val();
  $("#img-section-2A img").css("opacity", "0");
  $(`#${imgId}`).css("opacity", "1");

  $("#pedestal-config-A").on("change", function () {
    let imgId = $(this).val();
    $("#img-section-2A img").css("opacity", "0");
    $(`#${imgId}`).css("opacity", "1");
  });
}

function tabbedView() {
  let routeMap = {
    A: [1, "2A", 3],
    B: [1, "2B", 3],
  };

  let route;
  let index = 0;

  function toggleSection(oldSection, newSection) {
    oldSection.css({
      position: "absolute",
      opacity: "0",
      zIndex: "-99",
    });

    newSection.css({
      position: "relative",
      opacity: "1",
      zIndex: "99",
    });
  }

  $(".root-selector-wrap").on("click", function (e) {
    $(".section-indicator-btn").removeClass("active");

    e.preventDefault();
    route = $(this).data().route;
    $(".nav-btn").css({ display: "inline-block" });
    $(".nav-btn").removeClass("inactive");
    index++;
    toggleSection($("#section-1"), $(`#section-${routeMap[route][index]}`));
    $(window).scrollTop($("#indicator-btn-wrap").offset().top);

    $(`#indicator-${index + 1}`).addClass("active");
  });

  $(".nav-buttons button").on("click", function () {
    let target = $(this).data().target;
    if ((index == 2 && target != "back") || (index == 0 && target != "next"))
      return;

    $(window).scrollTop($("#indicator-btn-wrap").offset().top);
    $(".section-indicator-btn").removeClass("active");

    if (target == "next") {
      index++;
      toggleSection(
        $(`#section-${routeMap[route][index - 1]}`),
        $(`#section-${routeMap[route][index]}`)
      );
    } else if (target == "back") {
      index--;
      toggleSection(
        $(`#section-${routeMap[route][index + 1]}`),
        $(`#section-${routeMap[route][index]}`)
      );
    }

    if (index == 2) {
      $(".nav-next").addClass("inactive");
    } else {
      $(".nav-next").removeClass("inactive");
    }

    if (index < 1) {
      $(".nav-back").addClass("inactive");
      $(".nav-btn").css("display", "none");
    } else {
      $(".nav-back").removeClass("inactive");
      $(".nav-btn").css("display", "inline-block");
    }

    $(`#indicator-${index + 1}`).addClass("active");
  });
}
