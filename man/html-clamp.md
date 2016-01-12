## clamp `d3-utils/html/clamp`

Clamp is a component that allows multi-line ellipsis renderering.

    +--------------------+
    |abcde feg hij   dkjd|
    |dsji jdia js ajid  s|
    |jdis ajid dheu d ...|/*Here it's overflowed, so "..." is shown. */
    +--------------------+

To use `clamp`, first create an instance of the component and configure the amount of lines you need:

    var clampTo2 = clamp().lines(2)

Then call it on your selection like any other standard D3 component.
For example, if the items you want to clamp to two lines have the class `clamp-2`, you can do:

    d3.select("#your-container")
      .selectAll(".clamp-2")
        .call(clampTo2)

The component will try to use the [`-webkit-line-clamp`](http://dropshado.ws/post/1015351370/webkit-line-clamp) property if available for a native solution.
If it is unavailable, it will fall back to a javascript solution that will split the lines "by hand".
The last of the lines will be a single line that uses the widely supported `text-overflow: ellipsis` property.
