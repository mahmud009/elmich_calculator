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

function tableOutput(value, config) {
  let result;

  switch (true) {
    case value >= 37 && value <= 50:
      result = Math.round(config.siteBreadth / config.tileBreadth) + 1;
      $(`#result-f-1`).val(result);
      break;
  }

  return result;
}

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

function DOMTableRender_A(tableData) {
  for (let i = 0; i < tableData.length; i++) {
    let resultCell = $(`#${tableData[i].name}`);
    let resultValue = tableData[i].resultValue;
    resultCell.text(resultValue);
  }
}

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
    console.log(result);
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

  DOMTableRender_A(result);
  console.log(table);
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

  // Slope direction "Length-wise"
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

  // DOMTableRender_A was designed for route A, but it fitted with route B
  DOMTableRender_A(result);
}
//xxxxxxxxxxxxxxx-- End of function --xxxxxxxxxxxxxxxxxxxxx

function calculateOnAnyChange() {
  $("#section-3 input, #section-3 select").on("change", function () {
    if (CURRENT_ROUTE == "A") {
      calculate_A();
    } else {
      calculate_B();
    }
  });

  $(".nav-next").on("click", function () {
    if (CURRENT_ROUTE == "A") {
      calculate_A();
    } else {
      calculate_B();
    }
  });
}
