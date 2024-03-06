// Import required modules
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const encryptor = require('file-encryptor');

// Define the folder to encrypt
const folderToEncrypt = 'foldername';

// Define the decryption key
const decryptionKey = 'yourkey';

// Encrypt files in the specified folder
function encryptFolder(folderPath) {
    fs.readdir(folderPath, function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
            const filePath = path.join(folderPath, file);
            const encryptedFilePath = filePath + '.enc';

            encryptor.encryptFile(filePath, encryptedFilePath, decryptionKey, function(err) {
                if (err) throw err;
                console.log('File encrypted:', file);
                // Delete original file after encryption
                fs.unlink(filePath, function(err) {
                    if (err) throw err;
                    console.log('Original file deleted:', file);
                });
            });
        });
    });
}

// Decrypt files in the specified folder
function decryptFolder(folderPath) {
    fs.readdir(folderPath, function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
            const filePath = path.join(folderPath, file);
            const decryptedFilePath = filePath.slice(0, -4); // Remove '.enc' extension

            encryptor.decryptFile(filePath, decryptedFilePath, decryptionKey, function(err) {
                if (err) throw err;
                console.log('File decrypted:', file);
            });
        });
    });
}

// Check command line arguments
if (process.argv[2] === 'encrypt') {
    encryptFolder(folderToEncrypt);
} else if (process.argv[2] === 'decrypt') {
    decryptFolder(folderToEncrypt);
} else {
    console.log('Usage: node encrypt_decrypt.js [encrypt|decrypt]');
}
