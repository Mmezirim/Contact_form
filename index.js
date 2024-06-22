const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index')
})
app.post('/newContact', async(req, res)=>{
    try{
        const data = await fs.promises.readFile('data.json')
        const add = JSON.parse(data);
        await fs.promises.writeFile('data.json', JSON.stringify([req.body], null))
        res.status(200).send('Contact saved successfully')
    }catch(err){

    }
})

const port = 8080
app.listen(port, (req, res)=>{
    console.log(`Server running on port ${port}`)
});
