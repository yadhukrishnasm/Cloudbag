const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const generateToken = require('./middleware/generateToken.js');
const Login = require('./routes/login.js');
const Register = require('./routes/regiseter.js');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());



async function getUserByUsername(username) {
  try {
    const databaseUserChecking = await User.findOne({ user : username },{'_id' :0, 'user' : 1, 'password' : 1})

    if (!databaseUserChecking) {
      return 1;
    }else{
          return databaseUserChecking;
    }

  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}


app.post('/login',(req, res) => {
  const{username,password} = req.body;
  Login(username,password)
});


app.post('/register',(req,res)=>{
  const{username,password,email} = req.body;
  Register(username,password,email);
})

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
