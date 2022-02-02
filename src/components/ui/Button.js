import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes['button']} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
