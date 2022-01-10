import mysql from 'promise-mysql2'
import keys from './keys'

const pool = mysql.createPool(keys.database)

pool.getConnection().then(connection => {
    pool.releaseConnection(connection)
    console.log('DB CONNECTED')
})


export default pool