import { createElement } from './utils';
import LocationFinder from './LocationFinder';

function Page1() {
  const title = createElement('h2', { textContent: 'Page 1' });

  const page3Link = createElement('a', {
    href: '/#/page3',
    textContent: 'Link to Page 3',
  });

  return createElement('div', {}, []);
}

export default Page1;
