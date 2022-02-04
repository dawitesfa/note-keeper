import classes from './Notes.module.css';
import NoteItem from './NoteItem';
import React, { useContext } from 'react';
import NoteContext from '../../states/note-context';

const Notes = () => {
  const ctx = useContext(NoteContext);
  return (
    <div
      className={classes['notes']}
      style={{
        gridTemplateColumns: !ctx.isGrid && '1fr',
      }}
    >
      {ctx.notes.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          note={note.note}
          id={note.id}
          date={note.date}
          isPinned={note.pinned}
        />
      ))}
    </div>
  );
};

export default Notes;
