import Navbar from './Navbar';

async function Articles() {
  let articles = [];
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  
  try {
    const res = await fetch(`${API_BASE}/api/articles`);
    articles = await res.json();
    console.log(articles);
  } catch (err) {
    console.error(err);
  }

  return div(
    Navbar(),
    section({ class: "articles-section" },
      div({ class: "container" },
        div({ class: "row" },
          ...articles.map(a =>
            div({ class: "col-lg-4 col-md-6 col-12" },
              div({ class: "card articles-card", onclick: () => { location.href = `/articles/${a._id}` }, style: "cursor:pointer" },
                img({ src: `${API_BASE}/uploads/${a.image}`, class: "card-img-top", alt: a.title }),
                div({ class: "card-body article-detail" },
                  p({ class: "article-title" }, a.title),
                  p({ class: "author-name" }, "by " + a.author)
                )
              )
            )
          )
        )
      )
    )
  );
}
export default Articles;
