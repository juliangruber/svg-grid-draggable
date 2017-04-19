'use strict'

const html = require('bel')
const Note = require('svg-midi-note')
const Grid = require('svg-midi-grid')

const note = Note()
const grid = new Grid()

const el = html`
  <svg width=400 height=200>
    ${grid.render({
      height: 201,
      width: 401,
      cellHeight: 10,
      cellWidth: 20
    })}
    ${note.render({
      height: 10,
      width: 20,
      velocity: 1,
      x: 80,
      y: 100
    })}
  </svg>
`

document.body.appendChild(el)
