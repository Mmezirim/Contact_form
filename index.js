const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { isUtf8 } = require('buffer');
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
        const data = reg.body
        const add = JSON.parse(data);
        await fs.promises.writeFile('data.json', JSON.stringify(add, null, 4))
        res.status(200).send('Contact saved successfully')
    }catch(err){
        if(err){
        await fs.promises.writeFile('data.json', JSON.stringify([req.body], null, 4))
        res.status(200).send('Contact saved successfully')
        }else{
            res.status(400).json('Error saving data')
        }
        
    }
}) 
app.get('/contacts', (req, res)=>{
    res.render('contacts', {data})
})  

const port = 8080
app.listen(port, (req, res)=>{
    console.log(`Server running on port ${port}`)
});
