const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {type:String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type:String, required: true},
})

const user = mongoose.model('User',userSchema);
module.exports = user;



// const newUserData = {
//     user: 'Karthik',
//     email: 'nandan@gmail.com',
//     password: 'hashed_password', // Make sure to hash the password before saving!
//   };
  
//   async function saveUser(userData) {
//     try {
//       await mongoose.connect('mongodb+srv://admin:root@yadhukrishnasm.hklj5a3.mongodb.net/Cloudbag'); // Adjust connection string
  
//       // Create a new User instance with provided data
//       const newUser = new user(userData);
  
//       // Save the user to the database
//       await newUser.save();
  
//       console.log('User saved successfully!');
  
//     } catch (error) {
//       console.error('Error saving user:', error);
//     } finally {
//       await mongoose.disconnect(); // Close the connection
//     }
//   }

  
// saveUser(newUserData);