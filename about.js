$(function () {
  $(".trainer-card").each(function () {
    const card = $(this);
    const name = card.find("h3").text();
    const role = card.children("p").first().text();
    const button = $('<button type="button" class="trainer-toggle" aria-expanded="false">Show details</button>');
    const detail = $('<p class="trainer-detail" hidden></p>').text(name + " - " + role);
    card.append(button, detail);
  });
  $(".team-section").on("click", ".trainer-toggle", function () {
    const button = $(this);
    const detail = button.closest(".trainer-card").find(".trainer-detail");
    if (detail.is(":hidden")) {
      detail.hide().removeAttr("hidden").slideDown(220);
      button.text("Hide details").attr("aria-expanded", "true");
    } else {
      detail.slideUp(220, function () { detail.attr("hidden", true); });
      button.text("Show details").attr("aria-expanded", "false");
    }
  });
});