import classes from './Search.module.css';
import React, { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

const Search = (props) => {
  const [keyWord, setKeyWord] = useState('');
  const [results, setResults] = useState(props.notes);

  useEffect(() => {
    setResults(
      props.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(keyWord) ||
          note.note.toLowerCase().includes(keyWord)
      )
    );
    props.searchActive(keyWord.length > 0);
  }, [keyWord]);

  const onOrientationClickHandler = (e) => {
    props.posChanged(!props.grid);
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
          <i className={props.grid ? 'bi bi-grid' : 'bi bi-list'}></i>
        </div>
      </div>
      {keyWord.length !== 0 ? <SearchResult results={results} /> : ''}
    </>
  );
};

export default Search;
