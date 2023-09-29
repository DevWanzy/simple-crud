const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const { requireAuth } = require('../middlewares/authMiddleware')

router.post('/', requireAuth, itemController.createItem)

router.get('/', itemController.getItems)

router.put('/:id', requireAuth, itemController.updateItem)
router.get('/:id', requireAuth, itemController.getOneItem)

router.delete('/:id', requireAuth, itemController.deleteItem)
router.get('/search', requireAuth, itemController.deleteItem)

// router.get('/search', requireAuth, itemController.search)
module.exports = router
