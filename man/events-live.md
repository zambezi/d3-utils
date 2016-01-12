## `d3-utils/events/live`

Is a component that allows you to subscribe to bubbling events from nested elements which match a particular selector.
The elements don't need to be present at the time of subscription.

    var dispatch = live('click', 'mouseover').selector('p.magic')

    dispatch.on('click', onMagicParagraphClick)

    target = d3.select('div.top-level-somewhere').call(dispatch)

    function onMagicParagraphClick(d, i) {
      // `this` here is the <p class="magic"> element
      // `d` is the datum bound to the paragraph element.
    }

This works similarly to `jQuery`'s  `live` operator.
But in the D3 spirit, your handler will be called with the `this` set to the DOM element which matches your selector and the `d` argument will be the datum bound to it.
