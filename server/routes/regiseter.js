const User = require('../models/user');

const Register = async(username,password,email)=>{
    try{
        const databaseUsername = await User.findOne({user : username},{'_id' : 0, 'user' : 1})
        const databaseEmail = await User.findOne({email : email},{'_id' : 0, 'email' : 1})

        if(!databaseUsername && !databaseEmail)
        console.log("Registeration Done")
        else if(!databaseEmail)
        console.log("Username exists")
        else
        console.log("Email exists")
    }catch(err){console.log(err)}
}

module.exports= Register;