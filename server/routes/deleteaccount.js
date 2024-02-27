const User = require('../models/user');
const fs = require('fs')

const DeleteAccount = async(userid) =>{
try{
    const deletedUser = await User.findByIdAndDelete(userid);
    console.log(deletedUser)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const filePath = './UserData/'+userid; 
    fs.rmdirSync(filePath, { recursive: true })
    .then(()=>{return 1}); 

}catch(err){

}
}

module.exports = DeleteAccount;