import classes from './AddNote.module.css';
import AddNoteForm from './AddNoteForm';
import Card from '../ui/Card';

const AddNote = (props) => {
  const onSaveNote = (titleText, noteText) => {
    props.addNote(titleText, noteText);
  };
  return (
    <Card className={classes['add-note']}>
      <AddNoteForm saveNote={onSaveNote} />
    </Card>
  );
};

export default AddNote;
