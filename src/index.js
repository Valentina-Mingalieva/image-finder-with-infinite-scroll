'use strict';

/* https://www.youtube.com/watch?v=L8X4zAsoxb4 */
import './sass/main.scss';
import cardTpl from './templates/image-card.hbs';

import ApiService from './js/apiService.js';
const api = new ApiService();

import getRefs from './js/get-refs';
const refs = getRefs();

function onSearch(e) {
    e.preventDefault();

    api.query = e.currentTarget.elements.query.value;

    if (api.query === '') {
        alert('Try once again');
        clearList();
    } else {
        clearList();
        api.resetPage();
        createList();
    }
}

function createList() {
    api.fetchUrl()
    .then(hits => {
        api.nextPage();
        renderImageCard(hits)
    })
}
    
function renderImageCard(hits) {
    refs.galleryEl.insertAdjacentHTML('beforeend', cardTpl(hits));
    refs.loading.classList.remove('show');
};

function clearList() {
    refs.galleryEl.innerHTML = '';
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollHeight + scrollTop >= clientHeight - 5) {
        showLoading();
    }
});

function showLoading() {
    refs.loading.classList.add('show');
    setTimeout(createList, 1000);
}

refs.searchForm.addEventListener('submit', onSearch);