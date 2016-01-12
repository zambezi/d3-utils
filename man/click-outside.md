## `d3-utils/events/click-outside`

Will dispatch one or more `clickoutside` event when an element is clicked and the element is not contained in one or more elements provided in the selection.

    s.call(clickOutside()
        .on('clickoutside', onClickOutside)
    )
