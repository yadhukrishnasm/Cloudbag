const User = require('../models/user');
const fs = require('fs')

const path = "./UserData/";

const ShareData = async(userid,filename,resUsername) =>{
try{
    const resid = await User.findOne({user : resUsername},{'_id' : 1})

    fs.copyFile(path+userid+"/"+filename, path+resid._id+"/"+filename, (err) => {
        if (err) {
            console.error('Error sharing file:', err);
        } else {
            console.log('File shared successfully.');
            return "File shared successfully."
        }
    });

}catch(err){
    console.log("Receiver ID Error"+err)
    return "Error"
}

}

module.exports = ShareData;