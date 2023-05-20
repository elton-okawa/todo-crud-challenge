import { Exclude, Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class Entity {
  // class-transform seems to create a different ObjectId each serialization
  // https://github.com/typestack/class-transformer/issues/494#issuecomment-712707954
  @Exclude({ toPlainOnly: true })
  @Transform(({ obj }) => obj._id)
  _id!: ObjectId;

  @Expose({ toPlainOnly: true })
  get id(): string {
    return this._id.toString();
  }
}
