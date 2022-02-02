import classes from './SearchResult.module.css';
import Card from '../ui/Card';

const SearchResult = (props) => {
  return (
    <div className={classes['search__result']}>
      {props.results.length === 0
        ? 'No results to show'
        : props.results.map((result) => (
            <Card className={classes['search__item']} key={result.id}>
              <h5>{result.title}</h5>
              <p>
                {result.note.length > 50
                  ? result.note.slice(0, 50)
                  : result.note}
              </p>
            </Card>
          ))}
    </div>
  );
};

export default SearchResult;
