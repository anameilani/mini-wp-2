const router= require('express').Router()
const articleController= require('../controllers/article')
const authenticate= require('../middlewares/authentication')
const authorize= require('../middlewares/authorization')
const {sendUploadToGCS, multer} = require('../helpers/image')

router.use(authenticate)
router.get('/status/:status', articleController.getStatus)
router.get('/', articleController.getAll)
router.get('/:id', authorize, articleController.getOne)
router.get('/search/by/tag', articleController.searchByTag)
router.post('/:status', multer.single('thumbnail'), sendUploadToGCS, articleController.create)
router.put('/:id/:status', multer.single('thumbnail'), sendUploadToGCS, articleController.updatePut)
router.patch('/:id', authorize, articleController.updatePatch)
router.delete('/:id', authorize, articleController.delete)

module.exports= router