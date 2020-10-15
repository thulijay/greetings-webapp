module.exports= function greetRoutes(greetingEntry) {

   const userCount =  async function (req, res) {
        const usersWait = await greetingEntry.getData();
        console.log({ usersWait: usersWait.rows })
        res.render('greeted', { names: usersWait.rows, count: 1 });
      
      }

    const personsCount =  async function (req, res) {
        let userGreet = req.params.username;
        let namesList = await greetingEntry.getUser(userGreet);
        const user = namesList.rows[0];
        console.log({ user });
      
        let counterMsg = "Hi, " + user.user_name + " you have been greeted " + user.user_count + " times"
        res.render('counter', { message: counterMsg })
      }

      const flashMsg = async function (req, res) {
        let greetingsX = req.body.enterUser;
        let solidGreet = req.body.solidGreet;
        let message='';
      
        
        if(greetingsX == '' && solidGreet === undefined){
          req.flash ('error','select a language & enter your name');
      
      }
       else if(greetingsX == '' ){
          req.flash  ('error','enter your name');
      }
       else if( solidGreet === undefined){
          req.flash ('error','select language');
      }
      else{
        message= await greetingEntry.greetWorkFlow(greetingsX, solidGreet)
      
      }
      
        let count = await greetingEntry.getData();
      
        count = count.rowCount
      
        res.render('index', {
          message,
          count
        })
      }

     const homeRoute = function (req, res) {
        res.render('index');
      }

     const addedFlash = function (req, res) {
        req.flash('info', 'Flash Message Added');
        res.redirect('/');
      }

      const resetUsers = async function (req, res) {
        await greetingEntry.deleteUsers();
        res.redirect("/")
      }
      

    return {
        userCount,
        personsCount,
        flashMsg,
        homeRoute,
        addedFlash,
        resetUsers
    }
}