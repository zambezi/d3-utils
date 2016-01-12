define(
  []
, function() {
    return function matches(node, selector) {
      return (
         node.matches
      || node.matchesSelector 
      || node.webkitMatchesSelector 
      || node.mozMatchesSelector 
      || node.msMatchesSelector 
      || node.oMatchesSelector
      ).call(node, selector)
    }
  }
)
