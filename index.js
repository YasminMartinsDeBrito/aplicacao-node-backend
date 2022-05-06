// mongodb+srv://YasminMartins:phoneky123@apicluster.atjp4.mongodb.net/bancodaapi?retryWrites=true&w=majority
//  comecei 1:15
require('dotenv').config()

// configuração inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
    )
    app.use(express.json())
    
    // rotas da API
    const personRoutes = require('./routes/personRoutes')
    app.use('/person', personRoutes)
    
    // rota inicial/ endpoint
app.get('/', (req,res) => {

    res.json({message: 'Oi express'})
})

// entregar porta ao express
const USER = process.env.USER
const PASSWORD = encodeURIComponent(process.env.PASSWORD)
mongoose
    .connect(`mongodb+srv://${USER}:${PASSWORD}@apicluster.atjp4.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log('conectamos com o mongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

