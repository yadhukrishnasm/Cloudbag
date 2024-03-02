const fs = require('fs');

const ViewFile = async (userId, filename) => {
    return new Promise((resolve, reject) => {
        try {
            const filePath = `./UserData/${userId}/${filename}`;
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    reject('Internal Server Error');
                    return;
                }

                // Determine the content type based on file extension
                let contentType;
                if (filename.endsWith('.pdf')) {
                    contentType = 'application/pdf';
                } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                    contentType = 'image/jpeg';
                } else if (filename.endsWith('.png')) {
                    contentType = 'image/png';
                } else if (filename.endsWith('.txt')) {
                    contentType = 'text/plain';
                } else {
                    contentType = 'application/octet-stream'; // default to binary data
                }

                resolve({ contenttype : contentType, content: data });
            });
        } catch (err) {
            console.log("Error in viewing file ->", err);
            reject('Error');
        }
    });
}

module.exports = ViewFile;
