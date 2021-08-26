import { NavItem } from "../../components/NavItem/NavItem";
import "./styles.css";

export const Navigation = () => {
  const navItems = [
    { to: "/login", text: "LOGIN" },
    { to: "/create", text: "CREATE ACCOUNT" },
  ];

  return (
    <div className="navigation">
      <ul className="navigation-list">
        {navItems.map(({ to, text }) => (
          <NavItem key={to} to={to} text={text} />
        ))}
      </ul>
    </div>
  );
};
