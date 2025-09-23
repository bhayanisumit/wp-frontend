import Navbar from "./Navbar";
import axios from "axios";

export default function EditArticle(params) {
    const token = localStorage.getItem("token");
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const articleId = params.id;
    let state = {
        title: "",
        content: "",
        image: null,
        preview: null
    };

    let root = div();

    async function fetchArticle() {
        try {
            const res = await axios.get(`${API_BASE}/api/articles/${articleId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            state.title = res.data.title;
            state.content = res.data.content;
            state.preview = res.data.image ? `${API_BASE}/uploads/${res.data.image}` : null;
            render();
        } catch (err) {
            alert(err.response?.data?.message || "Error fetching article");
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
        }
    }


    async function handleSave(e) {
        e.preventDefault();


        if (!token) {
            return alert("You are not logged in!");
        }

        if (!state.title || !state.content) {
            return alert("Please fill all fields");
        }

        const formData = new FormData();
        formData.append("title", state.title);
        formData.append("content", state.content);
        if (state.image) formData.append("image", state.image);

        try {
            const response = await axios.put(
                `${API_BASE}/api/articles/${articleId}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert("Article updated successfully!");
            window.location.href = "/admin";
        } catch (err) {
            alert(err.response?.data?.message || "Error updating article");
        }
    }


    function render() {
        root.innerHTML = "";

        root.appendChild(
            div(
                Navbar(),
                section({ class: "edit-article-section" },
                    div({ class: "container" },
                        div({ class: "row" },
                            div({ class: "col-lg-6 offset-lg-3 col-12" },
                                form({ class: "p-4 edit-article", onsubmit: handleSave },
                                    h3({ class: "text-center mb-4 fw-bold" }, "Edit Article"),
                                    div({ class: "form-group mb-3" },
                                        label({ for: "title", class: "fw-semibold pb-2" }, "Title"),
                                        input({
                                            type: "text",
                                            id: "title",
                                            class: "form-control",
                                            placeholder: "Enter Title",
                                            value: state.title,
                                            oninput: e => { state.title = e.target.value; }
                                        })
                                    ),
                                    div({ class: "form-group mb-3" },
                                        label({ for: "content", class: "fw-semibold pb-2" }, "Content"),
                                        textarea({
                                            id: "content",
                                            class: "form-control",
                                            placeholder: "Enter Content",
                                            value: state.content,
                                            oninput: e => { state.content = e.target.value; }
                                        })
                                    ),
                                    div({ class: "form-group mb-3 article_img_input" },
                                        div({ class: "article_img" },
                                            label({ for: "image", class: "fw-semibold pb-2" }, "Image"),
                                            input({
                                                type: "file",
                                                id: "image",
                                                class: "form-control",
                                                onchange: handleImageChange
                                            })
                                        ),
                                        state.preview && div({ class: "mb-3" },
                                            img({ src: state.preview, style: "width:100px; height:100px; object-fit:cover; border-radius:5px;" })
                                        ),
                                    ),



                                    button({ type: "submit", class: "d-block mx-auto submit-btn" }, "Save")
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    document.body.appendChild(root);
    fetchArticle();

    return root;
}
