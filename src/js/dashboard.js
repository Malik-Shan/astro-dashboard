import {slugify} from './dashboard.util';

window.onload = () => {
  const slugGenBtns = document.querySelectorAll("[data-button='slugGenerator']");
  if(slugGenBtns.length !== 0){
    slugGenBtns.forEach((b) => {
      b.removeAttribute('disabled');
      b.addEventListener('click', () => {
        const i = document.querySelector(b.getAttribute('data-slug-get'));
        if(!i) throw Error(`Slug input element not found. Input element selector ${b.getAttribute('data-slug-get')}`);
        const t = document.querySelector(b.getAttribute('data-slug-target'));
        if(!t) throw Error(`Slug output element not found. Output element selector ${b.getAttribute('data-slug-target')}`);
        const v = slugify(i.value);
        if(v === '') throw Error(`Enter valid input to slugify. input=('${v}')`)
        t.value = slugify(i.value);
      })
    })
  }
}
