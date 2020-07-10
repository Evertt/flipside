import DB from '../../database'
import { Request, Response } from 'express'

export async function get(req: Request, res: Response, next: any) {
	const { slug } = req.params

	const post = await DB.postRepo.findOne({slug})

	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})

		res.end(JSON.stringify(post))
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		})

		res.end(JSON.stringify({
			message: `Not found`
		}))
	}
}
