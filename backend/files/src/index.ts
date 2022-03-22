import dotenv from 'dotenv'
import express from 'express'
import { join } from 'path'

dotenv.config()

const app = express()

app.use('/static', express.static(join(__dirname, process.env.CONTENT_VOLUME!)))

app.get('/ho', (_, res) => {
	res.send('ho')
})

const port = process.env.PORT || 7000
app.listen(port, () => {
	console.log(`file server is listening on port ${port}...`)
})
