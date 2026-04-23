function setupSidebar() {
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const mobileToggle = document.getElementById("mobile-toggle");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar?.classList.toggle("active");
      sidebarOverlay?.classList.toggle("active");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      sidebar?.classList.remove("active");
      sidebarOverlay?.classList.remove("active");
    });
  }

  function handleResize() {
    if (!sidebar || !sidebarOverlay) return;

    if (window.innerWidth >= 992) {
      sidebar.classList.add("active");
      sidebarOverlay.classList.remove("active");
    } else {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);
}

function highlightSidebarLink() {
  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const page = link.getAttribute("data-page");
    if (page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

async function loadSidebarProfile() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(`${window.API_BASE_URL}/users/profile/username`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const username = response.data.username || "User";
    const nameEl = document.getElementById("userName");
    const avatarEl = document.getElementById("userAvatar");

    if (nameEl) nameEl.textContent = username;

    if (avatarEl) {
      const initials = username
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      avatarEl.textContent = initials || "U";
    }
  } catch (error) {
    console.error("Failed to load sidebar profile:", error);
  }
}

async function loadSidebarNotificationCount() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(`${window.API_BASE_URL}/users/notifications/count/unread`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const unreadCount = response.data.unreadCount || 0;
    const badge = document.getElementById("notice-badge");

    if (!badge) return;

    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  } catch (error) {
    console.error("Failed to load sidebar unread count:", error);
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../auth/login.html";
  }
}
