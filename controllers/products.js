import products from '../models/products.js'
export const createProduct = async (req, res) => {
  try {
    const imagePath = []
    if (req.files.images) {
      req.files.images.forEach((item) => {
        imagePath.push(item.path)
      })
    }
    console.log(req)
    const result = await products.create({
      name: req.body.name,
      price: req.body.price,
      math: req.body.math,
      place: req.body.place,
      u_id: req.user._id,
      date: req.body.date,
      description: req.body.description,
      image: req?.files.image[0].path || '',
      images: imagePath,
      sell: req.body.sell,
      genre: req.body.genre,
      category: req.body.category,
      volume: req.body.volume
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
// 前台看到的
export const getSellProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// 只有管理員看得到全部的
export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// 查單個
export const getProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
// 查使用者的
export const getUserProduct = async (req, res) => {
  try {
    const result = await products.find({ u_id: req.user._id }).populate('u_id')
    if (!result) {
      console.log('no')
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
// 改
export const editProduct = async (req, res) => {
  try {
    const mainImage = req?.files?.image ? req?.files?.image[0].path : req.body.image
    const imagePath = []

    if (req.files.images) {
      req.files.images.forEach((item) => {
        imagePath.push(item.path)
      })
    }
    const result = await products.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      math: req.body.math,
      place: req.body.place,
      description: req.body.description,
      date: req.body.date,
      image: mainImage,
      images: imagePath,
      sell: req.body.sell,
      genre: req.body.genre,
      category: req.body.category,
      volume: req.body.volume
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
