export function accordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("accordion_active");
      var panel = this.nextElementSibling;
      if (panel.clientHeight > 15) {
        panel.style.height = 0;
      } else {
        panel.style.height = panel.scrollHeight + "px";
      }
    });
  }
}


export function toggle_menu() {
  $(".br-menu").on("click", function () {
    let sidebar_height = $(".nav").height() + 1;
    $(".sidebar").css("margin-top", sidebar_height);
    $(".sidebar").toggle();
  })
}
