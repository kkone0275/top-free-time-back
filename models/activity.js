import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  images: {
    type: [String]
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  },
  category: {
    type: String,
    required: [true, '缺少地區'],
    enum: {
      values: ['台北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('products', schema)
