import classes from './Search.module.css';
import React, { useState, useEffect, useContext } from 'react';
import SearchResult from './SearchResult';
import NoteContext from '../../states/note-context';

const Search = (props) => {
  const ctx = useContext(NoteContext);
  const [keyWord, setKeyWord] = useState('');
  const [results, setResults] = useState(ctx.notes);

  useEffect(() => {
    setResults(
      ctx.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(keyWord) ||
          note.note.toLowerCase().includes(keyWord)
      )
    );
    ctx.searchActive(keyWord.length > 0);
  }, [keyWord]);

  const onOrientationClickHandler = (e) => {
    ctx.posChanged(!ctx.isGrid);
  };

  const onSearchInputChange = (e) => {
    setKeyWord(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className={classes['search']}>
        <input
          onChange={onSearchInputChange}
          type="text"
          className={classes['search__input']}
          placeholder="Search Note..."
        />
        <div className="search__pos-icon" onClick={onOrientationClickHandler}>
          <i className={ctx.isGrid ? 'bi bi-grid' : 'bi bi-list'}></i>
        </div>
      </div>
      {keyWord.length !== 0 ? <SearchResult results={results} /> : ''}
    </>
  );
};

export default Search;
