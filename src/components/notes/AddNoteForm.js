import classes from './AddNoteForm.module.css';
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const AddNoteForm = (props) => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [noteFocused, setNoteFocused] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  // const saveNote = () => {
  //   if (title.trim().length === 0 && note.trim().length === 0) return;
  //   props.saveNote(title.trim(), note.trim());
  //   setTitle('');
  //   setNote('');
  // };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setShow(titleFocused || noteFocused);
      if (!(titleFocused || noteFocused)) {
        if (title.trim().length === 0 && note.trim().length === 0) return;
        props.saveNote(title.trim(), note.trim());
        setTitle('');
        setNote('');
      }
    }, 200);
    return () => {
      clearTimeout(identifier);
    };
  }, [titleFocused, noteFocused]);

  const onTitleFocusHandler = (e) => {
    e.preventDefault();
    setTitleFocused(true);
  };

  const onTitleBlurHandler = (e) => {
    e.preventDefault();
    setTitleFocused(false);
  };

  const onNoteFocusHandler = (e) => {
    e.preventDefault();
    setNoteFocused(true);
  };

  const onNoteBlurHandler = (e) => {
    e.preventDefault();
    setNoteFocused(false);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onNoteChange = (e) => {
    setNote(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      if (noteFocused) setNoteFocused(false);
      if (titleFocused) setTitleFocused(false);
    }
  });

  return (
    <form className={classes['form']} onSubmit={onSubmitHandler}>
      <input
        type="text"
        className={`${classes['form__input']} ${classes['form__input--title']}`}
        placeholder="Enter title..."
        onFocus={onTitleFocusHandler}
        onBlur={onTitleBlurHandler}
        onChange={onTitleChange}
        value={title}
      />
      <textarea
        name="note-text"
        id="note-text"
        // rows="10"
        type="textarea"
        className={`${classes['form__input']} ${classes['form__input--note']}`}
        placeholder="Take a note..."
        onFocus={onNoteFocusHandler}
        onBlur={onNoteBlurHandler}
        onChange={onNoteChange}
        value={note}
        style={{ display: show ? 'block' : 'none' }}
      />
      <Button style={{ display: show ? 'block' : 'none' }}>Close</Button>
    </form>
  );
};

export default AddNoteForm;
