import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())

let list = []
app.use(cors())
app.get('/api/list', (req, res) => {
  res.json(list)
})

app.post('/api/delete', (req, res) => {
  const { id } = req.body
  list = list.filter((todo) => todo.id !== id)
  res.json(list)
})

app.post('/api/create', (req, res) => {
  const { name } = req.body
  const id = new Date().getTime()
  list.push({ id: id, name: name })
  res.json(list)
})

app.post('/api/update', (req, res) => {
  const { id, name } = req.body
  list = list.map((item) => (item.id === id ? { ...item, name } : item))
  res.json(list)
})

app.post('/api/update-list', (req, res) => {
  const { id } = req.body
  const showData = list.find((item) => item.id === id)
  res.json(showData)
})

app.listen(5000, () => {
  console.log(`Express server running at http://localhost:5000`)
})
