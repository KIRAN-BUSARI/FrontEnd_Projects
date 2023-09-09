const API_KEY = '8f3f7b980c5c4fe086ec7f471045cca7';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews('Karnataka'));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplete = document.getElementById('templete-news-card');

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        // let cloneTemplate = newsCardTemplete.content;
        let cloneTemplate = newsCardTemplete.content.cloneNode(true);
        fillDataInCard(cloneTemplate, article);
        cardscontainer.appendChild(cloneTemplate);
    });
}

function fillDataInCard(cloneTemplate, article) {
    const newsImg = cloneTemplate.querySelector('#news-img');
    const newsTitle = cloneTemplate.querySelector('#news-title');
    const newsSource = cloneTemplate.querySelector('#news-source');
    const newsDesc = cloneTemplate.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cloneTemplate.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank')
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});