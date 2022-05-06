const router = require("express").Router()
const Person = require('../models/Person')


// create - criacao de dados
router.post('/', async (req,res) => {
    // req.body
    const {name, salary, aprroved} = req.body
    if(!name){
        res.status(422).json({error: 'nome é obrigatório'})
        return
    }
    const person = {
        name, 
        salary, 
        aprroved,
    }
    // create mongosse
    try{
        // criando dados
        await Person.create(person)
        res.status(201).json({msg:"pessoa inserido no sistema com sucesso"})
    }catch(error){
        res.status(500).json({error: error})
    }
})


// reader = leitura e dado
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    }catch (error){
        res.status(500).json({msg:'Error eo entrar'})
    }
})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try{
        const person = await Person.findOne({_id: id})
    if (!person){
        res.status(422).json({msg: `id ${id} invalido`})
        return 
    }
        res.status(200).json(person)
    }catch (error){
        res.status(500).json({error: 'Error ao achar'})

    }

})

//  update - atualizar dados
router.patch('/:id', async(req,res) => {
    const id = req.params.id

    const {name, salary, aprroved} = req.body

    const person = {
        name,
        salary,
        aprroved
    }
    try{
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({msg: `id ${id} invalido`})
            return
        }
        res.status(200).json(person)

    }catch(error){error: 'errro ao atualizar'}
})

router.delete('/:id', async(rep,res) => {
    const id = req.params.id

        const person = await Person.findOne({_id: id})
        if (!person){
        res.status(422).json({msg: `id ${id} invalido`})
        return 
    }
    try{
        await Person.deleteOne({_id: id})
        res.status(200).json({msg:'user deletado com sucessoy'})
    }
    catch (error){
        res.status(500).json({error: 'Error ao achar id'})

    }7
    
})
module.exports = router

