import { databaseConnection } from './utils/database.js'
import app from './server/server.js'
const port = 3000

app.listen(port, async () => {
  await databaseConnection()
  console.log(`App running in http://localhost:${port}`)
})