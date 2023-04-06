# Process Notes - Dictionary web app solution

My notes while completing the [Dictionary web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL). 

## Table of contents

- [First Steps](#first-steps)
  - [The Overview](#the-overview)
  - [Things I Learned](#things-i-learned)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## First Steps

### The Overview

This app will be a bit more complicated than the previous that I've done, and I'm kind of stoked about it. I've built a decent amount of responsive designs, done a bit of API calls and JSON handline, but I have not yet done...light/dark mode. Plus this project has user selectable font choices. Not really sure why I'm uncertain about it--probably just because it's new--and I'm thinking once I get going it'll all make sense.

First thoughts:
- The design is pretty straight-forward. It's a dictionary app so maybe that's to be expected. Even going from desktop down to mobile should present few issue because there really won't be a lot of re-arranging of the elements. Things will shrink and text will flow on to additional lines.
- Here's how I'm thinking of breaking down the build process:
  - Design system
  - Layouts plus media queries using the dummy information provided in the design
  - In-page functionality:
    - Buttons
    - Menus
    - Form validation (do I bring in some regex? 🤔)
    - Font selector
    - Light/dark mode selector (looks like I could try to animate the SVG?)
  - API interface
  - Additional functionality like playing the pronunciation and looking up other provided words from the synonyms/antonyms list

### Things I Learned

![](./screenshot.jpg)

**SVGs**
I've been aware, from a distance, the power of SVGs and for some reason I had previously incorporated them without any issues. This time around I couldn't change a color as expected. This is when I discovered that:
- If one needs to access the internal elements of an SVG, even changing fill or stroke color, the SVG needs to be inline in the HTML, not embedded through an img tag.
- Also I didn't know that one can just open the SVG file in VSCode or a text editor to get access to the internals

**JS**
Mouseout bubbles and mouseleave does not. I couldn't figure out why my disappearing menu was glitchy and then I thought...maybe it's a bubbling behavior, even though I was targeting the parent, not the children. Turns out it was definitely a bubbling behavior. By using "mouseleave" instead of "mouseout" I was able to control the behavior to just the parent and get the response I needed.

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
