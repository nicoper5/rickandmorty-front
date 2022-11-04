import logo from "../img/Rick-And-Morty-Logo-Transparent-File.png";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div id="navbar" className="sticky-top">
        <div className="container">
          <div className="d-flex justify-content-between ">
            <Link to="/" className="text-link">
              <img src={logo} alt="logo" className="logo-nav mt-2" />
            </Link>
            <Link to="/characters" className="text-link">
              <p className="fw-bold fs-5 mt-3">Characters</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
