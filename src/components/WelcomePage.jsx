import Navigation from "./Navigation";
import logo from "../img/Rick-And-Morty-Logo-Transparent-File.png";

function WelcomePage() {
  return (
    <>
      <Navigation />
      <div className="mt-5">
        <img src={logo} alt="logo" className="center" />
      </div>
    </>
  );
}

export default WelcomePage;
