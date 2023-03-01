import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  me: {
    type: String,
    required: [true, '缺少提議']
  },
  land: {
    type: String,
    required: [true, '缺少地點']
  },
  detailed: {
    type: String,
    required: [true, '缺少描述']
  },
  oneimage: {
    type: String
  },
  sell: {
    type: Boolean,
    default: true
  },
  u_id: {
    type: ObjectId,
    ref: 'users'
  }
}, { versionKey: false })

export default model('invites', schema)
