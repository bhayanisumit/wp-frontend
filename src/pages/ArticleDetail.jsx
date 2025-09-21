import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <section className="articles-detail-section">
        <div className="container">
          <div className="row">
            <div className="col-12 articles-detail ">
              <h2>{article.title}</h2>
              <img
                src={`${apiUrl}/uploads/${article.image}`}
                alt={article.title}
                className="img-fluid rounded-4 shadow article-img"
              />
              <p className='article-content py-5'>{article.content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
