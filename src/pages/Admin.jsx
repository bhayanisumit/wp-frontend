import Articles from '../components/Articles';
import AddArticle from '../components/AddArticle';
import { Toaster } from 'react-hot-toast';

export default function Admin({ token }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <section className="admin-dashboard-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center pb-5">Admin Dashboard</h1>
            </div>
            <div className="col-lg-6 offset-lg-3 col-12">
              <AddArticle apiUrl={apiUrl} token={token} />
            </div>
          </div>

          <div className="row py-3">
            <h2 className="py-5 text-center">Existing Articles</h2>
            <Articles token={token} />
          </div>
        </div>
      </section>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
