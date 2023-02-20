import { useState, useEffect } from 'react';

import ButtonLoaderMore from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

import { searchImg } from 'services/image-api';
import css from './styles.module.css';

function SearchImg() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nameImg, setNameImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isNothing, setIsNothing] = useState(false);

  const loaderMore = () => {
    setPage(prevState => prevState + 1);
  };

  const modalOpen = (url, tags) => {
    setShowModal(prev => !prev);
    setUrl(url);
    setTags(tags);
  };

  const modalClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      setShowModal(prev => !prev);
      setUrl('');
      setTags('');
    }
  };

  const searchInput = name => {
    if (name === nameImg) {
      return;
    }
    setNameImg(name);
    setGallery([]);
    setPage(1);
  };

  useEffect(() => {
    if (nameImg) {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const data = await searchImg(nameImg, page);

          setGallery(gallery => [...gallery, ...data.hits]);
          setTotal(data.totalHits);
          setIsNothing(true);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [nameImg, page]);

  const totalPage = Math.ceil(total / 12);

  return (
    <div>
      <Searchbar onSubmit={searchInput} />
      <ImageGallery onClick={modalOpen} gallery={gallery} />
      {totalPage === 0 && isNothing && (
        <>
          <h2 className={css.title}>За вашим запитом нічого не знайдено</h2>
          <img
            src="https://i.gifer.com/GT4C.gif"
            alt="nothing"
            className={css.gif}
          />
        </>
      )}
      {error && <h2 className={css.title}>{error}</h2>}
      {loading && <Loader text="Loading..." />}

      {Boolean(gallery.length) && page < totalPage && (
        <ButtonLoaderMore loader={loaderMore} type="button" />
      )}
      {showModal && (
        <Modal onClose={modalClose}>
          <img src={url} alt={tags} />
        </Modal>
      )}
    </div>
  );
}

export default SearchImg;
