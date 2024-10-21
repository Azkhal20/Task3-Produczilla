import { promises as fs } from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import { logEvent } from './logger';

const algorithm = 'aes-256-ctr'; // Algoritma enkripsi
const ivLength = 16; // Panjang IV (Initialization Vector)

export async function encryptFile(filePath: string, password: string) {
  const fileName = path.basename(filePath);
  const encryptedFilePath = path.join(path.dirname(filePath), `${fileName}_encrypted`);
  
  try {
    logEvent(`Mulai mengenkripsi file ${filePath}`);
    
    const data = await fs.readFile(filePath);
    
    // Generate key dari password dengan scrypt
    const key = await crypto.scryptSync(password, 'salt', 32);
    
    // Buat IV acak
    const iv = crypto.randomBytes(ivLength);
    
    // Buat cipher dengan algoritma, key, dan IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    // Gabungkan IV dan data terenkripsi
    const finalData = Buffer.concat([iv, encryptedData]);

    await fs.writeFile(encryptedFilePath, finalData);
    logEvent(`Berhasil mengenkripsi file ${filePath}`);
    return encryptedFilePath;
  } catch (error) {
        if (error instanceof Error) {
            logEvent(`Error ketika mengenkripsi file: ${error.message}`);
            throw error;
        }
    }
}

export async function decryptFile(filePath: string, password: string) {
  const fileName = path.basename(filePath, '_encrypted');
  const decryptedFilePath = path.join(path.dirname(filePath), fileName);

  try {
    logEvent(`Mulai mendekripsi file ${filePath}`);
    
    const data = await fs.readFile(filePath);
    
    // Generate key dari password dengan scrypt
    const key = await crypto.scryptSync(password, 'salt', 32);
    
    // Ekstrak IV dan data terenkripsi
    const iv = data.slice(0, ivLength);
    const encryptedData = data.slice(ivLength);
    
    // Buat decipher dengan algoritma, key, dan IV
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    await fs.writeFile(decryptedFilePath, decryptedData);
    logEvent(`Berhasil mendekripsi file ${filePath}`);
    return decryptedFilePath;
  } catch (error) {
    if (error instanceof Error) {
      logEvent(`Error ketika mendekripsi file: ${error.message}`);
      throw error;
    }
  }
}
