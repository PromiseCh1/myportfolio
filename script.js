(() => {
  const state = {
    isHovered: "",
    socialHovered: "",
  };

  // Event Listeners for Navigation Links
  document.querySelectorAll('[data-el^="a-"]').forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const num = el.getAttribute("data-el").split("-")[1];
      switch (num) {
        case "1":
          state.isHovered = "home";
          break;
        case "2":
          state.isHovered = "projects";
          break;
        case "3":
          state.isHovered = "about";
          break;
        case "4":
          state.isHovered = "contact";
          break;
        case "5":
          state.socialHovered = "linkedin";
          break;
        case "6":
          state.socialHovered = "instagram";
          break;
        case "7":
          state.socialHovered = "facebook";
          break;
      }
      update();
    });

    el.addEventListener("mouseleave", () => {
      state.isHovered = "";
      state.socialHovered = "";
      update();
    });
  });

  // Button hover effect
  const button = document.querySelector('[data-el="button-1"]');
  button.addEventListener("mouseenter", () => {
    state.isHovered = "button";
    update();
  });
  button.addEventListener("mouseleave", () => {
    state.isHovered = "";
    update();
  });

  // Update function to handle state changes
  function update() {
    // Navigation links hover effect
    document.querySelectorAll('[data-el="a-1"]').forEach((el) => {
      Object.assign(el.style, {
        color: state.isHovered === "home" ? "#000" : "#000",
        textDecoration: state.isHovered === "home" ? "underline" : "none",
        textDecorationColor:
          state.isHovered === "home" ? "#ff0000" : "transparent",
      });
    });

    // Social icons hover effect
    if (state.socialHovered) {
      const colors = {
        linkedin: "#0A66C2",
        instagram: "#E4405F",
        facebook: "#1877F2",
      };
      document.querySelector(
        `[data-el="a-${
          state.socialHovered === "linkedin"
            ? "5"
            : state.socialHovered === "instagram"
              ? "6"
              : "7"
        }"]`,
      ).style.color = colors[state.socialHovered];
    }

    // Button hover effect
    if (state.isHovered === "button") {
      button.style.transform = "scale(1.05)";
    } else {
      button.style.transform = "scale(1)";
    }
  }
})();
