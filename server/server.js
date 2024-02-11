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

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:root@yadhukrishnasm.hklj5a3.mongodb.net/Cloudbag')
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


async function getUserByUsername(username) {
  try {
    const databaseUserChecking = await User.findOne({ user : username });
    console.log(databaseUserChecking);
    if (!databaseUserChecking) {
      return null;
    }
    
    return {
      name: databaseUserChecking.user,
      // passwordHash: databaseUserChecking.passwordHash, 
    };
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}


app.post('/login', async (req, res) => {
  // console.log(req.body)
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    console.log(user);
    if (!user) {
      res.json({status:"0"});
    }
    res.json({status:"1"});

    // const validPassword = await bcrypt.compare(password, user.passwordHash);

    // if (!validPassword) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }

    // const token = generateToken(); // Implement this function to generate a token securely

    // res.json({ token, user: { username: user.username, /* include only necessary user data */ } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
