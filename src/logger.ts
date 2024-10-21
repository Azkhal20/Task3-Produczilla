import { promises as fs } from 'fs';
import * as path from 'path';

export async function logEvent(message: string) {
  const now = new Date();
  const timestamp = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMonth() + 1}_${now.getDate()}_${now.getFullYear()}`;
  const logFileName = path.join('logs', `${timestamp}.log`);

  const logMessage = `[${now.toISOString()}] ${message}\n`;

  try {
    await fs.mkdir('logs', { recursive: true });
    await fs.appendFile(logFileName, logMessage);
  } catch (error) {
    console.error('Error saat mencatat log:', error);
  }
}
