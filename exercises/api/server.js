const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name, router) =>  {
  const assetPath = path.join(__dirname, 'assets', name)

  return new Promise((resolve, reject) => {
    fs.stat(assetPath, (err, stats) => {
      if (!err) {
        fs.readFile(assetPath, {encoding: 'utf-8'}, (err, data) => resolve(data))
      } else 
        resolve(null)
    })
  })
  // return fs.stat(assetPath, (err, stats) => {
  //   if (!err) {
  //     fs.readFile(assetPath, {encoding: 'utf-8'}, (err, data) => router(data))
  //   } else 
  //     return router(null)
  // })
}

const hostname = '127.0.0.1'
const port = 3000

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname

  let assetRequested =  (route === '/') ? 'index.html' : route

  logRequest(method, route, '')
  
  const router = (asset) => {
    if (asset) {
      res.writeHead(200, {'Content-Type': mime.getType(assetRequested)})
      res.write(asset)
      res.end()
      console.log('200')
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.end()
      console.log('404')
    }
  }

  router(await findAsset(assetRequested))

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
