const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const {getPatients, getFiles, getVisit, chartNotes} = require('./controller')

//___________ENDPOINTS___________
app.get('/api/getAllPatients', getPatients)
app.get('/api/history/:id', getFiles)
app.get('/api/getVisit', getVisit)
app.post('/api/history', chartNotes)



// app.delete('api/history/notes', deleteNotes)


//______________LISTEN_____________
app.listen(4000, () => console.log('Port 4000 operational'))
