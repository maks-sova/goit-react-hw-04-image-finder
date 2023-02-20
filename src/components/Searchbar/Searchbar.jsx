import { useState } from 'react';
import css from '../styles.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchImg, setSearchImg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchImg.trim() === '') {
      return alert('Введіть назву картинки для пошуку');
    }
    onSubmit(searchImg);
    setSearchImg('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormLabel}>
            <ImSearch />
          </span>
        </button>
        <input
          value={searchImg}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setSearchImg(e.target.value)}
          name="input"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
