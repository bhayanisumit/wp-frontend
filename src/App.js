import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import EditArticle from './pages/EditArticle';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/admin" element={<Admin token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/admin/edit/:id" element={<EditArticle token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
