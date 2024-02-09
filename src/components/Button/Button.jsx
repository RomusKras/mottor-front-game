import "./Button.css";

export default function Button({ children, className, onClick }) {
  return (
    <button type="button" className={"button " + className} onClick={onClick}>
      {children}
    </button>
  );
}
