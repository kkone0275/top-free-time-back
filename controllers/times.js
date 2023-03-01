import times from '../models/times.js'
export const createTime = async (req, res) => {
  try {
    console.log(req)
    const result = await times.create({
      name: req.body.name,
      u_id: req.user._id,
      date: req.body.date,
      hour: req.body.hour,
      description: req.body.description,
      sell: req.body.sell,
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
export const getSellTimes = async (req, res) => {
  try {
    const result = await times.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// 只有管理員看得到全部的
export const getAllTimes = async (req, res) => {
  try {
    const result = await times.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// 查單個
export const getTime = async (req, res) => {
  try {
    const result = await times.findById(req.params.id)
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
export const getUserTime = async (req, res) => {
  try {
    const result = await times.find({ u_id: req.user._id }).populate('u_id')
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
export const editTime = async (req, res) => {
  try {
    const result = await times.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      hour: req.body.hour,
      sell: req.body.sell,
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
