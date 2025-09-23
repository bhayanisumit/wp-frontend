import axios from "axios";

export default function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  let state = {
    email: "",
    password: "",
  };
  let root = div();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email: state.email,
        password: state.password,
      });
      if (!!res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/admin";
      }
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  function render() {
    root.innerHTML = "";

    root.appendChild(
      section(
        { class: "admin-login-section" },
        div(
          { class: "container" },
          div(
            { class: "row" },
            div(
              { class: "col-lg-4 offset-lg-4 col-12" },
              form(
                { class: "p-4 login-form", onsubmit: handleLogin },
                h3({ class: "text-center mb-4 fw-bold" }, "Admin Login"),
                div(
                  { class: "form-group mb-3" },
                  label(
                    { for: "email", class: "fw-semibold pb-2" },
                    "Email address"
                  ),
                  input({
                    type: "email",
                    id: "email",
                    class: "form-control",
                    placeholder: "Enter email",
                    value: state.email,
                    oninput: (e) => {
                      state.email = e.target.value;
                    },
                  })
                ),
                div(
                  { class: "form-group mb-3" },
                  label(
                    { for: "password", class: "fw-semibold pb-2" },
                    "Password"
                  ),
                  input({
                    type: "password",
                    id: "password",
                    class: "form-control",
                    placeholder: "Password",
                    value: state.password,
                    oninput: (e) => {
                      state.password = e.target.value;
                    },
                  })
                ),
                button(
                  { type: "submit", class: "d-block mx-auto login-btn" },
                  "Login"
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
