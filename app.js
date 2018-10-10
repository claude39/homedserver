const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())

mongoose.connect('mongodb://admin:admin123@ds153123.mlab.com:53123/homed', { useNewUrlParser: true })

mongoose.connection.once('open', () => {
    console.log('connected to https://mlab.com/')
})

app.use('/homed', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(port, () => { console.log(`server is live at http://localhost:${port}`) })