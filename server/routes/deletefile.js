const fs = require('fs')

const DeleteFile = async(userid,filename) =>{
    try{
        fs.unlink('./UserData/'+userid+"/"+filename, (err) => {
            if (err) {
                return "Error";
            } else {
                return "File Deleted";
            }
        });
    }catch(err){
        console.log("File delete error ->"+err)
    }
}

module.exports = DeleteFile;