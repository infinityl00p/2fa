import "./styles.css";

export const LabelInput = ({ text, type, name, value, onChange }) => (
  <>
    <div>
      <label className="label">{text}</label>
    </div>
    <div>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </>
);
