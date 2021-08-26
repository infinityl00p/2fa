import "./styles.css";

export const Button = ({ type, value, onClick }) => (
  <input className="button" type={type} value={value} onClick={onClick} />
);
