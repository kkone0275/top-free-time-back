import { Router } from 'express'
import content from '../middleware/content.js'
// import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createInvite, getAllInvites, getInvite, getSellInvites, getUserInvite } from '../controllers/invites.js'

const router = Router()

// multipart/form-data上傳型態 -> jwt驗證 -> 驗證是否為管理員 -> 上傳 -> 新增商品
router.post('/', content('multipart/form-data'), jwt, upload, createInvite)
router.get('/', getSellInvites) // 取上架商品
router.get('/all', jwt, getAllInvites) // 取所有商品，管理員用
router.get('/user', jwt, getUserInvite) // 取單個商品
router.get('/:id', getInvite) // 取單個商品
// router.patch('/:id', content('multipart/form-data'), jwt, upload, editInvite) // 編輯商品
// admin,

export default router
