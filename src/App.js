import AddNote from './components/notes/AddNote';
import React, { useState } from 'react';
import Notes from './components/notes/Notes';
import Search from './components/notes/Search';

const DUM = [
  {
    id: 'id-001',
    title: 'Dawit',
    note: 'is Here',
    date: new Date('2022, 01, 23'),
  },
  {
    id: 'id-002',
    title: 'Dawit',
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae voluptatem neque tenetur perferendis dolorem magni non sint? Minima ipsam voluptatibus sapiente architecto, explicabo voluptas laborum quia incidunt fugit eius! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae voluptatem neque tenetur perferendis dolorem magni non sint? Minima ipsam voluptatibus sapiente architecto, explicabo voluptas laborum quia incidunt fugit eius! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quae voluptatem neque tenetur perferendis dolorem magni non sint? Minima ipsam voluptatibus sapiente architecto, explicabo voluptas laborum quia incidunt fugit eius!',
    date: new Date('2022, 01, 20'),
  },
];
const App = () => {
  const [notes, setNotes] = useState(DUM);
  const [isGrid, setIsGrid] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const onPosChanged = (grid) => {
    setIsGrid(grid);
  };

  const onSearchActive = (isActive) => {
    setIsSearchActive(isActive);
  };

  const onAddNote = (titleText, noteText) => {
    const newNote = {
      title: titleText,
      note: noteText,
      date: new Date(),
      id: new Date().toISOString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const onEditNote = (titleText, noteText, isPinned, id) => {
    const newNotes = [...notes];
    const modNote = newNotes.find((note) => note.id === id);
    const index = newNotes.indexOf(modNote);
    if (titleText.length === 0 && noteText.length === 0)
      newNotes.splice(index, 1);
    else
      newNotes[index] = {
        ...modNote,
        title: titleText,
        note: noteText,
        pinned: isPinned,
        date: new Date(),
      };
    setNotes(newNotes);
  };

  const pinnedNotes = notes.filter((note) => note.pinned);
  pinnedNotes.sort((a, b) => b.date - a.date);
  const unPinnedNotes = notes.filter((note) => !note.pinned);
  const sortedNotes = [...pinnedNotes, ...unPinnedNotes];
  return (
    <>
      <Search
        searchActive={onSearchActive}
        notes={sortedNotes}
        posChanged={onPosChanged}
        grid={isGrid}
      />
      {!isSearchActive ? (
        <>
          <AddNote addNote={onAddNote} />
          <Notes grid={isGrid} notes={sortedNotes} editNote={onEditNote} />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default App;
