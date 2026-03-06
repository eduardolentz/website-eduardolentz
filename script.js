function flipCardToTech() {
  document.getElementById("card").classList.add("flipped");
}

function flipCardToProfile() {
  document.getElementById("card").classList.remove("flipped");
}

let currentTech = "";
let currentFilter = "";
let currentPage = 1;
let lastProjectsPerPage = getProjectsPerPage();
let currentLanguage = localStorage.getItem("siteLanguage") || "pt";

const translations = {
  pt: {
    profileRole: "Cloud Computing | Eng. de Software",
    location: "\uD83D\uDCCD Porto Alegre - RS, Brasil",
    badges: "Badges",
    resume: "Curr\u00EDculo PDF",
    projects: "Projetos",
    technology: "Tecnologia",
    back: "Voltar",
    projectsIn: "Projetos em",
    profile: "Perfil",
    all: "Todos",
    pageOf: (page, total) => `Pag ${page} de ${total}`,
    emptyProjects: "Nenhum projeto encontrado para este filtro.",
    interface: "Interface",
    repository: "Reposit\u00F3rio",
    article: "Artigo",
    docs: "Documenta\u00E7\u00E3o",
    techLabels: {
      Cloud: "Cloud",
      DevOps: "DevOps",
      Python: "Python",
      JavaScript: "JavaScript",
      Dados: "Dados",
      QA: "QA",
      CS: "C#",
      FrontEnd: "Front-end",
      WordPress: "WordPress",
      PHP: "PHP",
      Artigos: "Artigos",
      Outros: "Outros"
    }
  },
  en: {
    profileRole: "Cloud Computing | Software Engineer",
    location: "\uD83D\uDCCD Porto Alegre - RS, Brazil",
    badges: "Badges",
    resume: "Resume PDF",
    projects: "Projects",
    technology: "Technology",
    back: "Back",
    projectsIn: "Projects in",
    profile: "Profile",
    all: "All",
    pageOf: (page, total) => `Page ${page} of ${total}`,
    emptyProjects: "No projects found for this filter.",
    interface: "Live",
    repository: "Repository",
    article: "Article",
    docs: "Documentation",
    techLabels: {
      Cloud: "Cloud",
      DevOps: "DevOps",
      Python: "Python",
      JavaScript: "JavaScript",
      Dados: "Data",
      QA: "QA",
      CS: "C#",
      FrontEnd: "Front-end",
      WordPress: "WordPress",
      PHP: "PHP",
      Artigos: "Articles",
      Outros: "Others"
    }
  },
  es: {
    profileRole: "Computaci\u00F3n en la Nube | Ing. de Software",
    location: "\uD83D\uDCCD Porto Alegre - RS, Brasil",
    badges: "Insignias",
    resume: "Curr\u00EDculum PDF",
    projects: "Proyectos",
    technology: "Tecnolog\u00EDa",
    back: "Volver",
    projectsIn: "Proyectos en",
    profile: "Perfil",
    all: "Todos",
    pageOf: (page, total) => `P\u00E1g ${page} de ${total}`,
    emptyProjects: "No se encontraron proyectos para este filtro.",
    interface: "Interfaz",
    repository: "Repositorio",
    article: "Art\u00EDculo",
    docs: "Documentaci\u00F3n",
    techLabels: {
      Cloud: "Cloud",
      DevOps: "DevOps",
      Python: "Python",
      JavaScript: "JavaScript",
      Dados: "Datos",
      QA: "QA",
      CS: "C#",
      FrontEnd: "Front-end",
      WordPress: "WordPress",
      PHP: "PHP",
      Artigos: "Art\u00EDculos",
      Outros: "Otros"
    }
  }
};

const languageMeta = {
  pt: { flag: "\uD83C\uDDE7\uD83C\uDDF7", label: "Portugu\u00EAs (Brasil)" },
  en: { flag: "\uD83C\uDDFA\uD83C\uDDF8", label: "English (United States)" },
  es: { flag: "\uD83C\uDDEA\uD83C\uDDF8", label: "Espa\u00F1ol (Espa\u00F1a)" }
};
function t(key) {
  return translations[currentLanguage][key];
}

function getTechLabel(techKey) {
  return translations[currentLanguage].techLabels[techKey] || techKey;
}

function applyLanguage(lang) {
  if (!translations[lang]) return;
  currentLanguage = lang;
  localStorage.setItem("siteLanguage", lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";

  const toggle = document.getElementById("langToggle");
  const currentFlag = document.getElementById("langCurrentFlag");
  const meta = languageMeta[lang] || languageMeta.pt;

  if (toggle) {
    toggle.setAttribute("aria-label", meta.label);
  }
  if (currentFlag) {
    currentFlag.textContent = meta.flag;
  }

  document.querySelectorAll(".lang-option").forEach(option => {
    option.setAttribute("aria-selected", option.dataset.lang === lang ? "true" : "false");
  });

  document.getElementById("profileRole").innerText = t("profileRole");
  document.getElementById("local").innerText = t("location");
  document.getElementById("btnBadgesText").innerText = t("badges");
  document.getElementById("btnResumeText").innerText = t("resume");
  document.getElementById("btnProjectsText").innerText = t("projects");
  document.getElementById("techScreenTitle").innerText = t("technology");
  document.getElementById("btnBackTechText").innerText = t("back");
  document.getElementById("projectsInText").innerText = t("projectsIn");
  document.getElementById("btnBackProjectsText").innerText = t("back");
  document.getElementById("btnProfileText").innerText = t("profile");
  document.getElementById("badgesTitle").innerText = t("badges");
  document.getElementById("btnCredlyText").innerText = "Credly";
  document.getElementById("btnBackBadgesText").innerText = t("back");

  document.querySelectorAll("[data-tech-label]").forEach(el => {
    const key = el.getAttribute("data-tech-label");
    el.innerText = getTechLabel(key);
  });

  if (currentTech) {
    document.getElementById("techTitle").innerText = getTechLabel(currentTech);
    renderFilterBar(currentTech);
    renderProjects();
    renderPagination();
  }
}

function initializeLanguageSwitcher() {
  const switcher = document.querySelector(".lang-switcher");
  const toggle = document.getElementById("langToggle");
  const menu = document.getElementById("langMenu");

  if (!switcher || !toggle || !menu) return;

  const closeMenu = () => {
    switcher.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    switcher.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = switcher.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", () => {
      applyLanguage(option.dataset.lang);
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });
}

function getProjectsPerPage() {
  return window.innerWidth <= 640 ? 3 : 6;
}

function getFilteredProjects() {
  const projects = projectsData[currentTech] || [];
  if (!currentFilter) return projects;
  return projects.filter(proj => Array.isArray(proj.tags) && proj.tags.includes(currentFilter));
}

function showProjects(tech) {
  document.getElementById("badgesScreen").classList.remove("active");

  currentTech = tech;
  currentPage = 1;
  currentFilter = "";
  document.getElementById("techTitle").innerText = getTechLabel(tech);

  renderFilterBar(tech);
  renderProjects();
  renderPagination();

  document.getElementById("flipContainer").style.display = "none";
  document.getElementById("projectsScreen").classList.add("active");
}

function renderFilterBar(tech) {
  const filterBar = document.getElementById("filterBar");
  filterBar.innerHTML = "";
  const projects = projectsData[tech] || [];
  const tagsSet = new Set();

  projects.forEach(proj => {
    if (!Array.isArray(proj.tags)) return;
    proj.tags.forEach(tag => {
      const normalizedTag = typeof tag === "string" ? tag.trim() : "";
      if (normalizedTag) tagsSet.add(normalizedTag);
    });
  });

  const tags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b, "pt-BR"));
  if (tags.length > 0) {
    filterBar.classList.remove("hidden");

    const btnAll = document.createElement("button");
    btnAll.innerText = t("all");
    btnAll.className = "border border-gray-500 text-gray-500 px-2 py-1 rounded-full shadow-md transition hover:bg-gray-500 hover:text-white mr-2";
    btnAll.onclick = () => {
      currentFilter = "";
      currentPage = 1;
      renderProjects();
      renderPagination();
    };
    filterBar.appendChild(btnAll);

    tags.forEach(tag => {
      const btn = document.createElement("button");
      btn.innerText = tag;
      btn.className = "border border-gray-500 text-gray-500 px-2 py-1 rounded-full shadow-md transition hover:bg-gray-500 hover:text-white mr-2";
      btn.onclick = () => {
        currentFilter = tag;
        currentPage = 1;
        renderProjects();
        renderPagination();
      };
      filterBar.appendChild(btn);
    });
  } else {
    filterBar.classList.add("hidden");
  }
}

function createActionLink(url, className, label) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = className;
  link.textContent = label;
  return link;
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";
  const filteredProjects = getFilteredProjects();

  if (filteredProjects.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "text-sm text-gray-600 text-center w-full";
    emptyMessage.textContent = t("emptyProjects");
    container.appendChild(emptyMessage);
    return;
  }

  const startIndex = (currentPage - 1) * getProjectsPerPage();
  const pageProjects = filteredProjects.slice(startIndex, startIndex + getProjectsPerPage());

  pageProjects.forEach(proj => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "bg-gray-100 p-3 rounded-lg shadow";

    const titleEl = document.createElement("h3");
    titleEl.className = "font-semibold text-sm";
    titleEl.textContent = proj.title || "Projeto sem t\u00EDtulo";

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "text-xs text-gray-600 text-left";
    descriptionEl.textContent = proj.description || "";

    const actionsEl = document.createElement("div");
    actionsEl.className = "mt-2 flex gap-1";

    if (proj.site) {
      actionsEl.appendChild(createActionLink(proj.site, "border border-yellow-600 text-yellow-600 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-yellow-600 hover:text-white", t("interface")));
    }
    if (proj.repo) {
      actionsEl.appendChild(createActionLink(proj.repo, "border border-purple-900 text-purple-900 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-purple-900 hover:text-white", t("repository")));
    }
    if (proj.article) {
      actionsEl.appendChild(createActionLink(proj.article, "border border-orange-800 text-orange-800 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-orange-800 hover:text-white", t("article")));
    }
    if (proj.doc) {
      actionsEl.appendChild(createActionLink(proj.doc, "border border-blue-800 text-blue-800 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-blue-800 hover:text-white", t("docs")));
    }

    projectDiv.appendChild(titleEl);
    projectDiv.appendChild(descriptionEl);
    projectDiv.appendChild(actionsEl);

    projectDiv.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", e => e.stopPropagation());
    });

    container.appendChild(projectDiv);
  });
}

function renderPagination() {
  const filtered = getFilteredProjects();
  const totalPages = Math.ceil(filtered.length / getProjectsPerPage());
  const paginationControls = document.getElementById("paginationControls");
  const pageIndicator = document.getElementById("pageIndicator");

  if (totalPages > 1) {
    paginationControls.classList.remove("hidden");
    pageIndicator.innerText = t("pageOf")(currentPage, totalPages);
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
  } else {
    paginationControls.classList.add("hidden");
    pageIndicator.innerText = "";
  }
}

function nextPage() {
  const filtered = getFilteredProjects();
  const totalPages = Math.ceil(filtered.length / getProjectsPerPage());
  if (currentPage < totalPages) {
    currentPage++;
    renderProjects();
    renderPagination();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderProjects();
    renderPagination();
  }
}

window.addEventListener("resize", () => {
  const currentProjectsPerPage = getProjectsPerPage();
  if (currentProjectsPerPage === lastProjectsPerPage) return;
  lastProjectsPerPage = currentProjectsPerPage;

  const isProjectsScreenOpen = document.getElementById("projectsScreen").classList.contains("active");
  if (!isProjectsScreenOpen) return;

  const filtered = getFilteredProjects();
  const totalPages = Math.max(1, Math.ceil(filtered.length / getProjectsPerPage()));
  currentPage = Math.min(currentPage, totalPages);
  renderProjects();
  renderPagination();
});

function hideProjects() {
  document.getElementById("projectsScreen").classList.remove("active");
  document.getElementById("flipContainer").style.display = "block";
}

function goHome() {
  hideProjects();
  document.getElementById("card").classList.remove("flipped");
}

function showBadges() {
  document.getElementById("projectsScreen").classList.remove("active");
  document.getElementById("flipContainer").style.display = "none";
  document.getElementById("badgesScreen").classList.add("active");
}

function voltarDosBadges() {
  document.getElementById("badgesScreen").classList.remove("active");
  document.getElementById("flipContainer").style.display = "block";
}

initializeLanguageSwitcher();
applyLanguage(currentLanguage);








