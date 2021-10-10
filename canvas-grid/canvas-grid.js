const setCanvas = canvas => {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const canvas = document.querySelector('canvas')
setCanvas(canvas)

const drawRect = ({ x, y, width, height }, context) => {
  context.lineWidth = Math.random() * 10;
  context.beginPath()
  context.rect(x, y, width, height)
  context.stroke()
  if (Math.pow(Math.random(), 2) > .5) {
    context.fill()
    context.lineWidth = 2
    context.beginPath()
    context.arc(x + width * .5, y + height * .5, width * .5 - Math.random() * 10, 0, Math.PI * 2)
    context.stroke()
    context.fillStyle = '#000'
    context.fill()
    return
  }
  if (Math.pow(Math.random(), 2) < .2) {
    context.beginPath()
    context.arc(x + width * .5, y + height * .5, width * .5 - GUTTERSIZE * 2 - Math.random() * 10, 0, Math.PI * 2)
    context.fill()
  }
  if (context.lineWidth < 2) {
    context.beginPath()
    context.rect(x - 4, y - 4, width + 8, height + 8)
    context.stroke()
  }
}

const ctx        = canvas.getContext('2d')
const GRIDCOUNT  = 5
const GUTTERSIZE = 20
const GRIDSIZE   = (canvas.width - GUTTERSIZE) / 7 - GUTTERSIZE

ctx.strokeStyle = '#fff'

for (let i = 1; i <= GRIDCOUNT; i++) {
  for (let j = 1; j <= GRIDCOUNT; j++) {

    ctx.fillStyle = '#fff'

    drawRect({
      x: GUTTERSIZE + (GRIDSIZE + GUTTERSIZE) * i,
      y: GUTTERSIZE + (GRIDSIZE + GUTTERSIZE) * j,
      width: GRIDSIZE,
      height: GRIDSIZE
    }, ctx);

  }
}