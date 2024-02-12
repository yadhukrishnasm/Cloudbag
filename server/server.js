const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateToken = require('./middleware/generateToken.js');
const Login = require('./routes/login.js');
const Register = require('./routes/regiseter.js');
const dbConnectionMiddleware = require('./middleware/dbConnection');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(dbConnectionMiddleware);

app.post('/login',async(req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    await Login(username, password);

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


app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
