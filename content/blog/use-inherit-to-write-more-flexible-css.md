---
date: 2019-11-29T00:42:09Z
tags:
- tutorial
- css
draft: false
title: Use `inherit` to Write More Flexible CSS
description: There are so many different contexts where property values are dependant
  on their context, and inherit gives us an easy way to get the behavior we want without
  writing redundant code.
heroImage:
  img: "../assets/css-inherit-cover.png"
  alt: CSS code in a text editor
shareImage: "../assets/inherit-css-social.png"

---
When setting up a web project there’s often a lot of boilerplate CSS to write in order to reset default browser styles. Often it will look something like this to reset link styles:

```css
/* 🚫 */
a {
  text-decoration: none;
  color: black;
}
```

The above code removes the underline from links and sets the text color to black. Now we have links that look like plain text which we can then styles as needed in different contexts. However, **these are very rigid styles**. Let’s explore further to find out why.

Next, we build a navigation menu:

```html
<nav>
  <h1 class="title">My Site</h1>
  <a href="/cats">😸</a>
  <a href="/dogs">🐶</a>
</nav>
```

And we add the following styles:

```css
nav {
  display: flex;
  backgorund-color: black;
  color: white;
}

nav .title {
  font-size: 1.2rem;
}

nav a {
  display: block;
  padding: 1em;
}
```

But there’s a problem… We can see the title fine — it’s white against the black `nav` — but our links aren’t visible. 🤔 It turns out they’re black from our boilerplate code. Let’s see how we can fix this.

The simple approach would be to add a `color` property to the `nav a` selector:

```css
/* 🚫 */
nav a {
  display: block;
  padding: 1em;
  color: white;
}
```

This certainly works, but now we have `color` defined on both the `nav` and the `nav a` selector. **If we want to change the text color on the navigation menu, we will now have to change it in two places instead of one, which is not ideal.** 😐

Maybe we could go back to our original `a` selector and set the `color` to be white:

```css
/* 🚫 */
a {
  text-decoration: none;
  color: white;
}
```

**This is actually even worse!** It turns all the links on the page white. So now we can see the links in the navigation menu, but they’re not visible on the rest of the page where there’s a white background. 😞

So what can we do instead to make things better?

A lesser-known CSS value is `inherit`  and it turns out this is exactly what we need! When we give a property the value `inherit` it uses the value of the same property from the parent element. We can apply it to all our links like this:

```css
/* ✅ */
a {
  text-decoration: inherit;
  color: inherit;
}
```

It works! 😁  Now the navigation links inherit `color` from from `nav` and links elsewhere on the page inherit `color` and `text-decoration` from their parent elements as well. This makes our styles a lot more flexible by allowing links to inherit styles from their context. If a link is inside a success message, the text might be green, so the link will also be green. The same goes for error and warning messages.

**There are so many different contexts where property values are dependant on their context, and** `**inherit**` **gives us an easy way to get the behavior we want without writing redundant code.**

Another example is the `button` element, which has a default font size smaller than plain text and is explicitly colored black. We can use `inherit` to quickly normalize the button font with its surroundings:

```css
/* ✅ */
button {
  font: inherit;
}
```

There are many other great use cases for `inherit` but some are more ambiguous than the ones we’ve looked at here. I find it comes in handy quite often though when I’m writing more generic CSS rules. Next time you find yourself overwriting a lot of the same properties, stop and think if `inherit` might be the right tool to solve your problem.

Bye! 👋