import { Router } from 'express'
const notFoundRouter = Router()

notFoundRouter.use((req, res) => {
  res.status(404).send('Page not found')
})

export default notFoundRouter