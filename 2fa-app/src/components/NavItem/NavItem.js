import { Link } from "react-router-dom";
import "./styles.css";

export const NavItem = ({ to, text }) => (
  <li className="navItem">
    <Link to={to}>{text}</Link>
  </li>
);
