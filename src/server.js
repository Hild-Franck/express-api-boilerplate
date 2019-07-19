import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import logger from './logger'
import errorHandler from './middlewares/errorHandler'

const port = process.env.PORT || 9000
const logType = process.env.NODE_ENV === "production" ? "tiny" : "dev"

const app = express()

app.use(morgan(logType, { stream: logger.stream }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(errorHandler)

const server = {
	start: () => app.listen(port, () => logger.info(
		`Server listening on port ${port}`,
		{ label: 'server' }
	))
}

export default server
// Exposing app mainly for test purpose, but it can always become handy
export { app }