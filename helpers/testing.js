const CryptoJS = require("crypto-js");

// Fungsi untuk melakukan enkripsi
function encryptAES(message, key) {
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // IV harus 16 karakter (128 bit)
  const cipherText = CryptoJS.AES.encrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // Mode CBC
    padding: CryptoJS.pad.Pkcs7,
    keySize: 128 / 32,
  });
  return cipherText.toString();
}

// Contoh penggunaan
const message = "FAKULTASILMUKOMP";
const key = "UDINUSSECRETKEYX";

const encryptedMessage = encryptAES(message, key);
console.log("Encrypted message:", encryptedMessage);
