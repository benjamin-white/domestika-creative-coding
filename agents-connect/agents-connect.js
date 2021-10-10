const setCanvas = canvas => {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const circle = (cx, cy, radius) => {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.lineWidth = radius * .1
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Vec2 {
  constructor({x, y}) {
    this.x = x
    this.y = y
  }
  getDistance(to) {
    const dx = this.x - to.x
    const dy = this.y - to.y
    return Math.sqrt(dx * dx + dy * dy)
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
    this.vel.x = (getRandomIntInclusive(0, 4) -2) * .1
    this.vel.y = (getRandomIntInclusive(0, 4) -2) * .1
    this.acc.x += this.vel.x
    this.acc.y += this.vel.y
    this._boundsCheck()
    this._dampen()
    this.pos.x += this.acc.x
    this.pos.y += this.acc.y
  }

  _boundsCheck() {

    if (this.pos.x <= 50 && this.acc.x <= 0 || this.pos.x >= canvas.width - 50 && this.acc.x >= 0) 
      this.acc.x = this.acc.x * -1 + .8

    if (this.pos.y <= 50 && this.acc.y <= 0 || this.pos.y >= canvas.height - 50 && this.acc.y >= 0)
      this.acc.y = this.acc.y * -1 + .8

  }

  _dampen() {
    if (Math.abs(this.acc.x) > 3) this.acc.x = .2
    if (Math.abs(this.acc.y) > 3) this.acc.y = .2
  }

}

const reMap     = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2
const getRand   = () => [Math.random(), 0, .9]
const canvas    = document.querySelector('canvas')
const ctx       = canvas.getContext('2d', { alpha: false })
const bgCol     = 'pink'
const fgCol     = '#fff'
const drawTotal = 2000
const trail     = false
const proximity = true
let drawCount   = 0

setCanvas(canvas)
ctx.fillStyle = bgCol
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle   = fgCol
ctx.strokeStyle = '#282727'

const agents = [...Array(40)].map(n => {
  const x      = getRandomIntInclusive(50, canvas.width - 50) 
  const y      = getRandomIntInclusive(50, canvas.height - 50) 
  const radius = reMap(...getRand(), 3, 10)
  return new Agent({x: x, y: y, radius: radius})
})

const animate = () => {
  if (!trail) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  for (let i = 0; i < agents.length; i++) {
    const current = agents[i]
    current.update()
    circle(current.pos.x, current.pos.y, current.radius)
    for (let j = i + 1; j < agents.length; j++) {
      const otherAgent = agents[j]
      if (proximity && current.pos.getDistance(otherAgent.pos) > 300) continue;
      ctx.lineWidth = reMap(current.pos.getDistance(otherAgent.pos), 0, 200, 6, 3);
      ctx.beginPath()
      ctx.moveTo(current.pos.x, current.pos.y)
      ctx.lineTo(otherAgent.pos.x, otherAgent.pos.y)
      ctx.stroke()
    }
  }
  drawCount++
  if (drawCount < drawTotal) {
    requestAnimationFrame(animate)
  }
}

animate()