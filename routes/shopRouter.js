const express = require('express')
const shopController = require('../controllers/shopController')

const router = express.Router()

router.post('/add',shopController.saveCourse)
router.post('/update',shopController.updateCourse)
router.get('/',shopController.index)
router.get('/add',shopController.addCourse)
router.get('/card',shopController.card)

router.get('/:id',shopController.course)
router.get('/:id/edit',shopController.editCourse)
router.get('/:id/card',shopController.addToCard)
router.get('/:id/card-delete',shopController.removeFromCard)





module.exports = router