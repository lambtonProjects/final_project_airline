import  mysql  from 'mysql2';
import keys from './keys';

const pool = mysql.createPool(keys.database);

export default pool;

/*
import  mysql  from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection().
then (connection=> {
    pool.releaseConnection(connection);
    console.log('DB is Connected')
})

export default pool;
*/