import { connectToDatabase } from './utils/database.js'
import app from './server/server.js'
const port = 3000

app.listen(port, async () => {
  console.log('conectando no banco de dados');
  await connectToDatabase()
 
  console.log(`App running in http://localhost:${port}`)
})