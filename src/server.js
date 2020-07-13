import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import { initStore } from './store/cookie'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const app = polka() // You can also use Express
app
	.use(
		(req, res, next) => {
			initStore(req, res)
			next()
		},
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})

export default app
