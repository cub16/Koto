// --- Themes & Focus ---
let currentTheme = $("html").attr("data-theme");
let focusActive = false;

$("#theme").click(() => {
  if (currentTheme === "dark") {
    currentTheme = "light";
    $("html").attr("data-theme", "light");
    $("#theme").text("☀");
  } else {
    currentTheme = "dark";
    $("html").attr("data-theme", "dark");
    $("#theme").text("🌙");
  }
});

$("#focus").click(() => {
  if (focusActive) {
    focusActive = false;
    $("#focus").text("📘");
    $(".dispensable").css("visibility", "visible");
    $("#writer").css("height", "100%");
  } else {
    focusActive = true;
    $("#focus").text("📖");
    $(".dispensable").css("visibility", "hidden");
    $("#writer").css("height", "150%");
  }
});

// --- Save & Load ---
$("#save").click(() => {
  downloadText("text-" + Date.now(), $("#writer").val());
});

$("#load-input").change((event) => {
  const file = event.target.files[0];

  if (file && file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = () => {
      $("#writer").val(reader.result);
      $("#load-input").val("");
    };
    reader.readAsText(file, "utf-8");
  } else {
    alert("ERROR: File content is not plain text");
    $("#load-input").val("");
  }
});

$("#load").click(() => {
  $("#load-input").click();
});

// Input & Sounds

function getRandomSound() {
  const clickSet = $("#custom-click").val();

  const clicks = {
    typewriter: [
      "click5_1.wav",
      "click5_2.wav",
      "click5_11.wav",
      "click5_33.wav",
      "click5_55.wav",
    ],
    nk_creams: [
      "click4_1.wav",
      "click4_11.wav",
      "click4_2.wav",
      "click4_3.wav",
      "click4_44.wav",
    ],
  };

  try {
    const selected =
      clicks[clickSet][getRandomInt(0, clicks[clickSet].length - 1)];
    return selected;
  } catch (e) {
    console.error(e);
  }
}

$("#writer").on("input", function () {
  if ($("#custom-click").val() == "disabled") {
    return;
  }

  const customClick = new Audio(
    `audios/${$("#custom-click").val()}/${getRandomSound()}`
  );
  customClick.volume = 1;
  customClick.play();
  customClick.addEventListener("ended", function () {
    customClick.remove();
  });
});
