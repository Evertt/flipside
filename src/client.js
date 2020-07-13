import * as sapper from '@sapper/app'
import { initStore } from './store/cookie'

initStore()

sapper.start({
	target: document.body
})

sapper.prefetchRoutes()