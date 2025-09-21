import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function AddArticle({ apiUrl, token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await fetch(`${apiUrl}/api/articles`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Article Added");

      // Trigger refresh in Articles component
      window.dispatchEvent(new Event("articleAdded"));
    } catch (err) {
      alert(err.response?.data?.message || "Error adding article");
    }
  };

  return (
    <form className="p-4 add-article" onSubmit={handleAdd}>
      <h3 className="text-center mb-4 fw-bold">Add Article</h3>

      <div className="form-group mb-3">
        <label htmlFor="title" className="fw-semibold pb-2">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="content" className="fw-semibold pb-2">
          Content
        </label>
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
        />
      </div>

      <div className="form-group mb-3 article_img_input">
        <label htmlFor="image" className="fw-semibold pb-2">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
          id="image"
          ref={fileInputRef} 
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        )}
      </div>

      <button type="submit" className="d-block mx-auto submit-btn">
        Submit
      </button>
    </form>
  );
}
