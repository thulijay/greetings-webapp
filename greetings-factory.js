
module.exports =  function greetFactory(pool){
    // var greetName = {};

     function languageSelector(userCheck, selectLang){
        console.log({selectLang}, selectLang === 'English');
        
        // await insertData(userCheck)
        if(selectLang === 'English'){
            return 'Hello, ' + userCheck + '!' + ':)';
        }
        else if(selectLang === 'Latin'){
            return 'Salve, ' + userCheck + '!' + ':)';
        }
        else if(selectLang === 'Dutch'){
            return 'Hallo, ' + userCheck + '!' + ':)';
        }
    }

    const greetWorkFlow = async (name, language) => {
        const isGreeted = await getUser(name);

        console.log({isGreeted}, '-------------------');
        

        if(isGreeted.rowCount > 0) {
            await updateUserCount(name);
        } else {
            await insertData(name)
        }

        return languageSelector(name, language);
    }


    async function insertData(name){
        const INSERT_QUERY = 'insert into users(user_name, user_count) values ($1, 1)';
        await pool.query(INSERT_QUERY, [name ]);
    }

    async function updateUserCount(name){
        const UPDATE_QUERY = 'update users set user_count = user_count + 1 where user_name = $1';
        await pool.query(UPDATE_QUERY, [name ]);
    }

    async function deleteUsers(){
        const DELETE_QUERY = 'delete from users';
        await pool.query(DELETE_QUERY);
    }

    async function getData(){
        const SELECT_QUERY = 'select * from users';
      return await pool.query(SELECT_QUERY);
    }

    /**
     * 
     * @param {String} name - greeted name 
     * @returns object
     */
    async function getUser(name){
        const SELECT_QUERY = 'select * from users where user_name = $1';
      return await pool.query(SELECT_QUERY, [name]);
    }
 
    // function namesX(enterName){
    //     if(enterName){
    //         if(greetName[enterName] === undefined){
    //             greetName[enterName] = 0;
    //         }
    //         greetName[enterName]++;
    //     }
    // }

    function alertUser(greetingsX, solidGreet){
        if(!greetingsX && !solidGreet){
            return 'select a language & enter your name';
        }
        else if(!greetingsX){
            return 'enter your name';
        }
        else if(!solidGreet){
            return 'select language';
        }
    }

    // function displayName(){
    //     return (greetName);
    // }

    // function countNames(){
    //     return Object.keys(greetName).length;
    // }
    
   // function userCount(enterName){
     //   for(var key in displayName){
       //     if(key === enterName){
         //       var countX = displayName[key];
           // }
        //}
        //eturn countX;
   // }

    //function clear(){
      //  displayName = "";
    //}

    return {
        languageSelector,
        // namesX,
        alertUser,
        // displayName,
        // countNames,
        getData,
        deleteUsers,
        greetWorkFlow,
        getUser
        //userCount,
        //clear
    }
}