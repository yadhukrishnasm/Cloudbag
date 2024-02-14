const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateToken = require('./middleware/generateToken.js');
const Login = require('./routes/login.js');
const Register = require('./routes/register.js');
const FileList = require('./routes/filelist.js');
const dbConnectionMiddleware = require('./middleware/dbConnection');
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
dbConnectionMiddleware();

// async function DBconnect(){
//   await mongoose.connect('mongodb+srv://admin:root@yadhukrishnasm.hklj5a3.mongodb.net/Cloudbag');
//   console.log('Connected to MongoDB');
// }
// DBconnect();


app.post('/login',async(req, res) => {
  try {
    const { username, password } = req.body;
    let status = await Login(username, password)
    if(status === 1 ){
      res.json({ message: "Login successful" });
    }
      

  } catch (error) {

    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await Register(username, password, email);

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/filelist',async(req,res)=>{
  try{
    const {username} = req.body;
    const filelist = await FileList(username);
    res.send(filelist)
  }catch(error){
    console.log("Error during view file list ->"+error)
    res.send("Error")
  }
})


app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
