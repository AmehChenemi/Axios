const poemModel = require ('../poemModel/model.js')

const axios =require ('axios')

const extAPI = "https://jsonplaceholder.typicode.com/todos";

const externalData = async(req,res)=>{
    try{
   const response = await axios.get(extAPI);
   const extractedData = response.data;

   for(const externalObject of extractedData){
    const newPoem = new poemModel({
        title: externalObject.title,
        isCompleted : externalObject.completed

    })
    newPoem.save()
   }
   res.status(200).json({
    message: 'sent successfully',
    extractedData
   })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

const getAll = async (req,res)=>{
    try{
        const allPoem = await poemModel.find()

        if(!allPoem){
            res.status(404).json({
                message: "database is empty"
            })
        }else{
            res.status(200).json({
                message:"There are "+ allPoem.length + " poems in this database",
                allPoem
            })
        }
}catch(err){
    res.status(400).json("cannot get all")
    
}
}

const getOne = async(req,res)=>{
    try{
        const id = req.params.id
    const poemId = await poemModel.findById(id)
    if(!poemId){
        res.status(400).json({
            message : "unable to get poem"
        })
    }else{
        res.status(200).json({
            message:"succesfully fetched poem",
            poemId
        })
    }
}catch(err){
    res.json(err.message)
}
}
const update = async (req,res)=>{
    try{
const id = req.params.id
const data ={
    title : req.body.title,
    isCompleted:req.body.isCompleted
}

    const updatedPoem = await poemModel.findByIdAndUpdate(id,data,{new:true})
    if(!data){
        res.status(404).json({
            message:"cannot update poem"
        })
    }else{
        res.status(200).json({
            message: "poem has been updated successfully",
            updatedPoem
        })
    }

    }catch(err){
        res.json(err.message)
    }
}

const deletePoem = async(req,res)=>{
    try{
const id = req.params.id
const allpoem = await poemModel.find()
const deletedPoem = await poemModel.findByIdAndDelete(id)
res.status(200).json({
    message : 'deleted successfully',
    deletedPoem, allpoem
})
    }catch(err){
        res.json(err.message)
    }
}

module.exports ={
    externalData,
    getAll,
    getOne,
    update,
    deletePoem}
    