const User = require('../models/user');



async function getUserByUsername(username) 
{
    try {
      const databaseUserChecking = await User.findOne({ user : username },{'_id' : 1, 'user' : 1, 'password' : 1})
  
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
           return {"userid":user._id,"status":1};
        }

        else if(user == 1){
          console.log("User not exists") 
          return "User not exists"
        }
        
        else{
          console.log("Username and Password Dont match");
          return "Username and Password Dont match"
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed'); 
    }
}

module.exports = login;