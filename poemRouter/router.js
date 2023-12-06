const express = require('express')
const router = express.Router()

const {externalData, getAll,getOne,update,deletePoem}=require ("../poemController/controller.js")

router.get('/externaldata',externalData)
router.get('/getallpoem',getAll)
router.get('/getonepoem/:id',getOne)
router.put('/update/:id',update)
router.delete('/delete/:id',deletePoem)



module.exports = router