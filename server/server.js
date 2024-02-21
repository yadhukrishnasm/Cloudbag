const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateToken = require('./middleware/generateToken.js');
const Login = require('./routes/login.js');
const Register = require('./routes/register.js');
const FileList = require('./routes/filelist.js');
const ShareData = require('./routes/sharedata.js');
const GrammaCheck = require('./routes/grammar.js');
const DeleteFile = require('./routes/deletefile.js');
const AskAi = require('./routes/askai.js')
const dbConnectionMiddleware = require('./middleware/dbConnection');
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
dbConnectionMiddleware()

app.post('/login',async(req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const userid = await Login(username, password);
    res.json({success:true, redirect: `/main_homepage?username=${username}` });
  } catch (error) {

    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userid = await Register(username, password, email);
    res.send(userid);
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
  try{
    const deletefile = await DeleteFile(userid,filename);
    console.log(deletefile)
    res.send(deletefile)
  }catch(error){
    console.log("Error in deleting file->"+error)
  }
})

app.post('/grammacheck',async(req,res)=>{
  try{
    const {para} = req.body;
    const grammacheck = await GrammaCheck(para);
    console.log(grammacheck)
    res.send(grammacheck);
  }catch(error){
    console.log("Error is grammar checking->"+error)
    res.send("Error")
  }
})

app.post('/askai',async(req,res)=>{
  const {ques} = req.body;
  try{
    const answer = await AskAi(ques);
    console.log(answer)
    res.send(answer)
  }catch(error){
    console.log("Error in Ai->"+error)
  }
})

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
