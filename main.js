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
  const clubLinkDefaults = {
    discord: "",
    instagram: "",
    linkedin: "",
    signup: "",
    github: "",
    email: "",
  };

  const getClubLinks = () => {
    const custom = window.CBC_LINKS && typeof window.CBC_LINKS === "object" ? window.CBC_LINKS : {};
    return { ...clubLinkDefaults, ...custom };
  };

  const normalizeExternalHref = (value) => {
    const trimmed = (value || "").toString().trim();
    if (!trimmed) return "";
    if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed;
    return `https://${trimmed.replace(/^\/+/, "")}`;
  };

  const normalizeEmailHref = (value) => {
    const trimmed = (value || "").toString().trim();
    if (!trimmed) return "";
    if (/^mailto:/i.test(trimmed)) return trimmed;
    return `mailto:${trimmed}`;
  };

  const clubLinkIcons = {
    discord:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M13.545 2.907a13.227 13.227 0 0 0-3.257-.8.05.05 0 0 0-.053.025c-.141.25-.297.577-.406.837a12.19 12.19 0 0 0-3.658 0 8.404 8.404 0 0 0-.412-.837.052.052 0 0 0-.053-.025 13.236 13.236 0 0 0-3.257.8.041.041 0 0 0-.019.015C.533 5.729-.32 8.463.099 11.162a.04.04 0 0 0 .015.027 13.307 13.307 0 0 0 4.001 2.03.052.052 0 0 0 .056-.019c.308-.42.582-.864.818-1.329a.051.051 0 0 0-.025-.069 8.668 8.668 0 0 1-1.248-.595.05.05 0 0 1-.005-.084c.084-.062.168-.126.248-.191a.05.05 0 0 1 .052-.007c2.619 1.196 5.455 1.196 8.041 0a.05.05 0 0 1 .053.006c.08.066.164.13.248.191a.05.05 0 0 1-.004.084 8.066 8.066 0 0 1-1.249.594.051.051 0 0 0-.025.069c.241.465.515.91.817 1.33a.052.052 0 0 0 .056.019 13.293 13.293 0 0 0 4.002-2.03.05.05 0 0 0 .015-.026c.5-3.129-.838-5.839-2.354-8.23a.041.041 0 0 0-.019-.016zM5.331 9.845c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.339 0c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z'/></svg>",
    instagram:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.95 3.95 0 0 0-1.417.923A3.957 3.957 0 0 0 .42 2.76c-.198.509-.332 1.09-.372 1.944C.01 5.556 0 5.827 0 8c0 2.172.01 2.444.048 3.297.04.854.174 1.435.372 1.943.205.527.478.974.923 1.417.444.445.89.719 1.417.923.509.199 1.09.333 1.943.372C5.556 15.99 5.828 16 8 16c2.172 0 2.444-.01 3.297-.048.854-.04 1.435-.174 1.943-.372a3.956 3.956 0 0 0 1.417-.923 3.958 3.958 0 0 0 .923-1.417c.199-.508.333-1.09.372-1.943C15.99 10.444 16 10.172 16 8c0-2.173-.01-2.444-.048-3.297-.04-.854-.174-1.435-.372-1.943a3.955 3.955 0 0 0-.923-1.417A3.95 3.95 0 0 0 13.24.42c-.508-.198-1.09-.332-1.943-.372C10.444.01 10.172 0 8 0zm0 1.441c2.136 0 2.389.008 3.233.046.78.035 1.204.166 1.486.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.706.276 1.486.038.844.046 1.097.046 3.233s-.008 2.389-.046 3.233c-.036.78-.166 1.204-.276 1.486a2.5 2.5 0 0 1-.598.92 2.5 2.5 0 0 1-.92.598c-.282.11-.706.24-1.486.276-.844.038-1.097.046-3.233.046s-2.389-.008-3.233-.046c-.78-.036-1.204-.166-1.486-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.598-.92c-.11-.282-.24-.706-.276-1.486C1.449 10.389 1.441 10.136 1.441 8s.008-2.389.046-3.233c.036-.78.166-1.204.276-1.486.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.706-.24 1.486-.276.844-.038 1.097-.046 3.233-.046zm0 2.458a4.101 4.101 0 1 0 0 8.202 4.101 4.101 0 0 0 0-8.202zm0 6.761a2.66 2.66 0 1 1 0-5.32 2.66 2.66 0 0 1 0 5.32zm4.267-6.924a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92z'/></svg>",
    linkedin:
      "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M20.45 20.45h-3.55V14.9c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92v5.65H9.39V9h3.41v1.56h.05c.48-.9 1.63-1.84 3.36-1.84 3.59 0 4.25 2.36 4.25 5.43v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z'/></svg>",
    github:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M8 0C3.58 0 0 3.67 0 8.2c0 3.63 2.29 6.7 5.47 7.78.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.5-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.25 1.87.9 2.33.68.07-.53.28-.9.5-1.1-1.78-.21-3.64-.92-3.64-4.09 0-.91.32-1.65.84-2.23-.08-.21-.37-1.06.08-2.2 0 0 .69-.23 2.26.85.66-.19 1.36-.29 2.06-.29.7 0 1.4.1 2.06.29 1.57-1.08 2.26-.85 2.26-.85.45 1.14.16 1.99.08 2.2.52.58.84 1.32.84 2.23 0 3.18-1.87 3.88-3.65 4.09.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.47.55.39A8.24 8.24 0 0 0 16 8.2C16 3.67 12.42 0 8 0z'/></svg>",
    email:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.32.115L8 8.86l6.32-5.245A.5.5 0 0 0 14 3.5H2zm13.5 1.09-4.852 4.025 4.852 3.837V4.59zM14.803 13 10.24 9.39 8.32 10.98a.5.5 0 0 1-.64 0L5.76 9.39 1.197 13H14.803zM.5 12.452l4.852-3.837L.5 4.59v7.862z'/></svg>",
    signup:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path fill-rule='evenodd' d='M14 2.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L4.146 11.146a.5.5 0 1 0 .708.708L13 3.707V7.5a.5.5 0 0 0 1 0v-5z'/></svg>",
  };

  const shouldDecorateClubLink = (el) => {
    return !!(el.closest(".footer-socials") || el.closest(".contact-panel"));
  };

  const decorateClubLink = (el, key) => {
    if (el.dataset.iconReady === "true") return;
    const iconSvg = clubLinkIcons[key];
    if (!iconSvg) return;

    const rawLabel = (el.textContent || "").replace(/\s+/g, " ").trim();
    const icon = document.createElement("span");
    icon.className = "club-link-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = iconSvg;

    const label = document.createElement("span");
    label.className = "club-link-label";
    label.textContent = rawLabel;

    el.textContent = "";
    el.classList.add("club-link-with-icon");
    el.appendChild(icon);
    el.appendChild(label);
    el.dataset.iconReady = "true";
  };

  const applyClubLinks = (scope = document) => {
    const links = getClubLinks();
    scope.querySelectorAll("[data-club-link]").forEach((el) => {
      const key = (el.dataset.clubLink || "").toLowerCase();
      if (!key) return;
      const raw = links[key];
      const href = key === "email" ? normalizeEmailHref(raw) : normalizeExternalHref(raw);
      if (el.tagName.toLowerCase() === "a") {
        if (href) {
          el.setAttribute("href", href);
        }
        if (shouldDecorateClubLink(el)) {
          decorateClubLink(el, key);
        }
      }
    });
  };

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
      const safe = (label || "CBC Member").replace(/[^a-zA-Z0-9 ]/g, "");
      const svg =
        "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='600' viewBox='0 0 480 600'>" +
        "<rect width='100%' height='100%' fill='%23f3e7db'/>" +
        "<circle cx='240' cy='220' r='74' fill='%23d8c5b2'/>" +
        "<rect x='130' y='320' width='220' height='180' rx='110' fill='%23d8c5b2'/>" +
        "<text x='50%' y='548' font-family='Fraunces,serif' font-size='22' fill='%238a7f75' text-anchor='middle' letter-spacing='2'>" +
        safe +
        "</text></svg>";
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    };

    const markMissing = (img) => {
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      const label = img.dataset.fallbackLabel || img.alt || "CBC Member";
      img.src = fallbackLabel(label);
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

  const personSocialIcons = {
    email:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.32.115L8 8.86l6.32-5.245A.5.5 0 0 0 14 3.5H2zm13.5 1.09-4.852 4.025 4.852 3.837V4.59zM14.803 13 10.24 9.39 8.32 10.98a.5.5 0 0 1-.64 0L5.76 9.39 1.197 13H14.803zM.5 12.452l4.852-3.837L.5 4.59v7.862z'/></svg>",
    linkedin:
      "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M20.45 20.45h-3.55V14.9c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92v5.65H9.39V9h3.41v1.56h.05c.48-.9 1.63-1.84 3.36-1.84 3.59 0 4.25 2.36 4.25 5.43v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z'/></svg>",
    github:
      "<svg viewBox='0 0 16 16' aria-hidden='true'><path d='M8 0C3.58 0 0 3.67 0 8.2c0 3.63 2.29 6.7 5.47 7.78.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.5-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.25 1.87.9 2.33.68.07-.53.28-.9.5-1.1-1.78-.21-3.64-.92-3.64-4.09 0-.91.32-1.65.84-2.23-.08-.21-.37-1.06.08-2.2 0 0 .69-.23 2.26.85.66-.19 1.36-.29 2.06-.29.7 0 1.4.1 2.06.29 1.57-1.08 2.26-.85 2.26-.85.45 1.14.16 1.99.08 2.2.52.58.84 1.32.84 2.23 0 3.18-1.87 3.88-3.65 4.09.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.47.55.39A8.24 8.24 0 0 0 16 8.2C16 3.67 12.42 0 8 0z'/></svg>",
  };

  const normalizePersonSocialHref = (type, value) => {
    const raw = (value || "").toString().trim();
    if (!raw) return "";
    if (type === "email") return normalizeEmailHref(raw);
    if (/^https?:\/\//i.test(raw)) return raw;
    if (type === "linkedin") {
      if (/linkedin\.com\//i.test(raw)) return `https://${raw.replace(/^https?:\/\//i, "")}`;
      return `https://www.linkedin.com/in/${raw.replace(/^@/, "")}`;
    }
    if (type === "github") {
      if (/github\.com\//i.test(raw)) return `https://${raw.replace(/^https?:\/\//i, "")}`;
      return `https://github.com/${raw.replace(/^@/, "")}`;
    }
    return normalizeExternalHref(raw);
  };

  const buildPersonSocials = (person, name) => {
    const socialData = person && person.socials && typeof person.socials === "object" ? person.socials : {};
    const rawSocials = [
      { type: "email", value: (person && person.email) || socialData.email || "" },
      { type: "linkedin", value: (person && person.linkedin) || socialData.linkedin || "" },
      { type: "github", value: (person && person.github) || socialData.github || "" },
    ];

    const entries = rawSocials
      .map((item) => ({ ...item, href: normalizePersonSocialHref(item.type, item.value) }))
      .filter((item) => item.href);

    if (!entries.length) return null;

    const wrap = document.createElement("div");
    wrap.className = "person-socials";

    entries.forEach((entry) => {
      const link = document.createElement("a");
      link.className = "person-social-link";
      link.href = entry.href;
      if (entry.type !== "email") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.dataset.noTransition = "";
      link.setAttribute("aria-label", `${name} ${entry.type}`);
      link.innerHTML = personSocialIcons[entry.type];
      wrap.appendChild(link);
    });

    return wrap;
  };

  const buildPersonCard = (person, index, usedIds) => {
    const name = person && person.name ? person.name : `Person ${index + 1}`;
    const role = person && person.role ? person.role : "Exec";
    const tagline = person && person.tagline ? person.tagline : "Bio coming soon.";
    const photo = person && person.photo ? person.photo : "assets/people/placeholder.png";
    const details = Array.isArray(person && person.details) ? person.details : [];

    const card = document.createElement("article");
    card.className = "person-card";

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

    const socialWrap = buildPersonSocials(person, name);
    if (socialWrap) {
      header.appendChild(socialWrap);
    }

    card.appendChild(imgFrame);
    card.appendChild(header);

    if (details.length) {
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

      card.appendChild(detailWrap);
    }

    return card;
  };

  const getPeopleDataForGrid = (grid) => {
    const key = (grid.dataset.peopleGrid || "").toLowerCase();
    if (key === "associates") {
      return Array.isArray(window.CBC_PEOPLE_ASSOCIATES) ? window.CBC_PEOPLE_ASSOCIATES : [];
    }
    if (key === "leadership") {
      if (Array.isArray(window.CBC_PEOPLE_LEADERSHIP)) return window.CBC_PEOPLE_LEADERSHIP;
      return Array.isArray(window.CBC_PEOPLE) ? window.CBC_PEOPLE : [];
    }
    return Array.isArray(window.CBC_PEOPLE) ? window.CBC_PEOPLE : [];
  };

  const renderPeopleGrids = () => {
    runPeopleDataScripts();
    const explicitGrids = Array.from(document.querySelectorAll("[data-people-grid]"));
    const grids = explicitGrids.length ? explicitGrids : Array.from(document.querySelectorAll(".people-grid"));
    if (!grids.length) return [];

    const usedIds = new Set();

    grids.forEach((grid) => {
      if (grid.dataset.peopleReady === "true") return;

      const peopleData = getPeopleDataForGrid(grid);
      if (!peopleData.length) return;

      grid.innerHTML = "";
      peopleData.forEach((person, index) => {
        grid.appendChild(buildPersonCard(person, index, usedIds));
      });
      grid.dataset.peopleReady = "true";
    });

    return grids;
  };

  const setupPeopleExpansion = () => {
    const grids = renderPeopleGrids();
    if (!grids.length) {
      peopleController = null;
      return;
    }
    applyImageFallbacks();
    grids.forEach((grid) => {
      if (grid.dataset.peopleStatic === "true") return;
      grid.dataset.peopleStatic = "true";
      grid.classList.add("is-static");
    });
    peopleController = null;
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
      applyClubLinks();
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
    applyClubLinks();
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
