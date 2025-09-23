import Navbar from './Navbar';
import aboutUs from "../assets/image/about-us.jpg"
function Home() {
  return div({},

    Navbar(),
    section({ class: "about-section" },
      div({ class: "container" },
        div({ class: "row align-items-center" },
          div({ class: "col-lg-6 col-md-12 col-12 mb-4 mb-lg-0 about-company" },
            h1({ class: "fw-bold mb-3" }, "Who We Are"),
            h3({ class: "text-primary mb-4" }, "Ensuring Your Success Through Reliable IT Solutions"),
            p({},
              "Ensuring Your Success Through Reliable IT Solutions delivers tailored IT services that enhance efficiency and drive growth, empowering your business to thrive in a competitive landscape."
            ),
            p({}, "We are Flax Infotech architects of digital possibilities, dreamers with keyboards, and problem-solvers with code. Born in 2024 from a shared passion for redefining technology, we don’t just build software; we craft experiences, empower businesses, and simplify lives.")
          ),
          div({ class: "col-lg-6 col-md-12 col-12 text-center" },
            img({
              src: aboutUs,
              alt: "About Flax Infotech",
              class: "img-fluid rounded-4 shadow about-img"
            })
          ),
          
        ),
      )
    )
  );

}

export default Home;