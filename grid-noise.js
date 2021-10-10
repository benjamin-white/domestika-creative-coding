const setCanvas = canvas => {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const canvas = document.querySelector('canvas')
const ctx    = canvas.getContext('2d', { alpha: false })
setCanvas(canvas)

const bgCol   = '#fff'
const fgCol   = '#000'
const cols    = 10
const rows    = 10
const cells   = cols * rows
const gridW   = canvas.width * .8
const gridH   = canvas.height * .8
const cellW   = gridW / cols
const cellH   = gridH / rows
const marginX = (canvas.width - gridW) * .5
const marginY = (canvas.height - gridH) * .5
ctx.lineWidth = 4

ctx.fillStyle = bgCol
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = fgCol

for (let i = 0; i < cells; i++) {
  const col = i % cols
  const row = Math.floor(i / cols)
  const x   = col * cellW
  const y   = row * cellH
  const w   = cellW * .8
  const h   = cellH * .8
  ctx.save()
  ctx.translate(x + marginX , y + marginY)
  ctx.translate(cellW * .5, cellH * .5)
  ctx.rotate(Math.PI * 2 * i * Math.random())
  ctx.scale(Math.random() + 1, Math.random() + 1)
  ctx.beginPath()
  ctx.moveTo(w * -.5, 0)
  ctx.lineTo(w * .5, 0)
  ctx.stroke()
  ctx.restore()
}