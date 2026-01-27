(() => {
  const root = document.documentElement;
  const body = document.body;

  if (!body) return;

  root.classList.remove("no-js");
  root.classList.add("js");

  let page = body.dataset.page || "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsViewTransitions = typeof document.startViewTransition === "function";
  const introStorageKey = "cbcIntroPlayed";
  let isNavigating = false;
  let introTimeout;
  let currentPath = window.location.pathname;
  let peopleController = null;

  const setupPeopleGlobalListener = () => {
    if (body.dataset.peopleClickReady) return;
    body.dataset.peopleClickReady = "true";

    document.addEventListener("click", (event) => {
      if (!peopleController || !peopleController.isExpanded()) return;
      if (event.defaultPrevented) return;
      if (event.target.closest(".person-card.is-expanded, .person-card.is-expanding, .person-card.is-collapsing")) return;
      if (event.target.closest("a, button")) return;
      peopleController.requestCollapse();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!peopleController || !peopleController.isExpanded()) return;
      peopleController.requestCollapse();
    });
  };

  const setPage = (nextPage) => {
    page = nextPage || "";
    body.dataset.page = page;
  };

  const applyNavActive = () => {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      link.classList.remove("active");
    });
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) {
        link.classList.add("active");
      }
    });
  };

  const setupNavIndicator = () => {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
    const indicator = nav.querySelector(".nav-indicator");
    if (!indicator) return;

    const updateIndicator = (target) => {
      const link = target || nav.querySelector("a.active") || nav.querySelector("a");
      if (!link) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      nav.style.setProperty("--nav-left", `${linkRect.left - navRect.left}px`);
      nav.style.setProperty("--nav-width", `${linkRect.width}px`);
      nav.classList.add("has-indicator");
    };

    if (!nav.dataset.indicatorReady) {
      nav.dataset.indicatorReady = "true";

      nav.addEventListener("pointerover", (event) => {
        const link = event.target.closest("a");
        if (!link) return;
        updateIndicator(link);
      });

      nav.addEventListener("pointerleave", () => {
        updateIndicator();
      });

      window.addEventListener("resize", () => updateIndicator());

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => updateIndicator());
      }
    }

    updateIndicator();
  };

  const applyImageFallbacks = () => {
    const fallbackLabel = (label) => {
      const safe = (label || "Lorem ipsum").replace(/[^a-zA-Z0-9 ]/g, "");
      const svg =
        "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='600' viewBox='0 0 480 600'>" +
        "<rect width='100%' height='100%' fill='%23f3e7db'/>" +
        "<text x='50%' y='50%' font-family='Fraunces,serif' font-size='24' fill='%238a7f75' text-anchor='middle' dominant-baseline='middle' letter-spacing='2'>" +
        safe +
        "</text></svg>";
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    };

    const markMissing = (img) => {
      const frame = img.closest(".img-frame");
      const label = img.dataset.fallbackLabel || img.alt || "Lorem ipsum";
      if (frame) {
        frame.classList.add("is-missing");
        if (!frame.dataset.label) {
          frame.dataset.label = label;
        }
      } else {
        img.src = fallbackLabel(label);
      }
    };

    document.querySelectorAll("img[data-fallback]").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) {
        markMissing(img);
      }
      img.addEventListener("error", () => markMissing(img));
    });
  };

  const setupPeopleExpansion = () => {
    const grid = document.querySelector(".people-grid");
    if (!grid) {
      peopleController = null;
      return;
    }
    if (grid.dataset.expandReady && peopleController) {
      peopleController.syncFromHash({ animate: false });
      return;
    }
    grid.dataset.expandReady = "true";

    const cards = Array.from(grid.querySelectorAll(".person-card"));
    const cardById = new Map(cards.map((card) => [card.id, card]));
    let expandedCard = null;
    let expandTimer;
    let collapseTimer;
    let lockedHeight = null;

    const lockHeight = () => {
      if (lockedHeight) return;
      const rect = grid.getBoundingClientRect();
      lockedHeight = rect.height;
      if (lockedHeight > 0) {
        grid.style.minHeight = `${lockedHeight}px`;
      }
    };

    const unlockHeight = () => {
      grid.style.minHeight = "";
      lockedHeight = null;
    };

    const clearTimers = () => {
      if (expandTimer) window.clearTimeout(expandTimer);
      if (collapseTimer) window.clearTimeout(collapseTimer);
    };

    const setCardAvailability = (card, available) => {
      card.setAttribute("aria-hidden", available ? "false" : "true");
      card.tabIndex = available ? 0 : -1;
    };

    const finishCollapse = (card) => {
      card.classList.remove("is-collapsing");
      grid.classList.remove("is-expanded");
      cards.forEach((item) => setCardAvailability(item, true));
      unlockHeight();
      expandedCard = null;
    };

    const collapseExpanded = (options = {}) => {
      if (!expandedCard) return;
      const { animate = true } = options;
      clearTimers();
      const card = expandedCard;
      card.classList.remove("is-expanding", "is-expanded");
      card.classList.add("is-collapsing");
      card.setAttribute("aria-expanded", "false");
      if (animate) {
        collapseTimer = window.setTimeout(() => finishCollapse(card), 320);
      } else {
        finishCollapse(card);
      }
    };

    const finishExpand = (card) => {
      card.classList.add("is-expanded");
      card.classList.remove("is-expanding");
    };

    const expandCard = (card, options = {}) => {
      if (!card) return;
      const { animate = true, pushHistory = true } = options;

      if (expandedCard && expandedCard !== card) {
        collapseExpanded({ animate: false });
      }

      clearTimers();
      expandedCard = card;
      lockHeight();
      grid.classList.add("is-expanded");
      cards.forEach((item) => setCardAvailability(item, item === card));

      card.classList.remove("is-collapsing");
      card.classList.add("is-expanding");
      card.setAttribute("aria-expanded", "true");

      if (animate) {
        expandTimer = window.setTimeout(() => finishExpand(card), 320);
      } else {
        finishExpand(card);
      }

      if (pushHistory && card.id) {
        window.history.pushState({ personId: card.id }, "", `${window.location.pathname}#${card.id}`);
      }
    };

    const requestCollapse = () => {
      if (!expandedCard) return;
      const currentState = window.history.state;
      if (currentState && currentState.personId === expandedCard.id) {
        window.history.back();
      } else {
        window.history.replaceState({}, "", window.location.pathname);
        collapseExpanded({ animate: true });
      }
    };

    const toggleCard = (card) => {
      if (card.classList.contains("is-expanded") || card.classList.contains("is-expanding")) {
        return;
      }
      expandCard(card, { animate: true, pushHistory: true });
    };

    const syncFromHash = (options = {}) => {
      const { animate = true } = options;
      const hash = window.location.hash ? window.location.hash.slice(1) : "";
      if (!hash) {
        collapseExpanded({ animate });
        return;
      }
      const target = cardById.get(decodeURIComponent(hash));
      if (!target) {
        collapseExpanded({ animate });
        return;
      }
      if (expandedCard === target && target.classList.contains("is-expanded")) return;
      expandCard(target, { animate, pushHistory: false });
    };

    grid.addEventListener("click", (event) => {
      const card = event.target.closest(".person-card");
      if (!card || !grid.contains(card)) return;
      toggleCard(card);
    });

    grid.addEventListener("keydown", (event) => {
      const card = event.target.closest(".person-card");
      if (!card || !grid.contains(card)) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard(card);
      }
    });

    peopleController = {
      syncFromHash,
      collapseExpanded,
      requestCollapse,
      isExpanded: () => !!expandedCard,
      grid,
    };
    setupPeopleGlobalListener();
    syncFromHash({ animate: false });
  };

  const runIntro = () => {
    const intro = document.getElementById("blossom-intro");
    root.classList.remove("intro-play");

    if (!intro) {
      root.classList.add("intro-complete");
      return;
    }

    if (page !== "home" || reduceMotion) {
      root.classList.add("intro-complete");
      return;
    }

    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem(introStorageKey) === "true";
    } catch (error) {
      hasPlayed = false;
    }

    if (hasPlayed) {
      root.classList.add("intro-complete");
      return;
    }

    try {
      sessionStorage.setItem(introStorageKey, "true");
    } catch (error) {
      // Ignore storage failures.
    }

    root.classList.remove("intro-complete");
    root.classList.add("intro-play");
    window.clearTimeout(introTimeout);
    introTimeout = window.setTimeout(() => {
      root.classList.add("intro-complete");
      root.classList.remove("intro-play");
    }, 2400);
  };

  const restartReveals = () => {
    body.classList.remove("page-loaded");
    void body.offsetWidth;
    body.classList.add("page-loaded");
  };

  const loadPage = async (url, options = {}) => {
    if (isNavigating) return;
    isNavigating = true;

    const { push = true, scroll = true, animate = !reduceMotion } = options;

    let response;
    try {
      response = await fetch(url, { headers: { "X-Requested-With": "fetch" } });
    } catch (error) {
      window.location.href = url;
      return;
    }

    if (!response || !response.ok) {
      window.location.href = url;
      return;
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const newMain = doc.querySelector("main");

    if (!newMain) {
      window.location.href = url;
      return;
    }

    const newTitle = doc.title;
    const newPage = doc.body ? doc.body.dataset.page : null;

    const targetPath = new URL(url, window.location.href).pathname;

    const swap = () => {
      const currentMain = document.querySelector("main");
      if (currentMain) {
        currentMain.replaceWith(newMain);
      }
      if (newTitle) {
        document.title = newTitle;
      }
      if (newPage) {
        setPage(newPage);
      }
      currentPath = targetPath;
      applyNavActive();
      setupNavIndicator();
      applyImageFallbacks();
      setupPeopleExpansion();
      runIntro();
      restartReveals();
      if (scroll) {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }
    };

    if (supportsViewTransitions && animate) {
      const transition = document.startViewTransition(() => swap());
      transition.finished.finally(() => {
        isNavigating = false;
      });
    } else if (animate) {
      body.classList.add("page-leave");
      window.setTimeout(() => {
        swap();
        body.classList.remove("page-leave");
        isNavigating = false;
      }, 420);
    } else {
      swap();
      isNavigating = false;
    }

    if (push) {
      window.history.pushState({}, "", url);
    }
  };

  const enableSmoothNavigation = () => {
    if (document.body.dataset.navReady) return;
    document.body.dataset.navReady = "true";

    document.addEventListener("click", (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a");
      if (!link) return;

      if (link.dataset.noTransition !== undefined) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (![`http:`, `https:`].includes(url.protocol)) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.href === window.location.href) return;

      event.preventDefault();
      loadPage(url.href);
    });

    window.addEventListener("popstate", () => {
      const nextPath = window.location.pathname;
      if (nextPath === currentPath) {
        if (peopleController) {
          peopleController.syncFromHash({ animate: true });
        }
        return;
      }
      loadPage(window.location.href, { push: false, scroll: false });
    });
  };

  const onReady = () => {
    body.classList.add("page-loaded");
    applyNavActive();
    setupNavIndicator();
    applyImageFallbacks();
    setupPeopleExpansion();
    currentPath = window.location.pathname;
    runIntro();
    enableSmoothNavigation();

    if (!body.classList.contains("page-initialized")) {
      window.setTimeout(() => {
        body.classList.add("page-initialized");
      }, 1200);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
