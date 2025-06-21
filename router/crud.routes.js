const router = require('express').Router()
const CrudController = require('../controllers/crud.controller')
router.get('/',CrudController.showCreate)
router.post('/create',CrudController.insert)
router.get('/list',CrudController.list)
router.get('/edit/:id',CrudController.edit)
router.post('/update/:id',CrudController.update)
router.get('/delete/:id',CrudController.delete)
module.exports = router