const fs = require('fs')
const path = require('path')

const Upload = async(userid,subname,filename) =>{
const sourceFilePath = './uploads/'+filename;
const destinationFilePath = './UserData/'+userid+"/"+subname+"-"+filename;

// Move the file
await fs.rename(sourceFilePath, destinationFilePath, (err) => {
  if (err) {
    console.error('Error uploaded file:', err);
  } else {
    console.log('File uploaded successfully');
    return "file uploaded"
  }
});
}

module.exports = Upload;