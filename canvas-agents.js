const setCanvas = canvas => {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const circle = (cx, cy, radius) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.lineWidth = radius * .2
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

class Vec2 {
  constructor({x, y}) {
    this.x = x
    this.y = y
  }
}

class Agent {

  constructor({x, y, radius}) {
    this.pos    = new Vec2({x: x, y: y})
    this.vel    = new Vec2({x: 0, y: 0})
    this.acc    = new Vec2({x: 0, y: 0})
    this.radius = radius
  }

  update() {
    this.vel.x = reMap(...getRand(), -.03, .03)
    this.vel.y = reMap(...getRand(), -.03, .03)
    this.acc.x += this.vel.x
    this.acc.y += this.vel.y
    this.pos.x += this.acc.x
    this.pos.y += this.acc.y
    if (this.pos.x < 0) this.pos.x = canvas.width
    if (this.pos.x > canvas.width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = canvas.height
    if (this.pos.y > canvas.height) this.pos.y = 0
  }

}

const reMap     = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2
const getRand   = () => [Math.random(), 0, .9]
const canvas    = document.querySelector('canvas')
const ctx       = canvas.getContext('2d', { alpha: false })
const bgCol     = '#ed9435'
const fgCol     = '#fff'
const drawTotal = 500
const trail     = true
let drawCount   = 0

setCanvas(canvas)
ctx.fillStyle = bgCol
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle   = fgCol
ctx.strokeStyle = '#282727'

const agents = [...Array(100)].map(n => {
  const x      = reMap(...getRand(), 0, canvas.width)
  const y      = reMap(...getRand(), 0, canvas.height)
  const radius = reMap(...getRand(), 3, 10)
  return new Agent({x: x, y: y, radius: radius})
})

const animate = () => {
  if (!trail) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  agents.forEach(agent => {
    agent.update()
    circle(agent.pos.x, agent.pos.y, agent.radius)
  })
  drawCount++
  if (drawCount < drawTotal) {
    requestAnimationFrame(animate)

  }
}

animate()