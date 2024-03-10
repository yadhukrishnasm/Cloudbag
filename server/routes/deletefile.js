const fs = require('fs').promises; 

const DeleteFile = async (userId, filename) => {
    try {
        await fs.unlink(`./UserData/${userId}/${filename}`);
        console.log("File deleted successfully");
        return "File deleted";
    } catch (err) {
        console.error("Error deleting file:", err);
        return "Error deleting file";
    }
}

module.exports = DeleteFile;
