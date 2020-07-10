import { Request, Response } from 'express'
import DB from '../../database'
import Post from '../../entities/Post'
// import posts from './_posts'

export async function get(req: Request, res: Response) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const posts = await DB.postRepo.findAll()
    const contents = posts.map((post: Post) => ({
        title: post.title, slug: post.slug
    }))

    res.end(JSON.stringify(contents));
}