import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAdmin, getToken } from "../middleware/authService";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const token = getToken();

  const fetchArticles = useCallback(() => {
    axios
      .get(`${apiUrl}/api/articles`)
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchArticles();

    const refreshListener = () => fetchArticles();
    window.addEventListener("articleAdded", refreshListener);

    // Cleanup
    return () => window.removeEventListener("articleAdded", refreshListener);
  }, [fetchArticles]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setArticles((prev) => prev.filter((article) => article._id !== id));

      toast.success("Successfully Deleted");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting article");
    }
  };

  if (!articles) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row py-3">
          {articles.map((a, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-12">
              <div className="card article_card" key={a._id}>
                <Link to={`/articles/${a._id}`}>
                  {a.image && (
                    <img
                      src={`${apiUrl}/uploads/${a.image}`}
                      alt={a.title || "Article thumbnail"}
                      className="card-img-top"
                    />
                  )}
                </Link>

                <div className="card-body">
                  <p className="article_title">
                    <Link to={`/articles/${a._id}`}>{a.title}</Link>
                  </p>

                  {isAdmin() && (
                    <div className="article-actions d-flex gap-2">
                      <i
                        className="bi bi-trash3 delete-btn"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(a._id)}
                        title="Delete"
                      ></i>

                      <Link to={`/admin/edit/${a._id}`}>
                        <i
                          className="bi bi-pencil-square edit-btn"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
