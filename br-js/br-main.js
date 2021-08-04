window.binaryRide = {};

$('#nav-logo').on("click", () => {
  window.location.href = "https://binaryride.github.io";
});

// accordion
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

// toggle_menu
$(".br-menu").on("click", function () {
  let sidebar_height = $(".nav").height() + 1;
  $(".sidebar").css("margin-top", sidebar_height);
  $(".sidebar").toggle();
})

// selectedThemeColor
let brStorage = window.localStorage;

let primaryColor = brStorage.getItem('primary-color');
let root = document.documentElement;
if (/^#[0-9A-F]{6}$/i.test(primaryColor)) {
  root.style.setProperty('--primary-color', primaryColor);
  document.getElementById("favcolor").value = primaryColor;
  root.style.setProperty('--primaryrgb-color', hex2rgb(primaryColor));
}

document.getElementById("favcolor-btn").addEventListener("click", (event) => {
  event.target.style.opacity = 0.8;
  setInterval(() => {
    event.target.style.opacity = 1;
  }, 150);
  brStorage.setItem('primary-color', document.getElementById("favcolor").value);
  root.style.setProperty('--primary-color', document.getElementById("favcolor").value);
  root.style.setProperty('--primaryrgb-color', hex2rgb(document.getElementById("favcolor").value));
});

// setDefaultThemeColor
document.getElementById("default-favcolor-btn").addEventListener("click", (event) => {
  event.target.style.opacity = 0.8;
  setInterval(() => {
    event.target.style.opacity = 1;
  }, 150);

  let brStorage = window.localStorage;
  let root = document.documentElement;
  root.style.setProperty('--primary-color', "black");
  document.getElementById("favcolor").value = "black";
  brStorage.setItem('primary-color', document.getElementById("favcolor").value);
  root.style.setProperty('--primary-color', document.getElementById("favcolor").value);
  root.style.setProperty('--primaryrgb-color', hex2rgb(document.getElementById("favcolor").value));
});

// donate
window.binaryRide.donationAmount = "10";
$(".br-pp-amount").on("keyup", (event) => {
  if (event.target.value > 0) {
    window.binaryRide.donationAmount = event.target.value;
    $(".br-choose-method").css("display", "block");
    $(".br-pp-buttons").css("display", "block");
  } else {
    $(".br-choose-method").css("display", "none");
    $(".br-pp-buttons").css("display", "none");
  }
});

function hex2rgb(hex) {
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}
