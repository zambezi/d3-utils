## `d3-utils/set-content-if-empty`

Will set the HTML content of the node if it is empty. Otherwise, it will leave it alone.
Note that whatever was in the node before will be replaced with the snippet contents.

    s.call(setContentIfEmpty('<h1 class="title">OK</h1>'))
