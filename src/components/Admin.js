import Navbar from "./Navbar";
import axios from "axios";

export default function Admin() {
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  let state = {
    articles: [],
    title: "",
    content: "",
    image: null,
    preview: null,
  };

  let root = div();

  async function fetchArticles() {
    try {
      const res = await axios.get(`${API_BASE}/api/articles`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      state.articles = res.data;
      render();
    } catch (err) {
      console.error(
        "Error fetching articles:",
        err.response?.data?.message || err
      );
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!token)
      return alert("You are not logged in. Please login to submit an article.");

    if (!state.title || !state.content) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("content", state.content);
    if (state.image) formData.append("image", state.image);

    try {
      await axios.post(`${API_BASE}/api/articles`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      state.title = "";
      state.content = "";
      state.image = null;
      state.preview = null;
      fetchArticles();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding article");
    }
  }

  async function handleDelete(id) {
    if (!token)
      return alert("You are not logged in. Please login to delete an article.");
    try {
      await axios.delete(`${API_BASE}/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticles();
      alert("Article deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting article");
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    state.image = file;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        state.preview = reader.result;
        render();
      };
      reader.readAsDataURL(file);
    } else {
      state.preview = null;
      render();
    }
  }

  function render() {
    root.innerHTML = "";

    root.appendChild(
      div(
        Navbar(),
        section(
          { class: "admin-dashboard-section" },
          div(
            { class: "container" },
            div(
              { class: "row" },
              div(
                { class: "col-12" },
                h1({ class: "text-center pb-5" }, "Admin Dashboard")
              ),
              div(
                { class: "col-lg-6 offset-lg-3 col-12" },
                form(
                  { class: "p-4 add-article", onsubmit: handleAdd },
                  h3({ class: "text-center mb-4 fw-bold" }, "Add Article"),
                  div(
                    { class: "form-group mb-3" },
                    label({ for: "title", class: "fw-semibold pb-2" }, "Title"),
                    input({
                      type: "text",
                      id: "title",
                      class: "form-control",
                      placeholder: "Enter Title",
                      value: state.title,
                      oninput: (e) => {
                        state.title = e.target.value;
                      },
                    })
                  ),
                  div(
                    { class: "form-group mb-3" },
                    label(
                      { for: "content", class: "fw-semibold pb-2" },
                      "Content"
                    ),
                    textarea({
                      id: "content",
                      class: "form-control",
                      placeholder: "Enter Content",
                      value: state.content,
                      oninput: (e) => {
                        state.content = e.target.value;
                      },
                    })
                  ),
                  div(
                    { class: "form-group mb-3 article_img_input" },
                    div(
                      { class: "article_img" },
                      label(
                        { for: "image", class: "fw-semibold pb-2" },
                        "Image"
                      ),
                      input({
                        type: "file",
                        id: "image",
                        class: "form-control",
                        onchange: handleImageChange,
                      })
                    ),
                    state.preview &&
                      div(
                        { class: "mb-3" },
                        img({
                          src: state.preview,
                          style:
                            "width:100px; height:100px; object-fit:cover; border-radius:5px;",
                        })
                      )
                  ),

                  button(
                    { type: "submit", class: "d-block mx-auto submit-btn" },
                    "Submit"
                  )
                )
              )
            ),
            div(
              { class: "row py-3" },
              h2({ class: "py-5 text-center" }, "Existing Articles"),
              ...state.articles.map((article) =>
                div(
                  { class: "col-lg-3 col-md-6 col-12" },
                  div(
                    { class: "card article_card" },
                    article.image &&
                      img({
                        src: `${API_BASE}/uploads/${article.image}`,
                        alt: article.title,
                        class: "card-img-top",
                      }),
                    div(
                      { class: "card-body" },
                      p({ class: "article_title" }, article.title),
                      div(
                        { class: "article-actions d-flex gap-2" },
                        i({
                          class: "bi bi-trash3 delete-btn",
                          style: "cursor:pointer",
                          onclick: () => handleDelete(article._id),
                        }),
                        a(
                          { href: `/admin/edit/${article._id}` },
                          i({
                            class: "bi bi-pencil-square edit-btn",
                            style: "cursor:pointer",
                          })
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
  document.body.appendChild(root);
  fetchArticles();
  return root;
}
