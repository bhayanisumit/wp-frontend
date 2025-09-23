const Routes = {
  "/": {
    loader: () => import('../components/Home')
  },
  home: {
    loader: () => import('../components/Home')
  },
  
  articledetails: {
    path: '/articles/:id',
    loader: () => import('../components/ArticleDetails')
  },

  articles: {
    path: '/articles',
    loader: () => import('../components/Articles')
  },

  login: {
    path: '/login',
    loader: () => import('../components/Login')
  },

  editarticle: {
    path: '/admin/edit/:id',
    loader: () => import('../components/EditArticle')
  },

  admin: {
    path: '/admin',
    loader: () => import('../components/Admin')
  },

  fallback: {
    loader: () => import("../components/Home")
  }
};

export default Routes;
