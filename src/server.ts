import express = require('express')
import { MetricsHandler } from './metrics'

const app = express()
const path = require('path');
const bodyparser = require('body-parser');
const port: string = '8080'
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.set('views', __dirname + "./../views")
app.set('view engine', 'ejs');


//ADD ONE

app.post('/metrics/:id', (req: any, res: any) => {

  dbMet.save(req.params.id, req.body, (err: Error | null, result?: any) => {
    if (err) throw err
    res.status(200).send()
  })

})

//GET ONE

app.get('/metric/:id', (req: any, res: any) => {

 dbMet.have_one(req.params.id,(err: Error | null, result?: any) => {
    if (err) throw err
    res.write('Get one')
    res.end()
   })

})

//GET ALL

app.get('/metrics/all', (req: any, res: any) => {

 dbMet.have_all((err: Error | null, result?: any) => {
    if (err) throw err
    res.write('Get all')
    res.end()
   })

})

//SUPRESS ONE 

app.get('/del/:id', (req: any, res: any) => {

 dbMet.suppress_one(req.params.id,(err: Error | null, result?: any) => {
    if (err) throw err
    res.write('Get all')
    res.end()
   })
})

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