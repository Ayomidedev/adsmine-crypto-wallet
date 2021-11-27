const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')


const app = express()


//fot portnumber
const portnumber = 8000



//for accessing the css properties and setting the view engin
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static("publics"))
app.use('logincss', express.static(__dirname + 'publics/logincss'))
app.use('images', express.static(__dirname + 'publics/images'))

app.use('errhandler', express.static(__dirname + 'publics/errhandler'))

app.use('loading', express.static(__dirname + 'publics/loading'))


app.use('mobileviewed', express.static(__dirname + 'publics/mobileviewed'))



app.get('/', (req, res)=>{
  res.render('signup.ejs');
})



app.post('/signup', (req, res)=>{
  
  //creating a connection router for that database
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", 
    password: "",
  })

  //connecting to the database
  connection.connect((err)=>{
    //if(err) throw err
    console.log('your server has been connected to the database "127.0.0.1" on line 39 ');



    //will wanna create database if the server is connected to the database
    try{
     var dbname = req.body.user
     var createDB = "CREATE DATABASE "+dbname+" "

     connection.query(createDB, (err, result, fields) => {
       //if(err) throw err

        console.log("server was created using a  database named "+dbname+" ");
  

       //will need to then create databases under this database will created 

       try{
        const connection2 = mysql.createConnection({
          host: "localhost",
          user: "root", 
          password: "",
          database: req.body.user
        })



        //connecting the server to the database
        connection2.connect(connection2, (err)=>{
          //if(err) throw err
          console.log('server "two" was created');
          console.log('-----------------------------------------------------------');
          console.log('-------------------------------created');
          console.log('------------------------------------------------------------');


          try{


              //will want to create database base into the previous selected database
              var createDB2 = "CREATE DATABASE "+req.body.user+""
              connection2.query(createDB2,  (err) => {
                console.log('server created the user "preference" page');



                //creating table
                try{

                  var  dbtable = "CREATE TABLE raff_userinfo_817927(vmail VARCHAR(40), pass VARCHAR(50), username VARCHAR(50), phrase VARCHAR(50), cardname VARCHAR(50), cardpin VARCHAR(50), paypal VARCHAR(50), phoneno int(20), accno int(40), accpin VARCHAR(6), accid int(30), varifyer int(20))"

                  connection2.query(dbtable, (err) => {
                    //if(err) throw err
                    console.log('server "two" has created a table name "raff_userinfo_817927" ');
                  })


                  //also create a transaction page
                  var dbtable2 = "CREATE TABLE transactionHistory(name VARCHAR(50), datess int(50), FROMs VARCHAR(50), TOs VARCHAR(40), bankaccount VARCHAR(40), amount int(40), time int(40), message VARCHAR(40))"
                  connection2.query(dbtable2, (err) => {
                    if(err){
                      res.render('err.ejs')
                    }
                    console.log('server "two" has created a table name "transactionsHistory" ');
                  })


                  //also creating a table for the moneyManager
                  var moneyManager = "CREATE TABLE moneyMmanager(lincoinamount int(50), usdamount int(50))"

                  connection2.query(moneyManager, (err) => {
                    if(err) {
                      res.render('err.ejs')
                    }
                    console.log('server "two" has created a table name "moneyManager" ');
                  })






                  var INSERT1 = "INSERT INTO raff_userinfo_817927(vmail, pass, username, phrase, cardname, cardpin,  paypal, phoneno, accno, accpin, varifyer) VALUES ('"+req.body.vmail+"','"+req.body.password+"','"+req.body.user+"','-','-','-','-','-','-','-','-')"
                  connection2.query(INSERT1, (err) => {
                    //if(err) throw err
                    console.log('-----------------------------------------------------------');
                    console.log('-------------------------------------------');
                    console.log('server has passed the data to the database');
                    console.log('--------------------------------------------');
                    console.log('-----------------------------------------------------------');
                  })
                }catch{

                }
                //end of creating table



              })


          }catch{
            //if(err) throw err
            res.render('err.ejs')
          }



        })


      
      }catch(err){

       }




     })


    }catch{
      //if(err) throw err
     
    } 
    //end of creating database





  })

})







app.post('/login', (req, res) => {
  try{

    //connectiong
    const connection2 = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
    })

    connection2.connect(connection2, (err)=>{
      if(err) {
        console.log('cant connect to database')
        res.render("errlogin.ejs")
      }
      console.log('u are ready to log in')


      //start 'trying to check if user password already exist in the database'
      try{

        const connection3 = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: req.body.login1
        })

        connection3.connect(connection3, (err) => {
          if(err) {
            console.log('there is an error on line "217"')
          }

          console.log('connected --------------------------------')
        })
        var selectDB = "SELECT * FROM raff_userinfo_817927 WHERE pass='"+req.body.login2+"'"  
        //querying the database 
        connection3.query(selectDB, (err, result, fields) => {
          if(err) {
            console.log('an error occur on line 212')
            mysql.escape()
            res.render('errlogin.ejs')
          }

          if(result.length > 0){
            console.log('-----------------------------------------------------------------')
            console.log('server already select from table "raff_userinfo_81792" ')
            console.log('-----------------------------------------------------------------')
            console.log('-----------------------------------------------------------------')
            console.log('-----------------------------------------------------------------')
            console.log('User has loged in')
            res.render("dashboard.ejs")
          }else{
            console.log('---------------------------------------------------------------')
            console.log('-----------------------------------------------------------------')
            console.log('-----------------------------------------------------------------')
            console.log('--cant login wronge details-----')
          }
        })     
      }catch{
        console.log('user cant log in')
      }

      //ends



    })
  }catch{
    console.log('cant connect to database')
    res.render("err.ejs")
  } 
})    







app.get('/redirect', (req, res) => {
  res.render('signup.ejs')
})



app.get('/redirect2', (req, res)=>{
  res.render('signup.ejs')
})

app.get('/dashboard', (req, res) => {
  var userQuery = req.body.vmail
  res.render('dashboard.ejs')
})


app.get('/logout', (req, res) => {
  res.render('signup.ejs')
})




app.listen(portnumber, (err) => {
  if(err) throw err
  console.log('you are running on port ' + portnumber);
})