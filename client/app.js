/*********************************
 * LOGIN HANDLING (NO DESIGN TOUCH)
 *********************************/
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // simple login flag
    localStorage.setItem("loggedIn", "true");

    // redirect
    window.location.href = "dashboard.html";
  });
}

/*********************************
 * PAGE PROTECTION
 *********************************/
const protectedPages = [
  "dashboard.html",
  "inventory.html",
  "orders.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
}

/*********************************
 * SIDEBAR LOAD (NO STYLE CHANGE)
 *********************************/
const sidebar = document.getElementById("sidebar");

if (sidebar) {
  fetch("sidebar.html")
    .then(res => res.text())
    .then(html => {
      sidebar.innerHTML = html;
      highlightActiveLink();
    });
}

/*********************************
 * ACTIVE LINK (USING EXISTING CSS)
 *********************************/
function highlightActiveLink() {
  const links = document.querySelectorAll("aside a");

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      // ONLY ACTIVE STATE — no new colors added
      link.classList.add("active");
    }
  });
}

/*********************************
 * LOGOUT (OPTIONAL, SAFE)
 *********************************/
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
}
