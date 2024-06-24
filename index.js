const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const { isUtf8 } = require('buffer');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const contacts = require('./contacts.json');

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/newCotact', async (req, res) => {
  try {
    const newContact = req.body;
    const existingData = await fs.promises.readFile('./contacts.json', isUtf8);
    const data = JSON.parse(existingData);
    data.array = data.array || []
    data.array.push(newContact)
    await fs.promises.writeFile('./contacts.json', JSON.stringify(data, null, 2));
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Error saving contact' });
  }
});

app.post('/newContact', async (req, res) => {
  try {
    const newContact = req.body;
    const filePath = contacts.join(__dirname, 'contacts.json');
    const existingData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(existingData);
    data.array = data.array || [];
    data.array.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newContact);
  } catch (err) {
    if (err.code === 'ENOENT'){
      await fs.writeFile('contacts.json', JSON.stringify([req.body], null, 2));
      res.status(200).json('Data saved')
    }else{
      console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Error saving contact' });
    }    
  }
});

app.get('/contacts', (req, res)=>{
    res.render('contacts', { contacts })
})  

const port = 8080
app.listen(port, (req, res)=>{
    console.log(`Server running on port ${port}`)
});
 