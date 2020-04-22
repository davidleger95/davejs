// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"

const userPreference = localStorage.getItem('color-scheme');
const colorSchemeDark =
  window.matchMedia('(prefers-color-scheme: dark)').media === 'not all';

if (userPreference === 'dark') {
  document.body.setAttribute('data-color-scheme', 'dark');
} else if (userPreference === 'light') {
  document.body.setAttribute('data-color-scheme', 'light');
} else {
  document.body.setAttribute(
    'data-color-scheme',
    colorSchemeDark ? 'dark' : 'light'
  );
}
