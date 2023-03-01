import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  math: {
    type: Number
    // min: [0, '人數錯誤'],
    // required: [true, '缺少人數']
  },
  price: {
    type: Number
    // min: [0, '價格錯誤'],
    // required: [true, '缺少價格']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  place: {
    type: String,
    required: [true, '缺少地點']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  images: {
    type: [String],
    default: []
  },
  date: {
    type: String,
    required: [true, '缺少日期']
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
  genre: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['運動', '聊天', '吃飯', '散步', '唱歌', '活動', '露營', '旅行', '閱讀'],
      message: '分類錯誤'
    }
  },
  u_id: {
    type: ObjectId,
    ref: 'users'
  }
}, { versionKey: false })

export default model('products', schema)
