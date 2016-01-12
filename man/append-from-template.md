## append-from-template `d3-utils/append-from-template`

The d3 selection.append(_name_) operator only supports passing it the name of a tag.
This can make it very tiresome to build complex html structures.

With `append-from-template` you can create a function from an HTML snippet and use it with the D3 `selection.select` operator to append a node with that markup:

So, to append a node with the following structure in "native" D3,

    <section class="template"><h2>hello</h2><a classed="home-link" href="/home">home</a></section>

You'd need to do

    var section = selection.append("section").classed("template", true)
    section.append("h2")
        .text("hello")

    section.append("a")
        .attr("href", "/home")
        .text("home")
        .classed("home-link", true)

    // etc. etc.

Using `append-from-template` you can do:

    var append = appendFromTemplate('<section class="template"><h2>hello</h2><a classed="home-link" href="/home">home</a></section>')
    section.select(append)

Each generated node is new so you can use it for creating multiple "renderers"

    var append = appendFromTemplate(yourRendererMarkup)
    d3.select("ul")
      .selectAll(".option")
      .data(yourData)
      .enter()
      .select(append)

The `append-from-template` is available as an AMD module:

    require(
      [
        "d3-utils/append-from-template"
      , "text!./renderer-template.html"
      ]
    , function(appendFromTemplate, template) {
        var append = appendFromTemplate(template)

        // ...

        d3.select("#target").selectAll(".element")
          .data(someData)
          .enter()
          .select(append)
      }
    )

It can also be used as a plugin by passing the path to the template file directly

    require(
      [
        "d3-utils/append-from-template!./renderer-template.html"
      ]
    , function(append) {

        // ...

        d3.select("#target").selectAll(".element")
          .data(someData)
          .enter()
          .select(append)
      }
    )
