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

  // Section-3 default shortest height is 37mm
  $("#dimensions-short-height").val("");
  $("#dimensions-short-height").on("change", function () {
    let value = $(this).val();
    if (value < 37) {
      $(this).addClass("not-validated");
      $(this).siblings("h6").css({ color: "#d92027" });
    } else {
      $(this).removeClass("not-validated");
      $(this).siblings("h6").css({ color: "#fe5700" });
    }
  });

  $("#dimensions-short-height").on("blur", function () {
    let value = $(this).val();
    if (value < 37) {
      $(this).addClass("not-validated");
      $(this).siblings("h6").css({ color: "#d92027" });
    } else {
      $(this).removeClass("not-validated");
      $(this).siblings("h6").css({ color: "#fe5700" });

      if (CURRENT_ROUTE == "A") {
        calculate_A();
      } else {
        calculate_B();
      }
    }
  });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Helper functions to validate the section's required field
//=========================================================

function isEmpty(value) {
  let validate =
    value == null ||
    value == "none" ||
    value == "" ||
    value == 0.0 ||
    value == undefined ||
    value == NaN;
  if (!validate) {
    return false;
  } else {
    return true;
  }
}

function validate(section) {
  let requiredFields = section.find(".required");
  let filedCount = requiredFields.length;
  let validationCount = 0;

  for (field of requiredFields) {
    let value = $(field).val();
    if (!isEmpty(value)) {
      validationCount += 1;
      $(field).removeClass("not-validated");
      $(field).siblings(".validation-error-msg").remove();
    } else {
      $(field).addClass("not-validated");
      let msg = `<h6 class="validation-error-msg">This field is required</h6>`;
      $(msg).insertAfter($(field));
    }
  }

  return filedCount == validationCount;
}

// $("button[data-target=next]").on("click", function () {
//   validate($("#section-2A"));
// });

//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

//===================================================
// Removing unwanted required warning for dynamically
// generated fields
//===================================================
function removeUnwantedWarning() {
  let allRequired = $(".required");
  $("input, select").on("change", function () {
    for (field of allRequired) {
      let value = $(field).val();
      if (!isEmpty(value)) {
        $(field).removeClass("not-validated");
        $(field).siblings(".validation-error-msg").remove();
      }
    }
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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

    if (route == "A") {
      $("#section-3 #section-paving-img").css({ opacity: "1" });
    } else {
      $("#section-3 #section-decking-img").css({ opacity: "1" });
    }
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

    if (target == "next" && !validate($(`#section-2${route}`))) {
      return;
    }

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
      $("#dimensions-short-height").val("");
      $("#slope-percentage").val(0);
      $("#slope-direction").val(1);
      $("#pedestal-config-A").val(1);
      $("#dimensions-short-height").removeClass("not-validated");
      $("#dimensions-short-height").siblings("h6").css({ color: "#fe5700" });
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
        let pavers =
          Math.ceil(siteLength / tileLength) *
          Math.ceil(siteBreadth / tileBreadth);

        $("#calculation-pavers-A").val(pavers);
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
      let pavers =
        Math.ceil(siteLength / tileLength) *
        Math.ceil(siteBreadth / tileBreadth);
      switch (true) {
        case config == 1:
          pedestals =
            (Math.ceil(siteLength / tileLength) + 1) *
            (Math.ceil(siteBreadth / tileBreadth) + 1);
          break;
        case config == 2:
          pedestals =
            (Math.ceil(siteLength / tileLength) + 1) *
              (Math.ceil(siteBreadth / tileBreadth) + 1) +
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
          (Math.ceil(siteLength / alongJoist) + 1) *
          (Math.ceil(siteBreadth / betweenJoist) + 1);

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

// Helper function to calculate result tables Qauntity column value
//==================================================================
function tableParser_A(column) {
  let ranges = [
    { min: 37, max: 50 },
    { min: 51, max: 74 },
    { min: 75, max: 117 },
    { min: 118, max: 201 },
    { min: 202, max: 281 },
    { min: 282, max: 446 },
    { min: 447, max: 524 },
    { min: 525, max: 690 },
    { min: 691, max: 768 },
    { min: 769, max: 934 },
    { min: 935, max: 1014 },
  ];

  let tableCells = [];

  for (let i = 0; i < ranges.length; i++) {
    let cell = {};
    cell.name = `result-f-${i + 1}`;
    cell.count = 0;
    cell.min = ranges[i].min;
    cell.max = ranges[i].max;
    tableCells.push(cell);
  }

  for (let i = 0; i < column.length; i++) {
    for (let j = 0; j < tableCells.length; j++) {
      let current = column[i];
      let cell = tableCells[j];
      if (current >= cell.min && current <= cell.max) {
        cell.count++;
      }
    }
  }
  return tableCells;
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Helper function to calculate result tables Qauntity column value
//==================================================================
function DOMTableRender_A(tableData) {
  for (let i = 0; i < tableData.length; i++) {
    let resultCell = $(`#${tableData[i].name}`);
    let resultValue = tableData[i].resultValue;
    resultCell.text(resultValue);
  }
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Calculate Route - A
// ==============================================================
function calculate_A() {
  // Intialization of all field variable
  let siteLength = Number($("#site-length-A").val());
  let siteBreadth = Number($("#site-breadth-A").val());
  let tileLength = Number($("#tile-length-A").val());
  let tileBreadth = Number($("#tile-breadth-A").val());
  let pedConfig = Number($("#pedestal-config-A").val());
  let pedTotal = Number($("#pedstal-total").val());
  let shortHeight = Number($("#dimensions-short-height").val());
  let slopePercent = Number($("#slope-percentage").val());
  let slopeDirection = Number($("#slope-direction").val());

  // Initiazation of result table
  let table = [];
  let result;

  // If required values are not received then funciton will return
  let condition =
    siteLength > 0 && siteBreadth > 0 && tileLength > 0 && tileBreadth > 0;
  if (!condition) {
    return;
  }

  // if slope percent is zero then shortest heights become 100mm
  // and total pedestal value will go to f3

  // Pedestal confing "corners-only" and slope direction "Length-wise"
  //-----------------------------------------------------------------
  if (pedConfig == 1 && slopeDirection == 1) {
    // Cornersonly Length wise row numbers
    let rowCount = Math.ceil(siteLength / tileLength) + 1;
    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // Length wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * tileLength +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);
      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteBreadth / tileBreadth) + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // Pedestal confing "corners-only" and slope direction "breadth-wise"
  //-------------------------------------------------------------------
  if (pedConfig == 1 && slopeDirection == 2) {
    // Cornersonly Breadth wise row numbers
    let rowCount = Math.ceil(siteBreadth / tileBreadth) + 1;
    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // Breadth wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * tileBreadth +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);
      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteLength / tileLength) + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // Pedestal confing "corners-center" and slope direction "length-wise"
  //-------------------------------------------------------------------
  if (pedConfig == 2 && slopeDirection == 1) {
    // Corners-center length wise row numbers
    let rowCount = Math.ceil(siteLength / tileLength) + 1;

    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // length wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * tileLength +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);

      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    for (let i = 1; i <= rowCount - 1; i++) {
      // length wise center
      table[i - 1].centerHeights = Number(
        (
          (((i - 1) * slopePercent) / 100) * tileLength +
          shortHeight +
          (tileLength * slopePercent) / 100 / 2 +
          Number(0.00001)
        ).toFixed(0)
      );
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteBreadth / tileBreadth) + 1);
      } else {
        m.resultValue = 0;
      }
    });

    let centerHeightsColumn = table.map((m) => {
      if (m.centerHeights) {
        return m.centerHeights;
      } else {
        return 0;
      }
    });

    let centerResult = tableParser_A(centerHeightsColumn);
    centerResult.map((m) => {
      if (m.count) {
        m.resultValue = m.count * Math.ceil(siteBreadth / tileBreadth);
      } else {
        m.resultValue = 0;
      }
    });
    for (let i = 0; i < result.length; i++) {
      result[i].resultValue =
        result[i].resultValue + centerResult[i].resultValue;
    }
  }

  // Pedestal confing "corners-center" and slope direction "breadth-wise"
  //-------------------------------------------------------------------
  if (pedConfig == 2 && slopeDirection == 2) {
    // Corners-center length wise row numbers
    let rowCount = Math.ceil(siteBreadth / tileBreadth) + 1;

    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // length wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * tileLength +
        shortHeight +
        Number(0.00001)
      ).toFixed();

      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    for (let i = 1; i <= rowCount - 1; i++) {
      // length wise center
      table[i - 1].centerHeights = Math.ceil(
        (((i - 1) * slopePercent) / 100) * tileLength +
          shortHeight +
          (tileLength * slopePercent) / 100 / 2 +
          Number(0.00001)
      );
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteLength / tileLength) + 1);
      } else {
        m.resultValue = 0;
      }
    });

    let centerHeightsColumn = table.map((m) => {
      if (m.centerHeights) {
        return m.centerHeights;
      } else {
        return 0;
      }
    });

    let centerResult = tableParser_A(centerHeightsColumn);
    centerResult.map((m) => {
      if (m.count) {
        m.resultValue = m.count * Math.ceil(siteLength / tileLength);
      } else {
        m.resultValue = 0;
      }
    });
    for (let i = 0; i < result.length; i++) {
      result[i].resultValue =
        result[i].resultValue + centerResult[i].resultValue;
    }
  }

  // Pedestal confing "corners-center-edges" and slope direction "length-wise"
  //--------------------------------------------------------------------------
  if (pedConfig == 3 && slopeDirection == 1) {
    // Corners-center-edges length wise row numbers
    let rowCount = Math.ceil(siteLength / tileLength) * 2 + 1;

    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // length wise row heights
      tableRow.rowHeights = (
        ((((i - 1) * slopePercent) / 100) * tileLength) / 2 +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);

      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    for (let i = 1; i <= (rowCount - 1) / 2; i++) {
      // length wise center
      table[i - 1].centerHeights = Number(
        (
          (((i - 1) * slopePercent) / 100) * tileLength +
          shortHeight +
          (tileLength * slopePercent) / 100 / 2 +
          Number(0.00001)
        ).toFixed(0)
      );
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue =
          m.count * (Math.ceil(siteBreadth / tileBreadth) * 2 + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // Pedestal confing "corners-center-edges" and slope direction "breadth-wise"
  //--------------------------------------------------------------------------
  if (pedConfig == 3 && slopeDirection == 2) {
    // Corners-center-edges breadth wise row numbers
    let rowCount = Math.ceil(siteBreadth / tileBreadth) * 2 + 1;

    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // Breadth wise row heights
      tableRow.rowHeights = (
        Math.ceil(((((i - 1) * slopePercent) / 100) * tileLength) / 2) +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);

      tableRow.pedConfig = pedConfig;
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    for (let i = 1; i <= (rowCount - 1) / 2; i++) {
      // Breadth wise center
      table[i - 1].centerHeights = Number(
        (
          (((i - 1) * slopePercent) / 100) * tileLength +
          shortHeight +
          (tileLength * slopePercent) / 100 / 2 +
          Number(0.00001)
        ).toFixed(0)
      );
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    console.log(result);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteLength / tileLength) * 2 + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // If the result's quantity is less than pedestal total
  // It means it is outside of range due to highest shortest value
  // In that case, to show user a message, belo code works
  let totalResult = result
    .map((m) => Number(m.resultValue))
    .reduce((a, b) => a + b);

  if (totalResult < pedTotal) {
    let msg = `<h6 class="incorrect-result-msg">Please decrease shortest height to get the correct result</h6>`;
    $("#result-table").addClass("incorrect-result");
    $(msg).insertBefore($("#result-table"));
    console.log(totalResult);
  } else {
    $("#result-table").removeClass("incorrect-result");
    $(".incorrect-result-msg").remove();
  }
  // Render results for output table
  DOMTableRender_A(result);
  console.log("executed");
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Calculate Route - B
// ==============================================================
function calculate_B() {
  // Intialization of all field variable
  let siteLength = Number($("#site-length-B").val());
  let siteBreadth = Number($("#site-breadth-B").val());
  let alongJoist = Number($("#along-joist-B").val());
  let betweenJoist = Number($("#between-joist-B").val());
  let pedTotal = Number($("#pedstal-total").val());
  let shortHeight = Number($("#dimensions-short-height").val());
  let slopePercent = Number($("#slope-percentage").val());
  let slopeDirection = Number($("#slope-direction").val());

  // Initiazation of result table
  let table = [];
  let result;

  // If required values are not received then funciton will return
  let condition =
    siteLength > 0 && siteBreadth > 0 && alongJoist > 0 && betweenJoist > 0;
  if (!condition) {
    return;
  }

  // if slope percent is zero then shortest heights become 100mm
  // and total pedestal value will go to f3

  // Slope direction "Length-wise"----------------------------------
  //-----------------------------------------------------------------
  if (slopeDirection == 1) {
    // Length wise row numbers
    let rowCount = Math.ceil(siteLength / alongJoist) + 1;
    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // Length wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * alongJoist +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    // tableParser_A was designed for route A, but it fitted with route B
    result = tableParser_A(rowHeightsColumn);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteBreadth / betweenJoist) + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // slope direction "breadth-wise"
  // -------------------------------------------------------------------
  if (slopeDirection == 2) {
    // Cornersonly Breadth wise row numbers
    let rowCount = Math.ceil(siteBreadth / betweenJoist) + 1;
    for (let i = 1; i <= rowCount; i++) {
      let tableRow = {};
      tableRow.rowNumber = i;

      // Breadth wise row heights
      tableRow.rowHeights = (
        (((i - 1) * slopePercent) / 100) * betweenJoist +
        shortHeight +
        Number(0.00001)
      ).toFixed(0);
      tableRow.slopeDirection = slopeDirection;
      table.push(tableRow);
    }

    let rowHeightsColumn = table.map((m) => {
      return m.rowHeights;
    });

    result = tableParser_A(rowHeightsColumn);
    console.log(result);
    result.map((m) => {
      if (m.count) {
        m.resultValue = m.count * (Math.ceil(siteLength / alongJoist) + 1);
      } else {
        m.resultValue = 0;
      }
    });
  }

  // If the result's quantity is less than pedestal total
  // It means it is outside of range due to highest shortest value
  // In that case, to show user a message, belo code works
  let totalResult = result
    .map((m) => Number(m.resultValue))
    .reduce((a, b) => a + b);

  if (totalResult < pedTotal) {
    let msg = `<h6 class="incorrect-result-msg">Please decrease shortest height to get the correct result</h6>`;
    $("#result-table").addClass("incorrect-result");
    $(msg).insertBefore($("#result-table"));
    console.log(totalResult);
  } else {
    $("#result-table").removeClass("incorrect-result");
    $(".incorrect-result-msg").remove();
  }
  // Render results for output table
  DOMTableRender_A(result);
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Function to call calculate function based on any changes
// and based on current route.
function calculateOnAnyChange() {
  $("#section-3 input:not(#dimensions-short-height), #section-3 select").on(
    "change",
    function () {
      let shortHeight = $("#dimensions-short-height").val();
      if (CURRENT_ROUTE == "A" && shortHeight >= 37) {
        calculate_A();
      } else if (CURRENT_ROUTE == "B" && shortHeight >= 37) {
        calculate_B();
      }
    }
  );

  // $(".nav-next").on("click", function () {
  //   if (CURRENT_ROUTE == "A") {
  //     calculate_A();
  //   } else {
  //     calculate_B();
  //   }
  // });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Function to generate pdf file
function generatePdf_A() {
  // PDF functionality
  $("button[data-target=pdf]").on("click", function (e) {
    e.preventDefault();
    let element = document.getElementById("result-pdf-A");
    let pdfWorker = html2pdf();
    // $(this).append(spinner);

    pdfWorker
      .from(element)
      .set({
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 2 },
        margin: [1, 1],
        jsPDF: {
          unit: "in",
        },
      })
      .outputPdf()
      .then((res) => {
        // $(".result-action-buttons button .spinner-border").remove();
      })
      .save("sample.pdf");
  });
}

//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

// Function to generate pdf file and send using mail
function sendEmail() {
  let spinner = `<div class="spinner-border action-btn-spinner"
role="status">
</div>`;
  $("#send-email-form").on("submit", function (e) {
    e.preventDefault();
    $("#mail-submit").append(spinner);
    let pdfData;

    let element = document.getElementById("result-pdf");
    let pdfWorker = html2pdf();
    pdfWorker
      .from(element)
      .set({
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 1 },
        margin: [1, 1],
        jsPDF: {
          unit: "in",
        },
      })
      .outputPdf()
      .then((res) => {
        // console.log(res);
        Email.send({
          // SecureToken: "a2cd447b-0977-4d4d-a376-c709f8682914",
          // Port: "25",
          // TLS: "STARTTLS",

          Host: "mail.okapia-mobile.com",
          Port: "587",
          Username: "mahmudur@okapia-mobile.com",
          Password: "Mahmud@1992",
          To: $("#email-address").val(),
          From: "mahmudur@okapia-mobile.com",
          Subject: "Pedestal Calculation",
          Body: "And this is the body",
          Attachments: [
            {
              name: "pedestal_calculation.pdf",
              data: btoa(res),
            },
          ],
        })
          .then((message) => {
            console.log(message);
            $("#send-email-modal").modal("hide");
            $("#mail-submit .spinner-border").remove();

            setTimeout(() => {
              if (message == "OK") {
                let msg = "Mail send succesfull, please check your inbox";
                $("#mail-status .modal-body p").text(msg);
              } else {
                $("#mail-status .modal-body p").text(message);
              }
              $("#mail-status").modal();
            }, 500);
          })
          .catch((err) => console.log(err));
      });
  });
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx
