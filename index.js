'use strict'

const component = require('microcomponent')
const html = require('bel')

module.exports = () => {
  const c = component({ pure: true })
  c.on('render', () => html`
    <g
      transform="translate(${c.props.x}, ${c.props.y})"
      onmousedown=${dragstart}
    >
      ${c.props.el}
    </g>
  `)
  let offsetX = 0
  let offsetY = 0
  let x = 0
  let y = 0
  const dragstart = ev => {
    offsetX = ev.offsetX - c.props.x
    offsetY = ev.offsetY - c.props.y
    c._element.removeAttribute('onmousedown')
    window.addEventListener('mouseup', dragend)
    window.addEventListener('mousemove', dragmove)
  }
  const dragend = ev => {
    window.removeEventListener('mouseup', dragend)
    window.removeEventListener('mousemove', dragmove)
    c.emit('render', Object.assign(c.props, { x, y }))
  }
  const dragmove = ev => {
    x = ev.offsetX - offsetX
    y = ev.offsetY - offsetY
    c._element.setAttribute('transform', `translate(${x}, ${y})`)
  }
  return c
}
