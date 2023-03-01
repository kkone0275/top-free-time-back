import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  date: {
    type: String,
    required: [true, '缺少日期']
  },
  hour: {
    type: String,
    required: false
  },
  sell: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['台北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市'],
      message: '分類錯誤'
    }
  },
  u_id: {
    type: ObjectId,
    ref: 'users'
  }
}, { versionKey: false })

export default model('times', schema)
