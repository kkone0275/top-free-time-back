import invites from '../models/invites.js'

export const createInvite = async (req, res) => {
  try {
    const result = await invites.create({
      me: req.body.me,
      land: req.body.land,
      sell: req.body.sell,
      detailed: req.body.detailed,
      oneimage: req?.files.image[0].path || ''
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
export const getSellInvites = async (req, res) => {
  try {
    const result = await invites.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// // 只有管理員看得到全部的
export const getAllInvites = async (req, res) => {
  try {
    const result = await invites.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
// // 查單個
export const getInvite = async (req, res) => {
  try {
    const result = await invites.findById(req.params.id)
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
// // 查使用者的
export const getUserInvite = async (req, res) => {
  try {
    const result = await invites.find({ u_id: req.user._id }).populate('u_id')
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
// // 改
export const editInvite = async (req, res) => {
  try {
    const result = await invites.findByIdAndUpdate(req.params.id, {
      me: req.body.me,
      land: req.body.land,
      sell: req.body.sell,
      oneimage: req.body.oneimage,
      detailed: req.body.detailed
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
