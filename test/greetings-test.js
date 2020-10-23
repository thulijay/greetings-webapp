const assert = require('assert')
const greetings = require('../greetings-factory')
describe("Greetings Webapp Tests", function () {

  const flow = greetings()

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'tests://melissa:pg123@localhost:5432/users';
  const pool = new Pool({
    connectionString
  });
  const INSERT_QUERY = "insert into users (user_name,user_count) values ($1, $2)";

  beforeEach(async function () {
    await pool.query("delete from users");
  });

  it('should not return an empty name', async function () {
    let msgResults = await flow.languageSelector("");

    await assert.equal(undefined, msgResults)

  })

  it("should be undefined when a user enters their name without selecting a language", async function () {

    assert.equal(undefined, await flow.languageSelector('Melissa', ''))

  });

  it("should be undefined when a user hasnt selected a language or entered their name ", async function () {

    assert.equal(undefined, await flow.languageSelector('', ''))

  });

  it('should be able to greet user in English and count the user', async function () {

    let msgResults = await flow.languageSelector("Sam", "English");

    await assert.equal("Hello, Sam!:)", msgResults)

  })

  it('should be able to greet user in Latin and count the user', async function () {

    let msgResults = await flow.languageSelector("Kim", "Latin");

    await assert.equal("Salve, Kim!:)", msgResults)

  })

  it('should be able to greet user in Dutch and count the user', async function () {

    let msgResults = await flow.languageSelector("Keith", "Dutch");

    await assert.equal("Hallo, Keith!:)", msgResults)
  })

  it('should be able to greet more than 1 person', async function () {
    const flow = greetings(pool)


    await flow.greetWorkFlow('Hayley', 'Latin')
    await flow.greetWorkFlow("Charl", 'Latin')
    await flow.greetWorkFlow("Kim", 'English')
    await flow.greetWorkFlow("Busi", 'Dutch')

    await assert.deepEqual(await flow.getCounter(), 4)
  })

  it('should be able to duplicate a name', async function () {
    const flow = greetings(pool)

    await flow.greetWorkFlow('Kim', 'English');
    await flow.greetWorkFlow('Kim', 'Latin');

    await assert.equal(await flow.getCounter(), 1);
  })

  it('should be able to clear data', async function () {
    const flow = greetings(pool)

    await flow.getData('Kim', 'English');
    await flow.getData('Hilda', 'Latin');
    await flow.getData('Ben', 'Latin');

    await assert.equal(await flow.deleteUsers(), undefined);
  })

  it('should  return empty string when there is no counter or name added', async function () {
    var flow = greetings(pool);


    await flow.languageSelector("", "");
    assert.equal(await flow.getCounter(), 0)
  })

  it('should be able to count a name more than once if the same name has been added', async function () {
    var flow = greetings(pool);

    await flow.languageSelector("Melissa", "Latin");
    await flow.languageSelector("Melissa", "Latin");

await flow.greetWorkFlow('Melissa')
await flow.greetWorkFlow('Melissa')

    let nameCount = await flow.getUser('Melissa')

    assert.deepEqual(2, nameCount.rows[0].user_count);

  })
})