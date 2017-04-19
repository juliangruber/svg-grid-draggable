'use strict'

const html = require('bel')
const Note = require('svg-midi-note')
const Grid = require('svg-midi-grid')
const Draggable = require('.')

const note = Note()
const draggable = Draggable()
const grid = new Grid()

const cellHeight = 10
const cellWidth = 20

const onstart = () => console.log('on start')
const onmove = () => console.log('on move')
const onend = (x, y) => console.log(`on end (${x}, ${y})`)

const el = html`
  <svg width=400 height=200>
    ${grid.render({
      height: 201,
      width: 401,
      cellHeight,
      cellWidth
    })}
    ${draggable.render({
      x: 80,
      y: 100,
      cellHeight,
      cellWidth,
      onstart,
      onmove,
      onend,
      el: note.render({
        height: cellHeight,
        width: cellWidth,
        velocity: 1
      })
    })}
  </svg>
`

document.body.appendChild(el)
