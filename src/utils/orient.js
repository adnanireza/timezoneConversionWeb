const Orient = Object.freeze({
  LEFT: Symbol("left"),
  RIGHT: Symbol("right")
});
const otherSide = orient =>
  orient === Orient.LEFT ? Orient.RIGHT : Orient.LEFT;

export { Orient, otherSide };
