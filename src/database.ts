import Post from './entities/Post'
import { MikroORM, EntityManager, EntityRepository } from 'mikro-orm'

const debug = process.env.NODE_ENV === 'development'

const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    postRepo: EntityRepository<Post>,
}

(async () => {
  DI.orm = await MikroORM.init({
    entities: [Post],
    entitiesDirsTs: ['./src/entities'],
    dbName: 'flipside',
    type: 'mongo',
    logger: console.log.bind(console),
    debug, discovery: {
      disableDynamicFileAccess: true
    }
  })
  DI.em = DI.orm.em
  DI.postRepo = DI.orm.em.getRepository(Post)
})()

export default DI