require('dotenv').config({ path: '../.env' })

const express = require('express')
const cors = require('cors')
const lfgActions = require('../lfg/lfg.js')

const app = express()

app.use(cors({
    origin: /(http:\/\/)?localhost:[0-9]{4}.*/,
    optionsSuccessStatus: 200
}))

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/getGames', (req, res) => {
    lfgActions.getGames()
        .then(games => {
            res.json(games)
        })
})

app.post('/addGame', (req, res) => {
    lfgActions.addGame(req.body.name, '10')
        .then(() => {
            res.json({
                success: true
            })
            
            return
        })
        .catch(err => {
            res.json({
                error: err
            })
            
            return
        })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})