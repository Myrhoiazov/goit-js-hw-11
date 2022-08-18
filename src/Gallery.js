import imagesMarkup from '../src/templates/markup.hbs';

export default class Gallery {
  static KEY = '29332963-764ea3ce314f104536083404e';
  static BASE_URL = `https://pixabay.com/api/?`;

  constructor(container) {
    this.container = container;
  }

  loadImages(query, page = 1) {
    const options = new URLSearchParams({
      key: Gallery.KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    });

    return fetch(Gallery.BASE_URL + options).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  renderImages(images) {
    this.container.insertAdjacentHTML('beforeend', imagesMarkup(images));
  }
}
