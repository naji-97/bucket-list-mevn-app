const express = require('express')
const app = express()
const mongoose  =require('mongoose')
const {PORT, mongoUri} = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path= require('path')

app.use(cors())
app.use(morgan('tiny'))

// Use BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

require('dotenv').config() 

//Connetc Mongoose
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('MongoDB database Connected...'))
.catch((err)=>console.log(err))

// Routes
app.use('/api/bucketListItems', bucketListItemRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}


app.listen(PORT, ()=> console.log(`App listning at http://localhost:${PORT}`))