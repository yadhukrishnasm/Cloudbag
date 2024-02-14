const fs = require('fs')

const FileList = async(username)=>{
try{
    let filelist = fs.readdirSync("./UserData/"+username); 
    return filelist;
}catch(err){
    console.log("Error in reading dir->"+err)
    return "Error"
}
}

module.exports = FileList;