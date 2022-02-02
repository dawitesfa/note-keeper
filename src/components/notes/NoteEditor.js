import classes from './NoteEditor.module.css';
import Card from '../ui/Card';
import React, { useState } from 'react';
import Button from '../ui/Button';

const NoteEditor = (props) => {
  const [title, setTitle] = useState(props.noteTitle);
  const [noteText, setNoteText] = useState(props.noteText);

  const onBtnClickHandler = (e) => {
    e.preventDefault();
    props.noteEdited(title, noteText);
  };

  const onInputTitleHandler = (e) => {
    setTitle(e.target.textContent);
  };

  const onInputNoteHandler = (e) => {
    setNoteText(e.target.textContent);
  };

  return (
    <>
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
            Save
          </Button>
        </div>
      </Card>
    </>
  );
};

export default NoteEditor;
