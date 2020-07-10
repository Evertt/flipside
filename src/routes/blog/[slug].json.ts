import db from '../../firestore'
import { Request, Response } from 'express'

const postsRef = db.collection('posts')

export async function get(req: Request, res: Response, next: any) {
	const { slug } = req.params

	const snapshot = await postsRef
		.where('slug', '==', slug).get()

	if (!snapshot.empty) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Cache-Control': 's-maxage=1, stale-while-revalidate'
		})

		res.end(JSON.stringify(snapshot.docs[0].data()))
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		})

		res.end(JSON.stringify({
			message: `Not found`
		}))
	}
}
