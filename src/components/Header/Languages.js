import i18next from "i18next";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
const Languages = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (Languages) => {
    i18n.changeLanguage(Languages);
  };
  return (
    <>
      {" "}
      <NavDropdown
        title={i18n.language === "vi" ? "Viet Nam" : "English"}
        id="basic-nav-dropdown2"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Viet Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
