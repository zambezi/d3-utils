## `d3-utils/set-content-if-missing`

Will set the HTML content of a node if it doesn't contain something that matches the provided selector.
Note that whatever was in the node before will be replaced with the snippet contents.

    s.call(setContentIfMissing('<h1 class="title">OK</h1>', '.title'))
