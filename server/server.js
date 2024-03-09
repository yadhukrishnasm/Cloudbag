const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Login = require('./routes/login.js');
const Register = require('./routes/register.js');
const FileList = require('./routes/filelist.js');
const ShareData = require('./routes/sharedata.js');
const GrammaCheck = require('./routes/grammar.js');
const DeleteFile = require('./routes/deletefile.js');
const AskAi = require('./routes/askai.js');
const Upload = require('./routes/upload.js');
const DeleteAccount  = require('./routes/deleteaccount.js');
const ViewFile = require('./routes/viewfile.js');
const dbConnectionMiddleware = require('./middleware/dbConnection');
const multer = require('multer')


const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());
dbConnectionMiddleware()
app.use(express.urlencoded({ extended: true }));


app.post('/login',async(req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const response = await Login(username, password);
    res.send(response)
    //res.json({success: userid});
  } catch (error) {

    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const response = await Register(username, password, email);
    res.send(response);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/filelist',async(req,res)=>{
  try{
    const {userid} = req.body;
    const filelist = await FileList(userid);
    res.send(filelist);
  }catch(error){
    console.log("Error during view file list ->"+error)
    res.send("Error")
  }
})

app.post('/viewfile',async(req,res)=>{
  try{
    const {userid,filename} = req.body;
    console.log(userid + filename);
    const viewfile = await ViewFile(userid,filename);
    res.send(viewfile);
  }catch(error){
    console.log("Error in viewing the file ->"+error)
    res.send("Error")
  }

})

app.post('/deleteacc',async(req,res)=>{
  try{
    const {userid} = req.body;
    console.log("userid"+req.body)
    const response = await DeleteAccount(userid);
    res.send(response)
  }catch(error){
    console.log("Error in deleting account ->"+error)
  }
})


app.post('/sharedata',async(req,res)=>{
  try{
    const {userid,filename,resUsername} = req.body;

    const shareddata = await ShareData(userid,filename,resUsername);
    res.send(shareddata);
  }catch(error){
    console.log("Error during data sharing ->"+error)
    res.send("Error")
  }
})

app.post('/deletefile',async(req,res)=>{
  const {userid,filename} = req.body;
  console.log(req.body);
  try{
    const deletefile = await DeleteFile(userid,filename);

    res.send(deletefile)
  }catch(error){
    console.log("Error in deleting file->"+error)
  }
})

app.post('/grammacheck',async(req,res)=>{
  try{
    const {para} = req.body;
    const grammacheck = await GrammaCheck(para);
    res.send(grammacheck);
  }catch(error){
    console.log("Error is grammar checking->"+error)
    res.send("Error") 
  }
})

app.post('/askai',async(req,res)=>{
  const {ques} = req.body;
  console.log({ques});
  try{
    const answer = await AskAi(ques);
    res.send(answer)
  }catch(error){
    console.log("Error in Ai->"+error)
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') // Save files to the uploads folder
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname) // Keep the original file name
  }
});

const upload = multer({ storage: storage })
app.post('/upload', upload.single('file'),(req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const subname = req.body.subname;
    const filename = req.file.originalname;
    const uploadsres = Upload(userid,subname,filename);

    res.send('File uploaded successfully:'+uploadsres);
});

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
