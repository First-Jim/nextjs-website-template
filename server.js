const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')
const morgan = require('morgan')
const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const env = process.env.NODE_ENV
const dev = env !== 'production'

const devProxy = {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}

;(async () => {
  await app.prepare()
  const server = express()
  if (dev && devProxy) {
    Object.keys(devProxy).forEach(function (ctx) {
      server.use(createProxyMiddleware(ctx, devProxy[ctx]))
    })
  }

  server.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  )

  server.get('*', (req, res) => handle(req, res))
  server.listen(port)
  console.info(`> started server on http://localhost:${port}`)
})()
