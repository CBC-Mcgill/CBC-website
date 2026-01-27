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
      if (
        event.target.closest(
          ".person-card.is-expanded, .person-card.is-expanding-y, .person-card.is-expanding-x, .person-card.is-collapsing-x, .person-card.is-collapsing-y"
        )
      )
        return;
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
      const safe = (label || "Image Placeholder").replace(/[^a-zA-Z0-9 ]/g, "");
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
      const label = img.dataset.fallbackLabel || img.alt || "Image Placeholder";
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
      if (img.dataset.fallbackReady === "true") return;
      img.dataset.fallbackReady = "true";
      if (img.complete && img.naturalWidth === 0) {
        markMissing(img);
      }
      img.addEventListener("error", () => markMissing(img));
    });
  };

  const runPeopleDataScripts = () => {
    document.querySelectorAll("script[data-people-script]").forEach((script) => {
      if (script.dataset.executed === "true") return;
      const clone = document.createElement("script");
      Array.from(script.attributes).forEach((attr) => clone.setAttribute(attr.name, attr.value));
      clone.dataset.executed = "true";
      clone.textContent = script.textContent;
      script.replaceWith(clone);
    });
  };

  const slugifyId = (value) => {
    return (value || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const buildPersonCard = (person, index, usedIds) => {
    const name = person && person.name ? person.name : `Person ${index + 1}`;
    const role = person && person.role ? person.role : "Exec";
    const tagline = person && person.tagline ? person.tagline : "Add a two-sentence tagline here.";
    const photo = person && person.photo ? person.photo : "assets/people/placeholder.png";
    const details = Array.isArray(person && person.details) ? person.details : [];

    const card = document.createElement("article");
    card.className = "person-card";
    card.tabIndex = 0;
    card.setAttribute("aria-expanded", "false");

    let baseId = slugifyId(person && person.id ? person.id : name) || `person-${index + 1}`;
    let uniqueId = baseId;
    let counter = 2;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter += 1;
    }
    usedIds.add(uniqueId);
    card.id = uniqueId;

    const imgFrame = document.createElement("div");
    imgFrame.className = "img-frame";
    imgFrame.dataset.label = name;

    const img = document.createElement("img");
    img.src = photo;
    img.alt = name;
    img.setAttribute("data-fallback", "");
    img.setAttribute("data-fallback-label", name);
    imgFrame.appendChild(img);

    const header = document.createElement("div");
    header.className = "person-header";

    const title = document.createElement("h3");
    title.textContent = name;

    const roleEl = document.createElement("div");
    roleEl.className = "person-role";
    roleEl.textContent = role;

    const meta = document.createElement("p");
    meta.className = "person-meta";
    meta.textContent = tagline;

    header.appendChild(title);
    header.appendChild(roleEl);
    header.appendChild(meta);

    const detailWrap = document.createElement("div");
    detailWrap.className = "person-details";

    details.slice(0, 3).forEach((detail) => {
      const item = document.createElement("div");
      item.className = "person-detail";

      const label = document.createElement("span");
      label.textContent = detail.label || "Focus";

      const text = document.createElement("p");
      text.textContent = detail.text || "";

      item.appendChild(label);
      item.appendChild(text);
      detailWrap.appendChild(item);
    });

    card.appendChild(imgFrame);
    card.appendChild(header);
    card.appendChild(detailWrap);

    return card;
  };

  const renderPeopleGrid = () => {
    runPeopleDataScripts();
    const grid = document.querySelector("[data-people-grid]") || document.querySelector(".people-grid");
    if (!grid) return null;
    if (grid.dataset.peopleReady === "true") return grid;

    const peopleData = Array.isArray(window.CBC_PEOPLE) ? window.CBC_PEOPLE : [];
    if (!peopleData.length) return grid;

    grid.innerHTML = "";
    const usedIds = new Set();
    peopleData.forEach((person, index) => {
      grid.appendChild(buildPersonCard(person, index, usedIds));
    });
    grid.dataset.peopleReady = "true";

    return grid;
  };

  const setupPeopleExpansion = () => {
    const grid = renderPeopleGrid();
    if (!grid) {
      peopleController = null;
      return;
    }
    applyImageFallbacks();

    if (grid.dataset.expandReady && peopleController) {
      peopleController.syncFromHash({ animate: false });
      return;
    }
    grid.dataset.expandReady = "true";

    const cards = Array.from(grid.querySelectorAll(".person-card"));
    const cardById = new Map(cards.map((card) => [card.id, card]));
    let expandedCard = null;
    let isAnimating = false;
    let lockedHeight = null;
    let overlayReady = false;
    let overlayRect = null;
    const layoutState = new Map();
    const pushVectors = new Map();
    const easeValue = getComputedStyle(root).getPropertyValue("--ease").trim() || "cubic-bezier(0.25, 0.1, 0.2, 1)";
    const motionTimings = {
      expandY: 720,
      expandX: 620,
      collapseX: 520,
      collapseY: 620,
    };

    const px = (value) => `${Math.round(value)}px`;

    const lockHeight = () => {
      if (lockedHeight) return;
      const rect = grid.getBoundingClientRect();
      lockedHeight = rect.height;
      if (lockedHeight > 0) {
        grid.style.minHeight = `${lockedHeight}px`;
        grid.style.height = `${lockedHeight}px`;
      }
    };

    const unlockHeight = () => {
      grid.style.minHeight = "";
      grid.style.height = "";
      lockedHeight = null;
    };

    const rememberInlineStyles = () => {
      cards.forEach((card) => {
        if (card.dataset.inlineStyle !== undefined) return;
        card.dataset.inlineStyle = card.getAttribute("style") || "";
      });
    };

    const restoreInlineStyles = () => {
      cards.forEach((card) => {
        if (card.dataset.inlineStyle === undefined) return;
        const saved = card.dataset.inlineStyle;
        if (saved) {
          card.setAttribute("style", saved);
        } else {
          card.removeAttribute("style");
        }
        delete card.dataset.inlineStyle;
      });
    };

    const captureLayout = () => {
      const rect = grid.getBoundingClientRect();
      layoutState.clear();
      rememberInlineStyles();
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        layoutState.set(card, {
          top: cardRect.top - rect.top,
          left: cardRect.left - rect.left,
          width: cardRect.width,
          height: cardRect.height,
        });
      });
      overlayRect = rect;
      return rect;
    };

    const applyOverlay = () => {
      if (overlayReady) return;
      overlayReady = true;
      cards.forEach((card) => {
        const origin = layoutState.get(card);
        if (!origin) return;
        card.style.position = "absolute";
        card.style.top = px(origin.top);
        card.style.left = px(origin.left);
        card.style.width = px(origin.width);
        card.style.height = px(origin.height);
        card.style.margin = "0";
        card.style.transform = "translate(0px, 0px)";
        card.style.visibility = "visible";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      });
    };

    const resetOverlay = () => {
      overlayReady = false;
      overlayRect = null;
      layoutState.clear();
      pushVectors.clear();
      restoreInlineStyles();
    };

    const setCardVisibility = (card, visible) => {
      card.style.visibility = visible ? "visible" : "hidden";
      card.style.pointerEvents = visible ? "auto" : "none";
      card.style.opacity = visible ? "1" : "0";
    };

    const computePushVectors = (originCard) => {
      pushVectors.clear();
      if (!overlayRect) return;
      const origin = layoutState.get(originCard);
      if (!origin) return;
      const originCenter = { x: origin.left + origin.width / 2, y: origin.top + origin.height / 2 };
      const travelBase = Math.max(overlayRect.width, overlayRect.height);

      cards.forEach((card) => {
        if (card === originCard) return;
        const rect = layoutState.get(card);
        if (!rect) return;
        let dx = rect.left + rect.width / 2 - originCenter.x;
        let dy = rect.top + rect.height / 2 - originCenter.y;
        const distance = Math.hypot(dx, dy) || 1;
        dx /= distance;
        dy /= distance;
        const travel = travelBase + Math.max(rect.width, rect.height);
        pushVectors.set(card, { x: dx * travel, y: dy * travel });
      });
    };

    const getInsetValue = () => {
      const raw = getComputedStyle(grid).getPropertyValue("--people-inset").trim();
      const value = Number.parseFloat(raw);
      return Number.isFinite(value) ? value : 0;
    };

    const getExpandedBounds = (origin) => {
      if (!overlayRect) {
        return {
          top: 0,
          left: 0,
          width: origin.width,
          height: origin.height,
        };
      }
      const inset = getInsetValue();
      const targetWidth = Math.max(origin.width, overlayRect.width - inset * 2);
      const targetHeight = Math.max(origin.height, overlayRect.height - inset * 2);
      const width = Math.min(targetWidth, overlayRect.width);
      const height = Math.min(targetHeight, overlayRect.height);
      const left = (overlayRect.width - width) / 2;
      const top = (overlayRect.height - height) / 2;
      return { top, left, width, height };
    };

    const animateProperties = (card, fromProps, toProps, duration) => {
      if (reduceMotion || !duration) {
        Object.assign(card.style, toProps);
        return Promise.resolve();
      }
      const animation = card.animate([fromProps, toProps], { duration, easing: easeValue, fill: "forwards" });
      return animation.finished.finally(() => {
        Object.assign(card.style, toProps);
      });
    };

    const animateTransform = (card, fromValue, toValue, duration) => {
      if (reduceMotion || !duration) {
        card.style.transform = toValue;
        return Promise.resolve();
      }
      const animation = card.animate([{ transform: fromValue }, { transform: toValue }], {
        duration,
        easing: easeValue,
        fill: "forwards",
      });
      return animation.finished.finally(() => {
        card.style.transform = toValue;
      });
    };

    const animatePushPhase = async (phase, duration, originCard) => {
      const animations = [];
      cards.forEach((card) => {
        if (card === originCard) return;
        const vector = pushVectors.get(card);
        if (!vector) return;
        const fromValue = phase === "y" ? "translate(0px, 0px)" : `translate(0px, ${px(vector.y)})`;
        const toValue =
          phase === "y" ? `translate(0px, ${px(vector.y)})` : `translate(${px(vector.x)}, ${px(vector.y)})`;
        animations.push(animateTransform(card, fromValue, toValue, duration));
      });
      await Promise.allSettled(animations);
    };

    const animatePullPhase = async (phase, duration, originCard) => {
      const animations = [];
      cards.forEach((card) => {
        if (card === originCard) return;
        const vector = pushVectors.get(card);
        if (!vector) return;
        const fromValue =
          phase === "x" ? `translate(${px(vector.x)}, ${px(vector.y)})` : `translate(0px, ${px(vector.y)})`;
        const toValue = phase === "x" ? `translate(0px, ${px(vector.y)})` : "translate(0px, 0px)";
        animations.push(animateTransform(card, fromValue, toValue, duration));
      });
      await Promise.allSettled(animations);
    };

    const expandCard = async (card, options = {}) => {
      if (!card || isAnimating) return;
      const { animate = true, pushHistory = true } = options;

      if (expandedCard && expandedCard !== card) {
        await switchCard(expandedCard, card, { animate, pushHistory });
        return;
      }

      captureLayout();
      lockHeight();
      applyOverlay();
      computePushVectors(card);

      expandedCard = card;
      grid.classList.add("is-expanded");
      card.setAttribute("aria-expanded", "true");
      card.classList.remove("is-collapsing-x", "is-collapsing-y");

      cards.forEach((item) => setCardVisibility(item, true));
      const origin = layoutState.get(card);
      if (!origin) return;
      const target = getExpandedBounds(origin);

      isAnimating = true;
      grid.classList.add("is-animating");

      if (animate) {
        card.classList.add("is-expanding-y");
        await Promise.all([
          animateProperties(
            card,
            {
              top: px(origin.top),
              left: px(origin.left),
              width: px(origin.width),
              height: px(origin.height),
            },
            { top: px(target.top), left: px(origin.left), width: px(origin.width), height: px(target.height) },
            motionTimings.expandY
          ),
          animatePushPhase("y", motionTimings.expandY, card),
        ]);

        card.classList.remove("is-expanding-y");
        card.classList.add("is-expanding-x");
        await Promise.all([
          animateProperties(
            card,
            { top: px(target.top), left: px(origin.left), width: px(origin.width), height: px(target.height) },
            { top: px(target.top), left: px(target.left), width: px(target.width), height: px(target.height) },
            motionTimings.expandX
          ),
          animatePushPhase("x", motionTimings.expandX, card),
        ]);
      } else {
        card.style.top = px(target.top);
        card.style.left = px(target.left);
        card.style.width = px(target.width);
        card.style.height = px(target.height);
        cards.forEach((item) => {
          if (item === card) return;
          const vector = pushVectors.get(item);
          if (!vector) return;
          item.style.transform = `translate(${px(vector.x)}, ${px(vector.y)})`;
        });
      }

      card.classList.remove("is-expanding-x");
      card.classList.add("is-expanded");

      cards.forEach((item) => {
        if (item === card) {
          item.setAttribute("aria-hidden", "false");
          item.tabIndex = 0;
          setCardVisibility(item, true);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.tabIndex = -1;
          setCardVisibility(item, false);
        }
      });

      grid.classList.remove("is-animating");
      isAnimating = false;

      if (pushHistory && card.id) {
        window.history.pushState({ personId: card.id }, "", `${window.location.pathname}#${card.id}`);
      }
    };

    const switchCard = async (fromCard, toCard, options = {}) => {
      if (!fromCard || !toCard || fromCard === toCard || isAnimating) return;
      const { animate = true, pushHistory = true } = options;
      if (!overlayRect) {
        await expandCard(toCard, options);
        return;
      }

      const fromOrigin = layoutState.get(fromCard);
      const toOrigin = layoutState.get(toCard);
      if (!fromOrigin || !toOrigin) return;
      const target = getExpandedBounds(toOrigin);

      isAnimating = true;
      grid.classList.add("is-animating");

      cards.forEach((item) => setCardVisibility(item, false));
      setCardVisibility(fromCard, true);
      setCardVisibility(toCard, true);
      toCard.style.transform = "translate(0px, 0px)";
      fromCard.style.transform = "translate(0px, 0px)";

      fromCard.setAttribute("aria-expanded", "false");
      toCard.setAttribute("aria-expanded", "true");

      if (animate) {
        fromCard.classList.remove("is-expanded");
        fromCard.classList.add("is-collapsing-x");
        toCard.classList.add("is-expanding-y");

        await Promise.all([
          animateProperties(
            fromCard,
            { top: px(target.top), left: px(target.left), width: px(target.width), height: px(target.height) },
            { top: px(target.top), left: px(fromOrigin.left), width: px(fromOrigin.width), height: px(target.height) },
            motionTimings.collapseX
          ),
          animateProperties(
            toCard,
            { top: px(toOrigin.top), left: px(toOrigin.left), width: px(toOrigin.width), height: px(toOrigin.height) },
            { top: px(target.top), left: px(toOrigin.left), width: px(toOrigin.width), height: px(target.height) },
            motionTimings.expandY
          ),
        ]);

        fromCard.classList.remove("is-collapsing-x");
        fromCard.classList.add("is-collapsing-y");
        toCard.classList.remove("is-expanding-y");
        toCard.classList.add("is-expanding-x");

        await Promise.all([
          animateProperties(
            fromCard,
            { top: px(target.top), left: px(fromOrigin.left), width: px(fromOrigin.width), height: px(target.height) },
            {
              top: px(fromOrigin.top),
              left: px(fromOrigin.left),
              width: px(fromOrigin.width),
              height: px(fromOrigin.height),
            },
            motionTimings.collapseY
          ),
          animateProperties(
            toCard,
            { top: px(target.top), left: px(toOrigin.left), width: px(toOrigin.width), height: px(target.height) },
            { top: px(target.top), left: px(target.left), width: px(target.width), height: px(target.height) },
            motionTimings.expandX
          ),
        ]);
      } else {
        fromCard.style.top = px(fromOrigin.top);
        fromCard.style.left = px(fromOrigin.left);
        fromCard.style.width = px(fromOrigin.width);
        fromCard.style.height = px(fromOrigin.height);
        toCard.style.top = px(target.top);
        toCard.style.left = px(target.left);
        toCard.style.width = px(target.width);
        toCard.style.height = px(target.height);
      }

      fromCard.classList.remove("is-collapsing-y");
      fromCard.classList.remove("is-expanded");
      toCard.classList.remove("is-expanding-x");
      toCard.classList.add("is-expanded");
      expandedCard = toCard;

      computePushVectors(toCard);
      cards.forEach((item) => {
        if (item === toCard) return;
        const vector = pushVectors.get(item);
        if (!vector) return;
        item.style.transform = `translate(${px(vector.x)}, ${px(vector.y)})`;
      });

      cards.forEach((item) => {
        if (item === toCard) {
          item.setAttribute("aria-hidden", "false");
          item.tabIndex = 0;
          setCardVisibility(item, true);
        } else {
          item.setAttribute("aria-hidden", "true");
          item.tabIndex = -1;
          setCardVisibility(item, false);
        }
      });

      grid.classList.remove("is-animating");
      isAnimating = false;

      if (pushHistory && toCard.id) {
        window.history.pushState({ personId: toCard.id }, "", `${window.location.pathname}#${toCard.id}`);
      }
    };

    const collapseExpanded = async (options = {}) => {
      if (!expandedCard || isAnimating) return;
      const { animate = true } = options;
      const card = expandedCard;
      const origin = layoutState.get(card);
      if (!origin || !overlayRect) {
        isAnimating = false;
        grid.classList.remove("is-animating");
        return;
      }
      const target = getExpandedBounds(origin);
      computePushVectors(card);

      isAnimating = true;
      grid.classList.add("is-animating");
      card.setAttribute("aria-expanded", "false");

      cards.forEach((item) => {
        if (item === card) return;
        const vector = pushVectors.get(item);
        if (vector) {
          item.style.transform = `translate(${px(vector.x)}, ${px(vector.y)})`;
        }
        setCardVisibility(item, true);
        item.setAttribute("aria-hidden", "false");
        item.tabIndex = 0;
      });

      if (animate) {
        card.classList.remove("is-expanded");
        card.classList.add("is-collapsing-x");

        await Promise.all([
          animateProperties(
            card,
            { top: px(target.top), left: px(target.left), width: px(target.width), height: px(target.height) },
            { top: px(target.top), left: px(origin.left), width: px(origin.width), height: px(target.height) },
            motionTimings.collapseX
          ),
          animatePullPhase("x", motionTimings.collapseX, card),
        ]);

        card.classList.remove("is-collapsing-x");
        card.classList.add("is-collapsing-y");

        await Promise.all([
          animateProperties(
            card,
            { top: px(target.top), left: px(origin.left), width: px(origin.width), height: px(target.height) },
            { top: px(origin.top), left: px(origin.left), width: px(origin.width), height: px(origin.height) },
            motionTimings.collapseY
          ),
          animatePullPhase("y", motionTimings.collapseY, card),
        ]);
      } else {
        card.style.top = px(origin.top);
        card.style.left = px(origin.left);
        card.style.width = px(origin.width);
        card.style.height = px(origin.height);
        cards.forEach((item) => {
          if (item === card) return;
          item.style.transform = "translate(0px, 0px)";
        });
      }

      card.classList.remove("is-expanded");
      card.classList.remove("is-collapsing-y");
      grid.classList.remove("is-expanded");
      grid.classList.remove("is-animating");
      expandedCard = null;
      cards.forEach((item) => {
        item.setAttribute("aria-hidden", "false");
        item.tabIndex = 0;
        setCardVisibility(item, true);
      });
      unlockHeight();
      resetOverlay();
      isAnimating = false;
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
      if (isAnimating) return;
      if (card.classList.contains("is-expanded") || card.classList.contains("is-expanding-y") || card.classList.contains("is-expanding-x")) {
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
