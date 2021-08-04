export function selectedThemeColor() {
  let brStorage = window.localStorage;

  let primaryColor = brStorage.getItem('primary-color');
  let root = document.documentElement;
  if (/^#[0-9A-F]{6}$/i.test(primaryColor)) {
    root.style.setProperty('--primary-color', primaryColor);
    document.getElementById("favcolor").value = primaryColor;
  }

  document.getElementById("favcolor-btn").addEventListener("click", (event) => {
    event.target.style.opacity = 0.8;
    setInterval(() => {
      event.target.style.opacity = 1;
    }, 150);
    brStorage.setItem('primary-color', document.getElementById("favcolor").value);
    root.style.setProperty('--primary-color', document.getElementById("favcolor").value);
  });
}


export function setDefaultThemeColor() {
  document.getElementById("default-favcolor-btn").addEventListener("click", (event) => {
    event.target.style.opacity = 0.8;
    setInterval(() => {
      event.target.style.opacity = 1;
    }, 150);

    let brStorage = window.localStorage;
    let root = document.documentElement;
    root.style.setProperty('--primary-color', "#000000");
    document.getElementById("favcolor").value = "#000000";
    brStorage.setItem('primary-color', document.getElementById("favcolor").value);
    root.style.setProperty('--primary-color', document.getElementById("favcolor").value);
  });
}

export function donate() {
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



}
