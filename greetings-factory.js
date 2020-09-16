module.exports =  function greetFactory(){
    var greetName = {};

    function languageSelector(userCheck, selectLang){
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

    function namesX(enterName){
        if(enterName){
            if(greetName[enterName] === undefined){
                greetName[enterName] = 0;
            }
            greetName[enterName]++;
        }
    }

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

    function displayName(){
        return (greetName);
    }

    function countNames(){
        return Object.keys(greetName).length;
    }
    
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
        namesX,
        alertUser,
        displayName,
        countNames,
        //userCount,
        //clear
    }
}