'use strict'

const component = require('microcomponent')
const html = require('bel')

module.exports = () => {
  const c = component({
    pure: true,
    state: {
      x: 0,
      y: 0
    }
  })
  c.on(
    'render',
    () => html`
    <g
      transform="translate(${c.props.x}, ${c.props.y})"
      onmousedown=${dragstart}
    >
      ${c.props.el}
    </g>
  `
  )
  let offsetX = 0
  let offsetY = 0
  const dragstart = ev => {
    offsetX = ev.offsetX - c.props.x
    offsetY = ev.offsetY - c.props.y
    c._element.removeAttribute('onmousedown')
    window.addEventListener('mouseup', dragend)
    window.addEventListener('mousemove', dragmove)
    c.props.onstart()
  }
  const dragend = ev => {
    window.removeEventListener('mouseup', dragend)
    window.removeEventListener('mousemove', dragmove)
    c.emit(
      'render',
      Object.assign(c.props, {
        x: c.state.x,
        y: c.state.y
      })
    )
    c.props.onend(c.state.x, c.state.y)
  }
  const dragmove = ev => {
    const prev = {
      x: c.state.x,
      y: c.state.y
    }
    c.state.x = Math.round((ev.offsetX - offsetX) / c.props.cellWidth) *
      c.props.cellWidth
    c.state.y = Math.round((ev.offsetY - offsetY) / c.props.cellHeight) *
      c.props.cellHeight
    if (c.state.x === prev.x && c.state.y === prev.y) return
    c._element.setAttribute(
      'transform',
      `translate(${c.state.x}, ${c.state.y})`
    )
    c.props.onmove(c.state.x, c.state.y)
  }
  return c
}
