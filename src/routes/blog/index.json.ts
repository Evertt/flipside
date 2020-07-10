import db from '../../firestore'
import { Request, Response } from 'express'

const postsRef = db.collection('posts')

export async function get(req: Request, res: Response) {
    const snapshot = await postsRef.get()
    const contents = snapshot.docs.reverse().map((post: any) => ({
        title: post.get('title'), slug: post.get('slug')
    }))

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=1, stale-while-revalidate'
    })

    res.end(JSON.stringify(contents));
}