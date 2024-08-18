# CSS BEM Style
Guideline start css by *Block*, Element, Modifier

```css
/* Block component */
.btn {}

/* Element that depends upon the block */ 
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {} 
.btn--big {}
```

it look like

```html
<a class="btn btn--big btn--orange" href="https://css-tricks.com">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```


## Problems with BEM CSS

never override other Block

```css
.nav .nav__listItem .btn--orange {
  background-color: green;
}

```

ref: https://css-tricks.com/bem-101/