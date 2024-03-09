const User = require('../models/user');
const fs = require('fs').promises;
const path = "./UserData/";

const ShareData = async (userId, filename, resUsername) => {
    try {
        const resid = await User.findOne({ user: resUsername }, { '_id': 1 });

        await fs.copyFile(path + userId + "/" + filename, path + resid._id + "/" + filename);
        
        console.log('File shared successfully.');
        return "File shared successfully.";
    } catch (err) {
        console.error('Error sharing file:', err);
        return "Error";
    }
}

module.exports = ShareData;
