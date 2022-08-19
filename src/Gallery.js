import imagesMarkup from '../src/templates/markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export default class Gallery {
  static KEY = '29332963-764ea3ce314f104536083404e';
  static BASE_URL = `https://pixabay.com/api/?`;

  constructor(container) {
    this.container = container;
  }

  async loadImages(query, page = 1) {
    const options = new URLSearchParams({
      key: Gallery.KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    });

    const response = await axios.get(Gallery.BASE_URL + options);
    if (response.statusText !== 'OK') {
      throw new Error(response.status);
    }
    return response.data;
  }

  renderImages(images) {
    this.container.insertAdjacentHTML('beforeend', imagesMarkup(images));
    gallery.refresh();
  }
}
