function TitleCalc(pp) {
  // Calc Ins based upon rates per 1000 per bracket
  var PurchasePrice = pp;
  var TitleInsurance = 0;
  var TempPurchasePrice = 0;
  if (PurchasePrice > 150000) {
    // if over 150K
    //Set price for first 150k
    TitleInsurance = 862.5;
    TempPurchasePrice = PurchasePrice - 150000;
    if (TempPurchasePrice > 100000) {
      //If over 250K
      //Set price for first 250k
      TitleInsurance = 1312.5;
      TempPurchasePrice = TempPurchasePrice - 100000;
      if (TempPurchasePrice > 250000) {
        //If over 500K
        //Set price for first 500k
        TitleInsurance = 2187.5;
        TempPurchasePrice = TempPurchasePrice - 250000;
        //Set price for over 500k to be 2.75 per 1000
        TempPurchasePrice = TempPurchasePrice / 1000;
        TitleInsurance = TitleInsurance + TempPurchasePrice * 2.75;
      }
      //If between 250 and 500K
      else {
        //Set price for over 150K / under 250K to be 3.50 per 1000
        TempPurchasePrice = TempPurchasePrice / 1000;
        TitleInsurance = TitleInsurance + TempPurchasePrice * 3.5;
      }
    }
    //If between 150 and 250K
    else {
      //Set price for over 150K / under 250K to be 4.50 per 1000
      TempPurchasePrice = TempPurchasePrice / 1000;
      TitleInsurance = TitleInsurance + TempPurchasePrice * 4.5;
    }
  }
  // if under 150K
  else {
    //Set price for under 150K 5.75 per 1000
    TempPurchasePrice = PurchasePrice / 1000;
    TitleInsurance = TempPurchasePrice * 5.75;
  }
  // Normalize and set form value
  TitleInsurance = Math.ceil(TitleInsurance * 115) / 100;
  return formatNum(TitleInsurance);
}

function getAllInputProperty() {
  let allInputWrapper = document.querySelectorAll(".input-wrapper");
  let table = $("body").append(
    `<table id="test-table">
        <tr>
          <th>Display Text</th>
          <th>Label's for</th>
          <th>Input's name</th>
          <th>Input's id</th>
          <th>Wrapper div class</th>
        <tr>
      </table>`
  );
  for (element of allInputWrapper) {
    let tr = `
      <tr>
        <td>${$(element).find("label").text()}</td>
        <td>${$(element).find("label").attr("for")}</td>
        <td>${$(element).find("input").attr("name")}</td>
        <td>${$(element).find("input").attr("id")}</td>
        <td>${$(element).find("div").attr("class")}</td>
      <tr>
      `;
    $("#test-table").append(tr);
  }
}
