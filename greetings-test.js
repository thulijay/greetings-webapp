const assert = require('assert');
const greetings = require('./greetings-factory');
const pg =require('pg');
const Pool = pg.Pool;

const INSERT_QUERY = 'insert into users(user_name, user_count) values ($1, $2)';

const connectionString = process.env.DATABASE_URL || 'postgresql://melissa:pg123@localhost:5432/users';

const pool = new pg.Pool({
    connectionString
});


describe('Greetings-Webapp Tests', function(){
    beforeEach(async function(){
        await pool.query('delete from users;');
    });

    it('should be able to add a name', async function(){
        await pool.query(INSERT_QUERY, ['melissa', 1]);
        // await pool.query(INSERT_QUERY, ['james', 1]);
        // await pool.query(INSERT_QUERY, ['champ', 1]);

        const returnDb = await pool.query("select count(*) from users");
    
        assert.equal(1, returnDb.rows[0].count);
    });

    it('should be able to add more than one name', async function(){
        await pool.query(INSERT_QUERY, ['troy', 1]);
        await pool.query(INSERT_QUERY, ['rein', 1]);
        await pool.query(INSERT_QUERY, ['curtley', 1])

        const returnDb = await pool.query("select count(*) from users");

        assert.equal(3, returnDb.rows[0].count);
    });

    it('should be able to return a duplicated name', async function(){
        await pool.query(INSERT_QUERY, ['rebecca', 1]);
        await pool.query(INSERT_QUERY, ['rebecca', 1]);

        const returnDb = await pool.query('select count (*) from users');

        assert.equal(2, returnDb.rows[0].count);
    });
});


    describe('More Tests', function(){

        beforeEach(async function(){
            await pool.query('delete from users;');
        });
    
  
    


    it('should be able to reset data', async function(){
        await pool.query(INSERT_QUERY, ['kim', 1]);
        await pool.query(INSERT_QUERY, ['rebecca', 1]);
        await pool.query(INSERT_QUERY, ['thembi', 1]);
        await pool.query(INSERT_QUERY, ['troy', 1]);

        const returnDb = await pool.query('select count (*) from users');

        assert.deepEqual(4, returnDb.rows[0].count, []);
    });

    it('should not return an empty entry', async function(){
        await pool.query(INSERT_QUERY, ['', 0])

        const returnDb = await pool.query('select count (*) from users');

        assert.equal(undefined, returnDb.rows.count)
    });

    it('should be able to greet user in English', async function(){
        const INSERT_QUERY = 'insert into users(user_name) values ($1)';

        let language = "English";

        await pool.query(INSERT_QUERY, ['kim'], language);

        const returnDb = await pool.query('select count (*) from users');

        assert.equal(0, returnDb.rows[0].count);
    })

    it('')
})
