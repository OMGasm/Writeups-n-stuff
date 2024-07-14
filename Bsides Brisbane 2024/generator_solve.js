const crypto = require("crypto");
// Function to generate a cryptographic key from a password
async function getKey(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
    const enc = new TextEncoder();
    const keyData = enc.encode(password);
    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    const derivedKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: 10000, hash: "SHA-256" },
        key,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
    // Return both the derived key and the salt
    return { derivedKey, salt };
}

// Function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    let binary_string = atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// Function to encrypt the text
async function encrypt(text, password) {
    const { derivedKey, salt } = await getKey(password);
    const enc = new TextEncoder();
    const data = enc.encode(text);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        derivedKey,
        data
    );
    return { iv: arrayBufferToBase64(iv), ciphertext: arrayBufferToBase64(ciphertext), salt };
}

// Function to decrypt the text
async function decrypt(iv, ciphertext, password, salt) {
    const { derivedKey } = await getKey(password, salt);
    const data = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: base64ToArrayBuffer(iv) },
        derivedKey,
        base64ToArrayBuffer(ciphertext)
    );
    const dec = new TextDecoder();
    return dec.decode(data);
}

// Wrapper function to encrypt the text and return a string with iv, salt and ciphertext
async function encryptText(text, password) {
    const { iv, ciphertext, salt } = await encrypt(text, password);
    return arrayBufferToBase64(salt) + ':' + btoa(iv) + ':' + ciphertext;
}

// Wrapper function to decrypt the text from a string with salt, iv and ciphertext
async function decryptText(text, password) {
    const [salt, iv, ciphertext] = text.split(':');
    return await decrypt(atob(iv), ciphertext, password, base64ToArrayBuffer(salt));
}

const rickroll = () => {
    console.log("Never gonna give you up, never gonna let you down!");
};
var s = 1; function r() { var x = Math.sin(s++) * 10000; return x - Math.floor(x); }

function generateCustomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {

    // Define character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Initialize an empty array to store the selected character sets
    const selectedCharSets = [];

    // Add selected character sets based on user input
    if (includeUppercase) selectedCharSets.push(uppercaseChars);
    if (includeLowercase) selectedCharSets.push(lowercaseChars);
    if (includeNumbers) selectedCharSets.push(numberChars);
    if (includeSymbols) selectedCharSets.push(symbolChars);

    // Ensure at least one character from each selected set
    let password = '';
    s = Math.floor(Date.now() / 1000);
    for (let i = 0; i < selectedCharSets.length; i++) {
        const randomChar = selectedCharSets[i][Math.floor(r() * selectedCharSets[i].length)];
        password += randomChar;
    }

    // Fill the remaining characters with random selections
    while (password.length < length) {
        const randomSet = selectedCharSets[Math.floor(r() * selectedCharSets.length)];
        const randomChar = randomSet[Math.floor(r() * randomSet.length)];
        password += randomChar;
    }

    // Shuffle the password to randomize the order
    password = password.split('').sort(() => r() - 0.5).join('');

    return password;
}
const encryptedData = '53zhaictpzvWwqCoJ4vktg==:M2NoSWVjRkRmd3MvZHZ0bA==:15BHUMZSN39f3PufEWsK0n0cpt3FUOTJVfcXMfLiBup7bxrVR+4pcTO3'

        function getTimestamp() {
            const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
            const d = new Date();
            return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds())}`;
        }

        async function callDecrypt(password) {
            try {
                const decryptedText = await decryptText(encryptedData, password);
              return decryptedText;
            } catch (error) {
              return null;
            }

        }

let d = Date.parse('03 Jul 2012 10:16:45 UTC');
Date.now = () => {d-=1000; return d}
async function aa() {
  while(true) {
    let pass = generateCustomPassword(20,1,1,1,1);
    let p = await callDecrypt(pass);
    console.log(d);
    if(p != null) {
      console.log(p);
      break;
    }
  }
}
aa();
 
