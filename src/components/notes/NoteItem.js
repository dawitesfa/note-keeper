import classes from './NoteItem.module.css';
import Card from '../ui/Card';
import ModalOverlay from '../ui/ModalOverlay';
import NoteEditor from './NoteEditor';
import ReactDom, { findDOMNode } from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import MenuPopup from './MenuPopup';

const Modal = (props) => {
  return (
    <NoteEditor
      noteText={props.noteText}
      noteTitle={props.noteTitle}
      noteEdited={props.noteEdited}
    />
  );
};
const Overlay = (props) => {
  return <ModalOverlay onClick={props.onClick} />;
};

const NoteItem = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(props.isToggle);
  const [isPinned, setIsPinned] = useState(props.isPinned);
  const menuEl = useRef(null);

  useEffect(() => {
    setToggleMenu(false);
  }, []);

  useEffect(() => {
    props.onEditNote(props.title, props.note, isPinned, props.id);
  }, [isPinned]);

  const onOverlayClickHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const onNoteEdited = (title, noteText) => {
    props.onEditNote(title, noteText, isPinned, props.id);
    setShowModal(true);
  };

  const getDateFormat = () => {
    let formattedDate = '';
    const dateDiff = Math.floor((new Date() - props.date) / 86400000);
    if (dateDiff === 0) {
      formattedDate = 'today';
    } else if (dateDiff === 1) {
      formattedDate = 'yesterday';
    } else if (dateDiff === 7) {
      formattedDate = 'a week ago';
    } else if (dateDiff > 7) {
      formattedDate = `on ${props.date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })}`;
    } else {
      formattedDate = `${dateDiff} days ago`;
    }
    return formattedDate;
  };

  const onItemSelectedHandler = (e) => {
    if (e.target !== findDOMNode(menuEl.current)) {
      setShowModal(false);
    }
  };
  const onHoverHandler = (e) => {
    setToggleMenu(true);
  };

  const onHoverLeftHandler = (e) => {
    setToggleMenu(false);
  };

  const onPinClickHandler = (e) => {
    setIsPinned((prev) => !prev);
  };
  const onDeleteClickHandler = (e) => {
    props.onEditNote('', '', isPinned, props.id);
  };

  return (
    <>
      {!showModal
        ? ReactDom.createPortal(
            <Overlay onClick={onOverlayClickHandler} />,
            document.getElementById('overlay-root')
          )
        : ''}
      {!showModal
        ? ReactDom.createPortal(
            <Modal
              noteText={props.note}
              noteTitle={props.title}
              noteEdited={onNoteEdited}
            />,
            document.getElementById('modal-root')
          )
        : ''}
      <Card
        onClick={onItemSelectedHandler}
        className={classes['note-item']}
        onMouseOver={onHoverHandler}
        onMouseOut={onHoverLeftHandler}
      >
        <h5 className={classes['note-item__title']}>{props.title}</h5>
        <p className={classes['note-item__note']}>{`
      ${props.note.length > 100 ? props.note.slice(0, 100) + '...' : props.note}
      `}</p>
        <div className={classes['note-item__footer']}>
          {toggleMenu ? (
            <MenuPopup className={classes['menu-content']}>
              <i
                onClick={onDeleteClickHandler}
                style={{ color: '#777', fontSize: '1.2rem' }}
                className="bi bi-trash"
              ></i>

              <i
                ref={menuEl}
                onClick={onPinClickHandler}
                style={{ color: '#777', fontSize: '1.2rem' }}
                className={`${
                  props.isPinned ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'
                }`}
              ></i>
            </MenuPopup>
          ) : (
            <p
              className={classes['note-item__mod-date']}
            >{`Modified ${getDateFormat()}`}</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default NoteItem;
