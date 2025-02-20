import { createElement } from './utils';
import LocationFinder from './LocationFinder';

function Home() {
  const title = createElement('h2', { textContent: 'Home' });

  const page3Link = createElement('a', {
    href: '/#/page3',
    textContent: 'Link to Page 3',
  });

  return createElement('div', {}, []);
}

export default Home;
