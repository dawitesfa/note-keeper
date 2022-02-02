import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      onClick={props.onClick}
      className={`${classes['card']} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
