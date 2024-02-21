const User = require('../models/user');
const fs = require('fs')

const Register = async(username,password,email)=>{
    try{
        console.log(username,password,email)
        const databaseUsername = await User.findOne({user : username},{'_id' : 0, 'user' : 1})
        const databaseEmail = await User.findOne({email : email},{'_id' : 0, 'email' : 1})

        if(!databaseUsername && !databaseEmail){
            const newuser = new User({
                user : username,
                password : password,
                email : email
            });

            await newuser.save()  
                .then(async() => {
                    const userid = await User.findOne({user : username},{'_id' : 1})
                    fs.promises.mkdir('./UserData/' + userid._id, { recursive: true })
                        .then(()=>{
                            console.log('Directory created and user data uploaded');
                            return 1;
                        }) 
                        .catch((error)=>{
                            console.error('Error creating directory:', error);
                        })
                })
                .catch((err)=>{
                    console.error("Registration error" + err);
                })
            }
        else if(!databaseEmail){
            console.log("Username exists")
            return 2
        }
        else{
           console.log("Email exists") 
           return null
        }
    }catch(err){console.log("Register function err -> "+err)}
}

module.exports= Register;