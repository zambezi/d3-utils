export function appendFromTemplate (template) {
  const div = document.createElement('div')

  div.innerHTML = template

  const prototype = div.firstChild

  return function append (d, i) {
    return this.appendChild(prototype.cloneNode(true))
  }
}
