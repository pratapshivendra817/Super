const every = (function () {
  const apiToken = '10219177700206566';
  const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
  const toastContainer = document.getElementById('toast');
  const FAVOURITES = 'favourites';
  const loader = document.querySelector('.loader');

  function setRandomBackgroundImage() {
    const urls = [
      'https://mk0nationaltodayijln.kinstacdn.com/wp-content/uploads/2020/04/national-superhero-day-640x514.jpg',
      'https://static1.srcdn.com/wordpress/wp-content/uploads/Plastic-Man-The-Flash-and-Jean-Grey.jpeg',
      'https://assets3.thrillist.com/v1/image/2801816/1200x630',
      'data:image/jpeg;base64,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',
       'https://wallpaperaccess.com/full/270500.jpg',
    ];

    const randomBackgroundImageUrl =
      urls[Math.floor(Math.random() * urls.length)];

    console.log('randomBackgroundImageUrl', randomBackgroundImageUrl);
    const html = document.querySelector('html');
    html.style.backgroundImage = `url(${randomBackgroundImageUrl})`;
  }

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  /* Notification handler */
  function showNotification(type, message) {
    if (type === 'error') {
      toastContainer.classList.remove('toast-success');
      toastContainer.classList.add('toast-error');
    } else if (type === 'success') {
      toastContainer.classList.remove('toast-error');
      toastContainer.classList.add('toast-success');
    }
    toastContainer.style.display = 'block';
    toastContainer.innerText = message;

    setTimeout(() => {
      toastContainer.style.display = 'none';
    }, 3000);
  }

  /* Send api requests */
  async function apiRequest(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return {
        data,
        success: true,
      };
    } catch (error) {
      console.log('error', error);
      return {
        error: error.message,
        success: false,
      };
    }
  }

  /* Add hero to localstorage */
  function addHeroToFavourites(hero) {
    if (!hero) return;

    const favouritesFromLocalStorage = getFavouriteSuperheroes();
    favouritesFromLocalStorage.push(hero);

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('success', 'Added to favourites');
  }

  /* Remove hero from localstorage */
  function removeHeroFromFavourites(heroId) {
    if (!heroId) return;

    let favouritesFromLocalStorage = getFavouriteSuperheroes();

    // Remove hero from localstorage
    favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
      (item) => item.id !== heroId
    );

    // Save in localstorage
    localStorage.setItem(
      FAVOURITES,
      JSON.stringify(favouritesFromLocalStorage)
    );

    showNotification('Removed', 'Removed from favourites');
  }

  /* Get fav superheroes from the local storage */
  function getFavouriteSuperheroes() {
    return localStorage.getItem(FAVOURITES)
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : [];
  }

  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
        // handleSearch(args);
      }, delay);
    };
  }

  setRandomBackgroundImage();

  return {
    apiRequest,
    apiUrl,
    showNotification,
    addHeroToFavourites,
    removeHeroFromFavourites,
    getFavouriteSuperheroes,
    showLoader,
    hideLoader,
    debounce,
  };
})();
