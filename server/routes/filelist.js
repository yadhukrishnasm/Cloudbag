const fs = require('fs')

const FileList = async(userid)=>{
try{
    console.log(userid)
    let filelist = fs.readdirSync("./UserData/"+userid); 
    return filelist;
}catch(err){
    console.log("Error in reading dir->"+err)
    return "Error"
}
}

module.exports = FileList;