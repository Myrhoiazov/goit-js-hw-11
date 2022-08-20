import Notiflix from 'notiflix';
import classGallery from './Gallery';
import './style.css';

const galleryMarkup = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const form = document.querySelector('#search-form');
let page = 1;
let value = '';

form.addEventListener('submit', onSerchPhoto);
btnLoadMore.addEventListener('click', onLoadMore);

const galleryEl = new classGallery(galleryMarkup);

async function onSerchPhoto(ev) {
  ev.preventDefault();
  cleanHTML();

  value = ev.target.elements.searchQuery.value.trim();
  if (!value) {
    return;
  }

  try {
    const data = await galleryEl.loadImages(value, page);
    if (data.hits.length === 0) {
      messageError(
        'failure',
        "Sorry, there are no images matching your search query. Please try again."
      )
      return;
    }
    messageError(
      'success',
      `Hoorey! We found ${data.totalHits} Images`
    )
    galleryEl.renderImages(data.hits);

    if (page * 40 < data.totalHits) {
      btnLoadMore.style.display = 'block';
    } else {
      btnLoadMore.style.display = 'none';
      messageError(
        'failure',
        "We're sorry, but you've reached the end of search results."
      )
    }
  } catch (error) {
    messageError(
      'failure',
      "Sorry, somthing was wranng! Can try"
    )
  }
}

async function onLoadMore() {
  page += 1;

  const data = await galleryEl.loadImages(value, page);
  galleryEl.renderImages(data.hits);

  if (page * 40 < data.totalHits) {
    btnLoadMore.style.display = 'block';
  } else {
    btnLoadMore.style.display = 'none';
    messageError(
      'failure',
      "We're sorry, but you've reached the end of search results."
    )
  }
}

function cleanHTML() {
  btnLoadMore.style.display = 'none';
  galleryMarkup.innerHTML = '';
  page = 1;
}

function messageError(type, message) {
  Notiflix.Notify[type](message);
}

