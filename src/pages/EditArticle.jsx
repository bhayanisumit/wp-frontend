import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export default function EditArticle({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/articles/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        if (res.data.image) {
          setPreview(`${apiUrl}/uploads/${res.data.image}`);
        }
      })
      .catch();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Please fill all fields');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    try {
      await axios.put(`${apiUrl}/api/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating article');
    }
  };

  return (
    <section className="edit-article-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-12">
            <form className="p-4 edit-article" onSubmit={handleSave}>
              <h3 className="text-center mb-4 fw-bold">Edit Article</h3>

              <div className="form-group mb-3">
                <label htmlFor="title" className="fw-semibold pb-2">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  id="title"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="content" className="fw-semibold pb-2">Content</label>
                <textarea
                  className="form-control"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  id="content"
                />
              </div>

              <div className="form-group mb-3 article_img_input">
                <div className="article_img">
                  <label htmlFor="image" className="fw-semibold pb-2">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                    id="image"
                  />
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                )}
              </div>

              <button type="submit" className="d-block mx-auto submit-btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
