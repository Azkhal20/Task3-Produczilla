import { encryptFile, decryptFile } from './encryptor';

const [operation, filePath, password] = process.argv.slice(2);

async function main() {
  try {
    if (operation === 'encrypt') {
      const encryptedFile = await encryptFile(filePath, password);
      console.log(`File '${filePath}' berhasil dienkripsi menjadi '${encryptedFile}'`);
    } else if (operation === 'decrypt') {
      const decryptedFile = await decryptFile(filePath, password);
      console.log(`File '${filePath}' berhasil didekripsi menjadi '${decryptedFile}'`);
    } else {
      console.error('Operasi tidak valid. Gunakan "encrypt" atau "decrypt".');
    }
  } catch (error) {
    // Type narrowing untuk 'unknown' error
    if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error:', error);
      }
  }
}

main();
