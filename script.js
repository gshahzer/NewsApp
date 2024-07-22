const apiKey = '--------------------------'; // Replace with your NewsAPI key
const apiUrl = 'https://newsapi.org/v2/top-headlines';

document.getElementById('fetch-news-btn').addEventListener('click', () => {
    const category = document.getElementById('category-select').value;
    const url = `${apiUrl}?category=${category}&apiKey=${apiKey}&country=us`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'error') {
                alert(data.message);
                return;
            }

            const articlesContainer = document.getElementById('articles-container');
            articlesContainer.innerHTML = '';

            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';

                const articleTitle = document.createElement('h2');
                articleTitle.textContent = article.title;
                articleDiv.appendChild(articleTitle);

                if (article.description) {
                    const articleDescription = document.createElement('p');
                    articleDescription.textContent = article.description;
                    articleDiv.appendChild(articleDescription);
                }

                if (article.url) {
                    const articleLink = document.createElement('a');
                    articleLink.href = article.url;
                    articleLink.textContent = 'Read more';
                    articleLink.target = '_blank';
                    articleDiv.appendChild(articleLink);
                }

                articlesContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
            alert('Error fetching the news');
        });
});
