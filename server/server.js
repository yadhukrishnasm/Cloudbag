const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const generateToken = require('./middleware/generateToken.js')
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


app.post('/login', async (req, res) => {
  // console.log(req.body)
  const { username, password } = req.body;
  try {

// Connect to MongoDB

    mongoose.connect('mongodb+srv://admin:root@yadhukrishnasm.hklj5a3.mongodb.net/Cloudbag')
    .then(async () => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });


    const user = await getUserByUsername(username);
    if(username == user.user && password == user.password)
    console.log(user);
    else if(user == 1)
    console.log("User not exists")
    else
    console.log("Username and Password Dont match");
    // const validPassword = await bcrypt.compare(password, user.passwordHash);

    // if (!validPassword) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // const token = generateToken(); // Implement this function to generate a token securely

    // res.json({ token, user: { username: user.username, /* include only necessary user data */ } });
  } catch (error) {
    console.error('Error during login:', error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
