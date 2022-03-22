import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()

app.use('/static', express.static(process.env.CONTENT_VOLUME!))

app.get('/ho', (_, res) => {
	res.send('ho')
})

const port = process.env.PORT || 7000
app.listen(port, () => {
	console.log(`file server is listening on port ${port}...`)
})
