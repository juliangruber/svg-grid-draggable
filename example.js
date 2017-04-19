'use strict'

const html = require('bel')
const Note = require('svg-midi-note')
const Grid = require('svg-midi-grid')
const Draggable = require('.')

const note = Note()
const draggable = Draggable()
const grid = new Grid()

const el = html`
  <svg width=400 height=200>
    ${grid.render({
      height: 201,
      width: 401,
      cellHeight: 10,
      cellWidth: 20
    })}
    ${draggable.render({
      x: 80,
      y: 100,
      el: note.render({
        height: 10,
        width: 20,
        velocity: 1
      })
    })}
  </svg>
`

document.body.appendChild(el)
