
(() => {
  "use strict";

  const list = document.getElementById("admin-events");
  if (!list) return;

  const icons = [
    [/criar evento/i, "tla-act-create"],
    [/atualizar/i, "tla-act-refresh"],
    [/gerir rondas|configurar rondas/i, "tla-act-rounds"],
    [/participantes/i, "tla-act-people"],
    [/abrir inscri|abrir ronda|abrir evento|reabrir|retomar/i,
      "tla-act-open"],
    [/fechar inscri|fechar ronda|fechar evento/i,
      "tla-act-close"],
    [/pausar evento/i, "tla-act-pause"],
    [/exportar csv/i, "tla-act-export"],
    [/página pública/i, "tla-act-link"],
    [/terminar sessão/i, "tla-act-logout"]
  ];

  function decorateButtons() {
    document.querySelectorAll(
      "#admin-panel button, #admin-panel .public-event-link"
    ).forEach(button => {
      const label = button.textContent.trim();

      for (const [pattern, className] of icons) {
        if (pattern.test(label)) {
          button.classList.add(className);
          break;
        }
      }
    });
  }

  function decorateCards() {
    list.querySelectorAll(".event-card").forEach(card => {
      if (card.dataset.tlaV22 === "ready") return;

      const heading = card.querySelector(":scope > h3");
      if (!heading) return;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "tla-card-toggle";
      toggle.textContent = "Gerir evento";
      toggle.setAttribute("aria-expanded", "false");

      card.dataset.tlaV22 = "ready";
      card.classList.add("tla-card-collapsed");

      heading.insertAdjacentElement("afterend", toggle);

      toggle.addEventListener("click", () => {
        const expanded =
          card.classList.toggle("tla-card-collapsed") === false;

        toggle.setAttribute(
          "aria-expanded",
          String(expanded)
        );

        toggle.textContent = expanded
          ? "Recolher evento"
          : "Gerir evento";
      });
    });
  }

  function updateInterface() {
    decorateCards();
    decorateButtons();
  }

  const observer = new MutationObserver(updateInterface);

  observer.observe(list, {
    childList: true,
    subtree: true
  });

  updateInterface();
})();
