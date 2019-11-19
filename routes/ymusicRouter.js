const {Router} = require('express')
const ymusicController = require('../controllers/ymusicController')

const router = Router()

router.get('/',ymusicController.index)
router.post('/search',ymusicController.search)

module.exports = router