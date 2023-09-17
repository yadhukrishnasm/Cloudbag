const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path')
const gramma = require("gramma");
const { log } = require('console');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render("grammer");
});

app.post('/grammacheck',(req,res)=>{
    const {para} = req.body;
    numWord = `${para}`.trim().split(/\s+/);

    gramma.check(`${para}`).then((data)=>{

        let result = data.matches.map((item) =>(
        {
           'message':item.message,
            'sentence':item.sentence,
            'word':item.word
        })); 
   

        res.status(200).json({Result:result,numWord:numWord});
    }).catch((error) => {
        console.error('error checking grammer:',error);
        res.status(500).send('<h1>internal server error</h1>')
    })
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});












