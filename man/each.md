## each

Functional wrapper on top of `d3.selection.each` which allows for easier composition. 

```javascript
const someComplexComponent = _.compose(
        each(subcomponentE)
      , each(subcomponentD)
      , each(subcomponentC)
      , each(subcomponentB)
      , each(subcomponentA)
      )

d3.select('.something').datum(rows).call(someComplexComponent)
```

Is equivalent to

```javascript
function someComplexComponent(s) {
  s.each(subcomponentA)
      .each(subcomponentB)
      .each(subcomponentC)
      .each(subcomponentD)
      .each(subcomponentE)
}

d3.select('.something').datum(rows).call(someComplexComponent)
```
