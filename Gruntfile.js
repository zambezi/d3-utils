module.exports = function(grunt) {
  grunt.initConfig(
    {
      build: {
        options: {
          include: [
            "append-from-template"
          , "append-if-missing"
          , "call"
          , "class-from"
          , "component/redraw"
          , "component/resize"
          , "datum"
          , "dispatch-custom-event"
          , "each"
          , "events/click-outside"
          , "events/dispatch"
          , "events/from-detail"
          , "events/from-target"
          , "events/key-code-handler"
          , "events/live"
          , "events/redispatch"
          , "events/stop-propagation"
          , "events/prevent-default"
          , "formatters/empty-if"
          , "formatters/empty-if-undefined"
          , "geom/cartesian-to-radial"
          , "geom/radial-to-cartesian"
          , "html/clamp"
          , "html/paragraphs"
          , "html/safe-update-input-value"
          , "html/simple-keyboard-input-behaviour"
          , "matches-selector"
          , "range/nice"
          , "range/scale"
          , "range/scale-nice"
          , "rebind"
          , "select"
          , "selection/changed"
          , "selection/notify-remove"
          , "green-thread-trampoline"
          , "set-content-if-missing"
          , "set-content-if-empty"
          , "svg/from-translate"
          , "svg/radial-tween"
          , "svg/symbol"
          , "svg/translate"
          , "text"
          , "text-if-changed"
          , "throttle"
          , "transitions/per-index-delay"
          ]
        }
      }
    }
  )

  grunt.registerTask('default', ['build']);
  grunt.registerTask('ci-build', ['build']);
}
