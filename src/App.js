import { createElement } from './utils';
import { initRouter } from './router';
import LocationFinder from './LocationFinder';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'Locaton Finder',
    className: 'heading',
  });

  // nav items
  const page1 = createElement('a', {
    href: '/#/home',
    textContent: 'Home',
  });
  const page2 = createElement('a', {
    href: '/#/page2',
    textContent: 'Page 2',
  });
  const page3 = createElement('a', {
    href: '/#/page3',
    textContent: 'Page 3',
  });

  // const nav = createElement('nav', {}, [page1, page2, page3]);

  const headerElem = createElement('header', {}, [appTitle]);

  document.getElementById('header').innerHTML = headerElem.innerHTML;
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  document.getElementById('footer').innerHTML = createElement('footer', {}, [copyright]).innerHTML;
}

function App() {
  const main = createElement('main', {}, []);

  // Initialize the router with the main container
  initRouter(main);

  // Initialize the LocationFinder
  LocationFinder();

  // Render the app structure
  const appContainer = document.getElementById('root');
  if (appContainer) {
    appContainer.appendChild(main);
  }
}

// Initialize the app
function initializeApp() {
  Header(); // Render the header
  App();    // Render the main app
  Footer(); // Render the footer
}

// Start the app
initializeApp();

export default App;