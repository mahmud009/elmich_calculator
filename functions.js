let CURRENT_ROUTE;

//Initialize function with many default configuration
//===================================================
function init() {
  // Route A, section-2 image changing functionality
  // based on dropdown selection
  let imgId = $("#pedestal-config-A").val();
  $("#img-section-2A img").css("opacity", "0");
  $(`#corners-${imgId}`).css("opacity", "1");

  $("#pedestal-config-A").on("change", function () {
    let imgId = $(this).val();
    $("#img-section-2A img").css("opacity", "0");
    $(`#corners-${imgId}`).css("opacity", "1");
  });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

//Function to implement tabbed view layout
//===================================================
function tabbedView() {
  // 2 way route map
  let routeMap = {
    A: [1, "2A", 3],
    B: [1, "2B", 3],
  };

  // Initialization of current route and current index
  let route;
  let index = 0;

  // Helper function to change old section to new section
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

  // When route selector will clicked it will initialize
  // the route and index variable as well as go to next section
  // Based on route
  $(".root-selector-wrap").on("click", function (e) {
    $(".section-indicator-btn").removeClass("active");

    e.preventDefault();
    route = $(this).data().route;
    CURRENT_ROUTE = route;
    $(".nav-btn").css({ display: "inline-block" });
    $(".nav-btn").removeClass("inactive");
    index++;
    toggleSection($("#section-1"), $(`#section-${routeMap[route][index]}`));
    $(window).scrollTop($("#indicator-btn-wrap").offset().top);

    $(`#indicator-${index + 1}`).addClass("active");
  });

  // After clicking root selector, nav buttons will be available
  // and they will work based on initialized route and index variable
  $(".nav-buttons button").on("click", function () {
    // Target like next or back
    let target = $(this).data().target;

    // If active section index reached maximum and minimum function will return
    if ((index == 2 && target != "back") || (index == 0 && target != "next"))
      return;

    // Every time nav button is clicked site will be scrolled
    // to the top of the form
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
      $("input").val("");
    } else {
      $(".nav-back").removeClass("inactive");
      $(".nav-btn").css("display", "inline-block");
    }

    $(`#indicator-${index + 1}`).addClass("active");
  });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

//Function to change some field's value dynamically on route A
//=============================================================
function dynamicChanges_A() {
  // Route A, Area field value change dynamically
  // Based on length and breadth change
  $("#site-length-A, #site-breadth-A").on("change", function () {
    let route = CURRENT_ROUTE;
    if (route != "A") return;

    let length = $("#site-length-A").val();
    let breadth = $("#site-breadth-A").val();

    if (length > 0 && breadth > 0) {
      let area = (length / 1000) * (breadth / 1000);
      $("#calculation-area-A").val(area.toFixed(2));
    } else {
      $("#calculation-area-A").val("");
    }
  });

  // Route A, Pavers field value change dynamically
  // Based on Site length - breadth and Tile length - breadth
  $("#site-length-A, #site-breadth-A, #tile-length-A, #tile-breadth-A").on(
    "change",
    function () {
      let route = CURRENT_ROUTE;
      if (route != "A") return;

      let siteLength = $("#site-length-A").val();
      let siteBreadth = $("#site-breadth-A").val();
      let tileLength = $("#tile-length-A").val();
      let tileBreadth = $("#tile-breadth-A").val();

      let condition =
        siteLength > 0 && siteBreadth > 0 && tileLength > 0 && tileBreadth > 0;

      if (condition) {
        let pavers = (siteLength / tileLength) * (siteBreadth / tileBreadth);

        $("#calculation-pavers-A").val(Math.ceil(pavers));
      } else {
        $("#calculation-pavers-A").val("");
      }
    }
  );

  // Route A, Pedestal field value change dynamically
  // Based on Site length - breadth and Tile length - breadth, pedestal config
  $(
    "#site-length-A, #site-breadth-A, #tile-length-A, #tile-breadth-A, #pedestal-config-A"
  ).on("change", function () {
    let route = CURRENT_ROUTE;
    if (route != "A") return;

    let siteLength = $("#site-length-A").val();
    let siteBreadth = $("#site-breadth-A").val();
    let tileLength = $("#tile-length-A").val();
    let tileBreadth = $("#tile-breadth-A").val();
    let config = $("#pedestal-config-A").val();

    let condition =
      siteLength > 0 &&
      siteBreadth > 0 &&
      tileLength > 0 &&
      tileBreadth > 0 &&
      config != "";

    if (condition) {
      let pedestals;
      let pavers = Math.ceil(
        (siteLength / tileLength) * (siteBreadth / tileBreadth)
      );

      switch (true) {
        case config == 1:
          pedestals =
            Math.ceil(siteLength / tileLength + 1) *
            Math.ceil(siteBreadth / tileBreadth + 1);
          break;
        case config == 2:
          pedestals =
            Math.ceil(siteLength / tileLength + 1) *
              Math.ceil(siteBreadth / tileBreadth + 1) +
            pavers;
          break;

        case config == 3:
          pedestals =
            (Math.ceil(siteLength / tileLength) * 2 + 1) *
            (Math.ceil(siteBreadth / tileBreadth) * 2 + 1);
          break;
      }

      $("#calculation-pedestals-A").val(pedestals);

      // Section 3, pedestal total field dynamic change
      $("#pedstal-total").val(pedestals);
    } else {
      $("#calculation-pedestals-A").val("");
      $("#pedstal-total").val("");
    }
  });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

//Function to change some field's value dynamically on Route - B
//==============================================================
function dynamicChanges_B() {
  // Route B, Area field value change dynamically
  // Based on length and breadth change
  $("#site-length-B, #site-breadth-B").on("change", function () {
    let route = CURRENT_ROUTE;
    if (route != "B") return;

    let length = $("#site-length-B").val();
    let breadth = $("#site-breadth-B").val();

    if (length > 0 && breadth > 0) {
      let area = (length / 1000) * (breadth / 1000);
      $("#calculation-area-B").val(area.toFixed(2));
    } else {
      $("#calculation-area-B").val("");
    }
  });

  // Route B, Pedestal field value change dynamically
  // Based on Site length - breadth and Tile length - breadth, pedestal config
  $("#site-length-B, #site-breadth-B, #along-joist-B, #between-joist-B").on(
    "change",
    function () {
      let route = CURRENT_ROUTE;
      if (route != "B") return;

      let siteLength = $("#site-length-B").val();
      let siteBreadth = $("#site-breadth-B").val();
      let alongJoist = $("#along-joist-B").val();
      let betweenJoist = $("#between-joist-B").val();

      let condition =
        siteLength > 0 && siteBreadth > 0 && alongJoist > 0 && betweenJoist > 0;

      if (condition) {
        let pedestals =
          Math.ceil(siteLength / alongJoist + 1) *
          Math.ceil(siteBreadth / betweenJoist + 1);

        $("#calculation-pedestals-B").val(pedestals);

        // Section 3, pedestal total field dynamic change
        $("#pedstal-total").val(pedestals);
      } else {
        $("#calculation-pedestals-B").val("");
        $("#pedstal-total").val("");
      }
    }
  );
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx
