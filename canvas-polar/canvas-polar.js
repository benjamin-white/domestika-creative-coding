const setCanvas = canvas => {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const degToRad = degrees => degrees / 180 * Math.PI
const reMap    = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2
const getRand  = () => [Math.random(), 0, .9]
const canvas   = document.querySelector('canvas')
const ctx      = canvas.getContext('2d')
setCanvas(canvas)

let originX  = canvas.width * .5
let originY  = canvas.height * .5
let width    = canvas.width * .02
let height   = canvas.height * .2
const turns  = 36
const radius = canvas.width * .3

ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = '#000'

const drawSpoke = (angle) => {

  ctx.save()
  ctx.translate(
    originX + radius * Math.sin(angle), 
    originY + radius * Math.cos(angle)
  )
  ctx.rotate(-angle)
  ctx.scale(
    reMap(...getRand(), .2, 1.2),
    reMap(...getRand(), .5, 1)
  )
  ctx.fillRect(
    -width * .5,
    reMap(...getRand(), .5, -height * .5),
    width, 
    height
  )
  ctx.restore()

}

const drawArc = (angle, slice) => {

  ctx.lineWidth = reMap(...getRand(), 5, 20)
  ctx.save()
  ctx.translate(originX, originY)
  ctx.rotate(-angle)
  ctx.beginPath()
  ctx.arc(
    0, 
    0, 
    radius * reMap(...getRand(), .7, 1.3), 
    slice * reMap(...getRand(), 1, -8), 
    slice * reMap(...getRand(), 1, 5)
  )
  ctx.stroke()
  ctx.restore()

}

for (let i = 0; i < turns; i++) {
  
  const slice = degToRad(360 / turns)
  const angle = slice * i
  
  drawSpoke(angle)
  drawArc(angle, slice)

}