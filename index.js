// mongodb+srv://YasminMartins:phoneky123@apicluster.atjp4.mongodb.net/bancodaapi?retryWrites=true&w=majority

const USER = 'YasminMartins'
const PASSWORD = encodeURIComponent('phoneky123')

// configuração inicial

const express = require('express')
const mongoose = require('mongoose')
const app = express()


const Person = require('./models/Person')

// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da api
app.post('/person', async (req,res) => {
    // req.body
    const {name, salary, aprroved} = req.body

    if(!name){
        res.status(422).json({error: 'nome é obrigatório'})
    }
    const person = {
        name, 
        salary, 
        approved,
    }

    // create mongosse
    try{
        // criando dados
        await Person.create(person)

        restart.status(201).json({msg:"pessoa inserido no sistema com sucesso"})

    }catch(error){
        res.status(500).json({error: error})
    }
})
// rota inicial/ endpoint
app.get('/', (req,res) => {

    res.json({message: 'Oi express'})
})

// entregar porta ao express
mongoose
    .connect(`mongodb+srv://${USER}:${PASSWORD}@apicluster.atjp4.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('conectamos com o mongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

