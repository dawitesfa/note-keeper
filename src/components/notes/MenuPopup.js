import classes from './MenuPopup.module.css';

const MenuPopup = (props) => {
  return (
    <div className={`${classes['menu']} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default MenuPopup;
