import { promises as fs } from 'fs';
import path from 'path';

export async function parseFile(filename) {
    try {
        const filePath = path.join(".", filename);
        const contents = await fs.readFile(filePath, 'utf8');
        return contents;
    } catch (error) {
        console.error("Error reading the file:", error);
        throw error;
    }
}



