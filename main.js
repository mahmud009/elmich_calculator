$(function () {
  init();
  dynamicChanges_A();
  dynamicChanges_B();
  tabbedView();
  calculateOnAnyChange();
  removeUnwantedWarning();
  generatePdf();
  sendEmail();

  $(".btn-email").on("click", function () {
    console.log($("#send-email-modal").click());
  });
});
