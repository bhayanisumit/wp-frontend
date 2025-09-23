export default function Navbar() {
  const root = div();

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  function render() {
    const token = localStorage.getItem("token");

    root.appendChild(
      nav(
        { class: "navbar navbar-expand-lg py-3 custom-navbar" },
        div(
          { class: "container-fluid" },
          button(
            {
              class: "navbar-toggler",
              type: "button",
              "data-bs-toggle": "collapse",
              "data-bs-target": "#navbarNav",
              "aria-controls": "navbarNav",
              "aria-expanded": "false",
              "aria-label": "Toggle navigation",
            },
            span({ class: "navbar-toggler-icon" })
          ),
          div(
            {
              class: "collapse navbar-collapse justify-content-center",
              id: "navbarNav",
            },
            ul(
              { class: "navbar-nav" },
              li(
                { class: "nav-item" },
                a(
                  {
                    href: "/",
                    class:
                      "nav-link" +
                      (window.location.pathname === "/" ? " active" : ""),
                  },
                  "About Us"
                )
              ),
              li(
                { class: "nav-item" },
                a(
                  {
                    href: "/articles",
                    class:
                      "nav-link" +
                      (window.location.pathname.startsWith("/articles")
                        ? " active"
                        : ""),
                  },
                  "Articles"
                )
              ),
              token
                ? [
                    li(
                      { class: "nav-item" },
                      a(
                        {
                          href: "/admin",
                          class:
                            "nav-link" +
                            (window.location.pathname.startsWith("/admin")
                              ? " active"
                              : ""),
                        },
                        "Admin"
                      )
                    ),
                    li(
                      { class: "nav-item" },
                      button(
                        { class: "logout-btn", onclick: handleLogout },
                        "Logout"
                      )
                    ),
                  ]
                : li(
                    { class: "nav-item" },
                    a(
                      {
                        href: "/login",
                        class:
                          "nav-link" +
                          (window.location.pathname === "/login"
                            ? " active"
                            : ""),
                      },
                      "Admin Login"
                    )
                  )
            )
          )
        )
      )
    );
  }
  render();
  return root;
}
