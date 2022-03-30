import { promises as fs } from 'fs'
import path from 'path'

const dbPath = path.join(__dirname, '..', 'Database/database.json')

export const deleteFile = async () => {
  try {
    await fs.unlink(dbPath)
  } catch (err) {}
}
