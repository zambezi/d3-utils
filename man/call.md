## call

Functional wrapper on top of `d3.selection.call` which allows for easier composition. 


```javascript
const someComplexComponent = _.compose(
        call(subcomponentE)
      , call(subcomponentD)
      , call(subcomponentC)
      , call(subcomponentB)
      , call(subcomponentA)
      )

d3.select('.something').datum(rows).call(someComplexComponent)
```

Is equivalent to

```javascript
function someComplexComponent(s) {
  s.call(subcomponentA)
      .call(subcomponentB)
      .call(subcomponentC)
      .call(subcomponentD)
      .call(subcomponentE)
}

d3.select('.something').datum(rows).call(someComplexComponent)
```

