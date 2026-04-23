async function loadSidebar() {
  const sidebarMount = document.getElementById("sidebar-mount");
  if (!sidebarMount) return;

  try {
    const response = await fetch("components/sidebar.html");
    const html = await response.text();
    sidebarMount.innerHTML = html;

    setupSidebar();
    highlightSidebarLink();
    loadSidebarProfile();
    loadSidebarNotificationCount();
  } catch (error) {
    console.error("Failed to load sidebar:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSidebar);