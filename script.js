// Função para acionar o flip para a Tela 2 (Tecnologias)
function flipCardToTech() {
  document.getElementById("card").classList.add("flipped");
}

// Função para retornar à Tela 1 (Perfil)
function flipCardToProfile() {
  document.getElementById("card").classList.remove("flipped");
}

let currentTech = "";
let currentFilter = "";
let currentPage = 1;
let lastProjectsPerPage = getProjectsPerPage();

function getProjectsPerPage() {
  // 3 projetos por página em telas pequenas (<= 640px), 6 em telas maiores
  return window.innerWidth <= 640 ? 3 : 6;
}

function getFilteredProjects() {
  const projects = projectsData[currentTech] || [];
  if (!currentFilter) return projects;
  return projects.filter(proj => Array.isArray(proj.tags) && proj.tags.includes(currentFilter));
}

function showProjects(tech) {
  // Se a tela de Badges estiver ativa, desativa-a
  document.getElementById("badgesScreen").classList.remove("active");

  currentTech = tech;
  currentPage = 1;
  currentFilter = "";
  document.getElementById("techTitle").innerText = tech;

  renderFilterBar(tech);
  renderProjects();
  renderPagination();

  // Esconde o flipContainer
  document.getElementById("flipContainer").style.display = "none";

  // Exibe a tela de Projetos
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

    // Botão "All"
    const btnAll = document.createElement("button");
    btnAll.innerText = "All";
    btnAll.className = "border border-gray-500 text-gray-500 px-2 py-1 rounded-full shadow-md transition hover:bg-gray-500 hover:text-white mr-2";
    btnAll.onclick = () => {
      currentFilter = "";
      currentPage = 1;
      renderProjects();
      renderPagination();
    };
    filterBar.appendChild(btnAll);

    // Botões de cada tag
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
    emptyMessage.textContent = "Nenhum projeto encontrado para este filtro.";
    container.appendChild(emptyMessage);
    return;
  }

  // Paginação
  const startIndex = (currentPage - 1) * getProjectsPerPage();
  const pageProjects = filteredProjects.slice(startIndex, startIndex + getProjectsPerPage());

  // Monta cada card de projeto sem innerHTML para reduzir risco de injeção
  pageProjects.forEach(proj => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "bg-gray-100 p-3 rounded-lg shadow";

    const titleEl = document.createElement("h3");
    titleEl.className = "font-semibold text-sm";
    titleEl.textContent = proj.title || "Projeto sem título";

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "text-xs text-gray-600 text-left";
    descriptionEl.textContent = proj.description || "";

    const actionsEl = document.createElement("div");
    actionsEl.className = "mt-2 flex gap-1";

    if (proj.site) {
      actionsEl.appendChild(
        createActionLink(
          proj.site,
          "border border-yellow-600 text-yellow-600 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-yellow-600 hover:text-white",
          "Interface"
        )
      );
    }
    if (proj.repo) {
      actionsEl.appendChild(
        createActionLink(
          proj.repo,
          "border border-purple-900 text-purple-900 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-purple-900 hover:text-white",
          "Repositório"
        )
      );
    }
    if (proj.article) {
      actionsEl.appendChild(
        createActionLink(
          proj.article,
          "border border-orange-800 text-orange-800 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-orange-800 hover:text-white",
          "Artigo"
        )
      );
    }
    if (proj.doc) {
      actionsEl.appendChild(
        createActionLink(
          proj.doc,
          "border border-blue-800 text-blue-800 px-2 py-1 rounded-full text-xs shadow-md transition hover:bg-blue-800 hover:text-white",
          "Documentação"
        )
      );
    }

    projectDiv.appendChild(titleEl);
    projectDiv.appendChild(descriptionEl);
    projectDiv.appendChild(actionsEl);

    // Evita que o clique em um link feche o card ou interfira em algo
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
    pageIndicator.innerText = `Pag ${currentPage} de ${totalPages}`;
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
