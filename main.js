document.addEventListener('DOMContentLoaded', () => {
    const searchInputEl = document.getElementById('searchInput');
    const searchResultsEl = document.getElementById('searchResults');
    const spinnerEl = document.getElementById('spinner');

    const createAndAppendSearchResult = ({ link, title, description }) => {
        const resultItemEl = document.createElement('div');
        resultItemEl.classList.add('result-item');

        const titleEl = document.createElement('a');
        titleEl.href = link;
        titleEl.target = '_blank';
        titleEl.textContent = title;
        titleEl.classList.add('result-title');
        resultItemEl.appendChild(titleEl);

        const urlEl = document.createElement('a');
        urlEl.href = link;
        urlEl.target = '_blank';
        urlEl.textContent = link;
        urlEl.classList.add('result-url');
        resultItemEl.appendChild(urlEl);

        const descriptionEl = document.createElement('p');
        descriptionEl.classList.add('link-description');
        descriptionEl.textContent = description;
        resultItemEl.appendChild(descriptionEl);

        searchResultsEl.appendChild(resultItemEl);
    };

    const displayResults = (searchResults) => {
        spinnerEl.classList.add('d-none');
        searchResultsEl.innerHTML = ''; // Clear previous results
        searchResults.forEach(createAndAppendSearchResult);
    };

    const searchWikipedia = async (event) => {
        if (event.key === 'Enter') {
            spinnerEl.classList.remove('d-none');
            searchResultsEl.innerHTML = ''; // Clear previous results

            const searchInput = searchInputEl.value;
            const url = `https://apis.ccbp.in/wiki-search?search=${encodeURIComponent(searchInput)}`;
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                displayResults(jsonData.search_results);
            } catch (error) {
                console.error('Error fetching search results:', error);
                spinnerEl.classList.add('d-none');
                searchResultsEl.innerHTML = '<p>An error occurred while fetching the results.</p>';
            }
        }
    };

    searchInputEl.addEventListener('keydown', searchWikipedia);
});
