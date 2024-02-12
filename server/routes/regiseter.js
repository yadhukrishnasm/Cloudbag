const User = require('../models/user');
const fs = require('fs')

const Register = async(username,password,email)=>{
    try{

        const databaseUsername = await User.findOne({user : username},{'_id' : 0, 'user' : 1})
        const databaseEmail = await User.findOne({email : email},{'_id' : 0, 'email' : 1})

        if(!databaseUsername && !databaseEmail){
            const newuser = new User({
                user : username,
                password : password,
                email : email
            });

            newuser.save()
            .then(()=>{
                fs.mkdir('./UserData/'+username, err => {
                    if (err) {throw err}
                console.log('Directory created and user data uploaded') })
            })
            .catch((err)=>{console.log(err)})
        }
        else if(!databaseEmail)
        console.log("Username exists")
        else
        console.log("Email exists")
    }catch(err){console.log("Register function err -> "+err)}
}

module.exports= Register;