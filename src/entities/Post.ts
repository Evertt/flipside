import { slugify } from '../utils'
import { ObjectID } from 'mongodb'
import { Entity, MongoEntity, PrimaryKey, Property, SerializedPrimaryKey } from 'mikro-orm'

@Entity({collection: 'posts'})
export default class Post implements MongoEntity<Post> {
  @PrimaryKey({type: 'ObjectId'})
  _id!: ObjectID;

  @SerializedPrimaryKey({type: 'string'})
  id!: string;

  @Property({type: 'string'})
  slug!: string;

  @Property({type: 'string'})
  title!: string;

  @Property({type: 'string'})
  html!: string;

  constructor(title: string, html: string) {
    this.title = title;
    this.slug = slugify(title)
    this.html = html;
  }
}
