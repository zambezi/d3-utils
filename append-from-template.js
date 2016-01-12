define(
  [ "text" ]
, function(text) {

    function appendFromTemplate(template) {
      var div = document.createElement('div')
        , prototype

      div.innerHTML = template
      prototype = div.firstChild

      return function(d, i) {
        return this.appendChild(prototype.cloneNode(true))
      }
    }

    appendFromTemplate.load = function (name, req, onload, config) {

      if (config.isBuild) {
        text.load(name, req, onload, config)
        return
      }

      require(['text!' + name], function(template) {
        onload(appendFromTemplate(template))
      })
    }

    appendFromTemplate.write = function (pluginName, moduleName, write, config) {
      text.write("text", moduleName, write, config)
    }

    return appendFromTemplate
  }
)
