import Notiflix from 'notiflix';
import classGallery from './Gallery';
import './style.css'


const galleryMarkup = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const form = document.querySelector('#search-form');
let page = 1;
let value = '';

form.addEventListener('submit', onSerchPhoto);
btnLoadMore.addEventListener('click', onLoadMore);

const galleryEl = new classGallery(galleryMarkup);

function onSerchPhoto(ev) {
  ev.preventDefault();

  cleanListMarkup();
  btnLoadMore.style.display = 'none';
  value = ev.target.elements.searchQuery.value.trim();

  if (!value) {
    return;
  }

  galleryEl
    .loadImages(value, page)
    .then(data => {
      if (data.hits.length == 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notiflix.Notify.success(`Hoorey! We found ${data.totalHits} Images`);

      galleryEl.renderImages(data.hits);
      if (page * 40 < data.totalHits) {
        btnLoadMore.style.display = 'block';
      } else {
        btnLoadMore.style.display = 'none';
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function onLoadMore() {
  page += 1;

  galleryEl
    .loadImages(value, page)
    .then(data => {
      galleryEl.renderImages(data.hits);
      if (page * 40 < data.totalHits) {
        btnLoadMore.style.display = 'block';
      } else {
        btnLoadMore.style.display = 'none';
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
}

function cleanListMarkup() {
  galleryMarkup.innerHTML = '';
}


