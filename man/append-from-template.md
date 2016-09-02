## append from template

Create a function from an HTML snippet and use it with the D3 `selection.select` operator to append a node with that markup.

Using `append-from-template` you can do:

```javascript
const append = appendFromTemplate('<section class="template"><h2>hello</h2><a classed="home-link" href="/home">home</a></section>')
section.select(append)
```

Each generated node is new so you can use it for creating multiple "renderers"

```javascript
const append = appendFromTemplate(yourRendererMarkup)
d3.select('ul')
  .selectAll('.option')
  .data(yourData)
  .enter()
  .select(append)
```

Also, the new node is returned so it becomes the new selection.
You can, then, continue operating on it,

```javascript
selection.select(appened).text('all good').style('color', 'fucsia')
```

### Rationale

The d3 `selection.append(name)` operator only supports passing it the name of a tag.
This can make it very tiresome to build complex html structures.

To append a node with the following structure in "native" D3,

```html
<section class="template"><h2>hello</h2><a classed="home-link" href="/home">home</a></section>
```

You'd need to do

```javascript
const section = selection.append('section').classed('template', true)

section.append('h2')
    .text('hello')

section.append('a')
    .attr('href', '/home')
    .text('home')
    .classed('home-link', true)

// etc. etc.
```
