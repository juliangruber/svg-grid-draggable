'use strict'

const component = require('microcomponent')
const html = require('bel')

module.exports = () => {
  const c = component({ pure: true })
  c.on('render', () => html`
    <g transform="translate(${c.props.x}, ${c.props.y})">
      ${c.props.el}
    </g>
  `)
  return c
}
