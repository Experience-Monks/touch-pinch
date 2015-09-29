# touch-pinch

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A low-level utility for two-finger pinch and panning gestures.

## Install

```sh
npm install touch-pinch --save
```

## Example

The following example scales by the delta difference in a two-finger pinch gesture.

```js
var pinch = require('touch-pinch')

var scale = 1
pinch(window)
  .on('change', function (dist, prev) {
    scale += (dist - prev)
  })
```

## Usage

[![NPM](https://nodei.co/npm/touch-pinch.png)](https://www.npmjs.com/package/touch-pinch)

#### `pinch = touchPinch([target])`

Creates a new `pinch` emitter with the optional `target` element, which defaults to `window`.

### events

#### `pinch.on('start', fn)`

Called when the pinch event begins; i.e. when two fingers are active on screen.

Called with `fn(distance)`, which is the initial Euclidean distance between these two points.

#### `pinch.on('change', fn)`

Called when the pinch changes; i.e. one or both of the fingers in the pinch have moved.

Called with `fn(distance, prevDistance)`, where `distance` is the new Euclidean distance, and `prevDistance` is the last recorded distance. Often, you will use this delta to compute a new scale:

```js
scale += (distance - prevDistance)
```

#### `pinch.on('end', fn)`

Called when the pinch is finished; i.e. one or both of the active fingers have been lifted from the screen.

#### `pinch.on('place', fn)`

Called before the pinch has started, to indicate that a new finger has been placed on screen (with a maximum of two fingers). 

Called with `fn(newTouch, otherTouch)`, where `newTouch` is the new TouchEvent. `otherTouch` is the touch event that represents the other finger on screen, or `undefined` if none exists.

#### `pinch.on('lift', fn)`

Called before the pinch has ended, to indicate that a previoulsy pinching finger has been lifted. 

Called with `fn(removedTouch, otherTouch)`, where `removedTouch` is the TouchEvent that was removed from the screen. `otherTouch` is the touch event for the other finger on screen, or `undefined` if none exists.

### members

#### `pinch.pinching`

A read-only boolean; `true` only if the user is currently pinching (two fingers on screen).

#### `pinch.fingers`

An array of two elements, which are initially both `null` (representing "no finger"). The elements are the two possible fingers in a pinch event.

When a finger is present on screen, the element in the array will contain:

```js
{
  position: [x, y],  // the offset relative to target
  touch: TouchEvent  // the associated event
}
```

The order is maintained; so if you place a finger, then place a second, then remove the first finger, `pinch.fingers` will look like this:

```js
[ null, { position, touch } ]
```

### methods

#### `pinch.indexOfTouch(touchEvent)`

Returns the index of `touchEvent` within the `pinch.fingers` array. This can be used to determine

## License

MIT, see [LICENSE.md](http://github.com/Jam3/touch-pinch/blob/master/LICENSE.md) for details.
