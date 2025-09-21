import aboutus from "../assets/image/about-us.jpg";

export default function About() {
  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12 mb-4 mb-lg-0 about-company">
              <h1 className="fw-bold mb-3">Who We Are</h1>
              <h3 className="text-primary mb-4">Ensuring Your Success Through Reliable IT Solutions</h3>
              <p>
                Ensuring Your Success Through Reliable IT Solutions" delivers tailored IT services that enhance efficiency and drive growth, empowering your business to thrive in a competitive landscape.
              </p>
              <p>
                We are Flax Infotech architects of digital possibilities, dreamers with keyboards, and problem-solvers with code. Born in 2024 from a shared passion for redefining technology, we don’t just build software; we craft experiences, empower businesses, and simplify lives.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 col-12 text-center">
              <img src={aboutus} alt="About Flax Infotech" className="img-fluid rounded-4 shadow about-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
