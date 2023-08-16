const express = require('express');
const fs = require('fs').promises;
const fss = require('fs');
const path = require('path');
const app = express();
const multer = require('multer');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/dashboard', (req, res) => {
  res.render("files.ejs");
});

app.get('/login',(req,res) => {
res.render("login.ejs");
});

// Endpoint to get the list of files in a specific folder
app.get('/list-files/:folderName', async (req, res) => {
  const folderName = req.params.folderName;

  try {
    const files = await fs.readdir(folderName);
    res.json({ files }); // Send the list of files as JSON
  } catch (error) {
    console.error('Error reading folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/toview',(req,res) =>{
  const {filename, filetoview} = req.body;
  console.log(`${filename}`+"-_-"+`${filetoview}`);
  fss.readFile(`${filetoview}`, (err,data)=>{
    if(err){
console.log("Error reading file");
    }else{
const fileExtension = path.extname(`${filename}`).toLowerCase();

let contentType;
switch(fileExtension){
case '.txt':
  contentType = 'text/plain';
  break;
case '.html':
  contentType = 'text/html';
  break;
  case '.png':
    contentType = 'image/png';
    break;
  case '.jpg':
  case '.jpeg':
    contentType = 'image/jpeg';
    break;
  case '.pdf':
    contentType = 'application/pdf';
    console.log("pdf contenttype");
    break;
  // Add more cases for other file types as needed
  default:
    contentType = 'application/octet-stream'; 

}
res.set('Content-Type', contentType);
if (contentType.startsWith('image/')) {
// If the file is an image, send it as Base64 encoded data
const base64Data = Buffer.from(data).toString('base64');
res.send(base64Data);
}
else if(contentType.startsWith('text/')){
const base64Data = Buffer.from(data).toString('base64');
res.send(base64Data);
} 
else {
// For other file types, send the raw data
const base64Data = Buffer.from(data).toString('base64');
res.send(base64Data);
}
    }

  });

});


app.post('/deletefile',(req,res) => {
  const {filetodelete} = req.body;
  fss.unlink(`${filetodelete}`, function (err) {
    
  });
  })
  

  app.post('/sharefile', (req, res) => {
    const { filetoshare, dest } = req.body;
    console.log(`Shared ${filetoshare} with ${dest}`)
  
    fss.copyFile(`${filetoshare}`,`${dest}` , (error) => {
      if (error) {
        
      } else {
        console.log('File has been moved to another folder.')
      }
    })
    
  });
  


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
