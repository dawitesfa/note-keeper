import classes from './Notes.module.css';
import NoteItem from './NoteItem';

const Notes = (props) => {
  const onEditNote = (title, noteText, pinned, id) => {
    props.editNote(title, noteText, pinned, id);
  };
  return (
    <div
      className={classes['notes']}
      style={{
        gridTemplateColumns: !props.grid && '1fr',
      }}
    >
      {props.notes.map((note) => (
        <NoteItem
          onEditNote={onEditNote}
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
