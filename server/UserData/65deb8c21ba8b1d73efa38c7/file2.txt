module.exports = function grammer(){
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
}
  