let word = 'Word';
let definition = 'Word definition';

const apikey = 'E5uFfvAAQPAU4Z8QfGLDfg==TseQBkGHolK3z0YV';
const options = {
  method: 'GET',
  headers: {
    'X-Api-Key' : apikey
  }
}

const apiURL = 'https://api.api-ninjas.com/v1/dictionary?word=';

async function getWord(lookingFor) {
  try {
    document.querySelector('.display-word')
      .innerHTML = 'loading...';
    document.querySelector('.word-definition')
      .innerHTML = '';
    const response = await fetch(apiURL + lookingFor, options)
    const data = await response.json();

    if (data.valid) {
      word = data.word;
      definition = data.definition;
    } else {
      word = 'Word not available';
      definition = 'sorry!';
    }
  } catch (error) {
    alert(error);
  }

  renderPage();
}

function renderPage() {
  const html = `
  <p class="title">DICTIONARY</p>
  <div class="header">
    <div class="search-container">
      <input placeholder="Search for a word"
        class="search-bar js-search-bar">
      <button class="search-button js-search-button">
        <img src="images/search-icon.png"
        class="search-icon">
      </button>
    </div>
  </div>
  <div class="word-display-container">
    <h1 class="display-word">
      ${word}
    </h1>
    <h5 class="word-definition">
      ${definition}
    </h5>
  </div>
  `

  document.querySelector('.main-container')
    .innerHTML = html;


  searchBar = document.querySelector('.js-search-bar')
  searchBar.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
      getWord(searchBar.value);

    }
  });

  const searchBtn = document.querySelector('.js-search-button');
    searchBtn.addEventListener('click', () => {
      getWord(searchBar.value);
  })
  

}

renderPage();