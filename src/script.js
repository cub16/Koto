// --- Themes & Focus ---
let currentTheme = document.documentElement.getAttribute("data-theme");
let focusActive = false;

document.querySelector("#theme").addEventListener("click", () => {
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    currentTheme = "light";
    document.querySelector("#theme").textContent = "☀";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    currentTheme = "dark";
    document.querySelector("#theme").textContent = "🌙";
  }
});

document.querySelector("#focus").addEventListener("click", () => {
  if (!focusActive) {
    document.querySelector("#focus").textContent = "📘";
    document.querySelectorAll(".dispensable").forEach((el) => {
      el.style.visibility = "hidden";
    });
    document.querySelector("#writer").style.height = "150%";
    focusActive = true;
  } else {
    document.querySelector("#focus").textContent = "📖";
    document.querySelectorAll(".dispensable").forEach((el) => {
      el.style.visibility = "visible";
    });
    document.querySelector("#writer").style.height = "100%";
    focusActive = false;
  }
});

// --- Save & Load ---
document.querySelector("#save").addEventListener("click", () => {
  downloadText("text-" + Date.now(), document.querySelector("#writer").value);
});

document.querySelector("#load-input").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = function () {
        const content = reader.result;
        document.querySelector("#writer").value = content;
        document.querySelector("#load-input").value = "";
      };

      reader.readAsText(file, "utf-8");
    } else {
      alert("ERROR: File content is not plain text");
      document.querySelector("#load-input").value = "";
    }
  } else {
    return;
  }
});

document.querySelector("#load").addEventListener("click", () => {
  document.querySelector("#load-input").click();
});
