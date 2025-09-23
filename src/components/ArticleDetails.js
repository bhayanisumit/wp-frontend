import Navbar from "./Navbar";

async function ArticleDetails(props) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const articleId = props.id;
  let article  = {};
  if (articleId) {
    try {
      const res = await fetch(`${API_BASE}/api/articles/${articleId}`);
      article  = await res.json();
    }
    catch (err) {
      console.error(err);
    }
  }

  return div(
    Navbar(),
    section({ class: "articles-section" },
      div({ class: "container" },
        div({ class: "row" },
          div({ class: "col-12 articles-detail" },
            h2({}, article .title || "Loading..."),
            article .image ? img({
              src: `${API_BASE}/uploads/${article .image}`,
              class: "img-fluid rounded-4 shadow article-img"
            }) : null,
            p({ class: "article-content py-5" }, article .content || "")
          )
        )
      )
    )
  )

}

export default ArticleDetails;