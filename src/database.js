const sql = require('mssql');

const config = {
    server: 'localhost',
    user: 'sa',
    password: '123',
    database: 'Doc',
    options: {
        encrypt: false,
        enableArithAbort: false,
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to MSSQL database');
    } catch (err) {
        console.error('Error connecting to MSSQL:', err);
    }
};

const executeQuery = async (query, isUpdateOrDelete = false) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);

        if (isUpdateOrDelete) {
            return { rowsAffected: result.rowsAffected[0] };
        }

        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
};


module.exports = {
    connectDB,
    executeQuery,
    sql,
};
