var css = require('dom-css')

var pxSize = 50
var div = document.createElement('div')
document.body.appendChild(div)
css(div, {
  width: pxSize,
  height: pxSize,
  background: 'blue',
  position: 'absolute',
  left: (document.documentElement.clientWidth - pxSize) / 2,
  top: (document.documentElement.clientHeight - pxSize) / 2,
})

var pinch = require('./')(window)

var scale = 1

window.addEventListener('touchstart', function (ev) {
  ev.preventDefault() // no scrolling
})

pinch.on('start', function () {
  css(div, 'background', 'green')
})

pinch.on('end', function () {
  css(div, 'background', 'blue')
})

pinch.on('change', function (current, prev) {
  var delta = (current - prev) * 0.01
  scale += delta
  css(div, 'transform', 'scale(' + scale.toFixed(5) + ')')
})
