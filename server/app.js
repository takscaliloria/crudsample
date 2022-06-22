const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');
const app = express();
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 5000

//add
app.post('/insert', (request, response) => {
    
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));

});

//update
app.patch('/update', (request,response) => {

    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name);

    result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});


//delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);

    result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));

});

//read
app.get('/getAll', (request,response) =>{

    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, ()=> console.log('app is running'));