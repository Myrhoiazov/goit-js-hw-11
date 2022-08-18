// function fetchQuery(value, page = 1) {

//   const KEY = '29332963-764ea3ce314f104536083404e';
//   const BASE_URL = `https://pixabay.com/api/?`;

//   const options = new URLSearchParams({
//     key: KEY,
//     q: value,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: 40,
//   });

//   return fetch(BASE_URL + options)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export { fetchQuery };
