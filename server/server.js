const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateToken = require('./middleware/generateToken.js');
const Login = require('./routes/login.js');
const Register = require('./routes/register.js');
const FileList = require('./routes/filelist.js');
const ShareData = require('./routes/sharedata.js');
const dbConnectionMiddleware = require('./middleware/dbConnection');
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
//app.use(dbConnectionMiddleware);

async function DBconnect(){
  await mongoose.connect('mongodb+srv://admin:root@yadhukrishnasm.hklj5a3.mongodb.net/Cloudbag');
  console.log('Connected to MongoDB');
}
DBconnect();


app.post('/login',async(req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const userid = await Login(username, password);
    res.send(userid);
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

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
