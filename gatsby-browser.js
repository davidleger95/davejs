// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"

const userPreference = localStorage.getItem('color-scheme');
const colorSchemeDark =
  window.matchMedia('(prefers-color-scheme: dark)').media === 'not all';

if (userPreference === 'dark' || colorSchemeDark) {
  document.body.setAttribute('data-color-scheme', 'dark');
} else {
  document.body.setAttribute('data-color-scheme', 'light');
}
