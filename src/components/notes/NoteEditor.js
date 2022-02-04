import classes from './NoteEditor.module.css';
import Card from '../ui/Card';
import React, { useState, useContext } from 'react';
import Button from '../ui/Button';
import NoteContext from '../../states/note-context';
import ModalOverlay from '../ui/ModalOverlay';
import ReactDOM from 'react-dom';
import { useEffect } from 'react/cjs/react.development';

const NoteEditor = (props) => {
  const [title, setTitle] = useState(props.noteTitle);
  const [noteText, setNoteText] = useState(props.noteText);
  const ctx = useContext(NoteContext);

  const onBtnClickHandler = (e) => {
    e.preventDefault();
    ctx.editNote(title, noteText, props.isPinned, props.id);
    props.onShowModal(true);
  };

  const onInputTitleHandler = (e) => {
    setTitle(e.target.textContent);
  };

  const onInputNoteHandler = (e) => {
    setNoteText(e.target.textContent);
  };

  const onOverlayClickHandler = (e) => {
    ctx.editNote(title, noteText, props.isPinned, props.id);
    props.onShowModal(true);
  };
  console.log(props.id);
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay onClick={onOverlayClickHandler} />,
        document.getElementById('overlay-root')
      )}
      <Card className={classes['note-editor']}>
        <div className={classes['note-editor__text-container']}>
          <h5
            contentEditable={true}
            onInput={onInputTitleHandler}
            suppressContentEditableWarning={true}
          >
            {props.noteTitle}
          </h5>
          <p
            contentEditable={true}
            onInput={onInputNoteHandler}
            suppressContentEditableWarning={true}
          >
            {props.noteText}
          </p>
        </div>
        <div className={classes['note-editor__btn-container']}>
          <Button
            className={classes['note-editor__btn']}
            onClick={onBtnClickHandler}
          >
            Close
          </Button>
        </div>
      </Card>
    </>
  );
};

export default NoteEditor;
