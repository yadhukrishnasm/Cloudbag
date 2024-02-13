const User = require('../models/user');
const bcrypt = require('bcrypt');



async function getUserByUsername(username) 
{
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
  
  
const login = async(username,password) => {
    try {

        const user = await getUserByUsername(username);
        if(username == user.user && password == user.password){
            return 1;
        }
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
        throw new Error('Login failed'); 
    }
}

module.exports = login;