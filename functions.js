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
