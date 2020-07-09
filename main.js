$(function () {
  init();
  dynamicChanges_A();
  dynamicChanges_B();
  tabbedView();
  calculateOnAnyChange();
  removeUnwantedWarning();

  // PDF functionality
  $("button[data-target=pdf]").on("click", function (e) {
    e.preventDefault();
    let element = document.getElementById("result-pdf");
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
      .save("Net_sheet.pdf");
  });
});
