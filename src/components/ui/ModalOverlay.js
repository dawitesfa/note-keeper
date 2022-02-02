import classes from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  return (
    <div
      data-overlay="1"
      onClick={props.onClick}
      className={classes['overlay']}
    ></div>
  );
};

export default ModalOverlay;
