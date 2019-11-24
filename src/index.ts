import express = require('express')
import { MetricsHandler } from './metrics'

const app = express()
const path = require('path');
const port: string = '8080'

app.use(express.static(path.join(__dirname, '../public')))

app.set('views', __dirname + "./../views")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})