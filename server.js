const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const USR = process.env.USR;
const DDB = process.env.DDB;
const PW = process.env.PW;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: USR,
    password: PW,
    database: DDB
  },
  console.log(`Connected to the ${DDB} database.`)
);



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
              //// Maybe use that cli.js thang??   ////
inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Please enter your name',
        },
      ])
      .then(({ name }) => {
        this.title = `${name}'s Tasks`;
        // return this.addTask();
        const sql = `SELECT * FROM employee`;
  
        db.query(sql, (err, results) => {
          if (err) {
            console.log(`problems:  ${err}`);
             return;
          }

          const resCodified = JSON.parse(JSON.stringify(results));
          
          // const { first_name, last_name } = resCodified;
          resCodified.forEach((e)=>console.log(`$$: ${JSON.stringify(e)}`))
          // console.log(`milarkee???... ${resCodified}`);
          console.log(`reusults???... ${JSON.stringify(results)}`);
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/





// {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = '<INQUIRER>';
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(`problems`);
//       return;
//     }
//     console.log(`win ${result}`);
//   });
// }

// {
//   const sql = `SELECT * AS title FROM department`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(`problems`);
//        return;
//     }
//     console.log(`rows???... ${rows}`);//  ... rows?
//   });
// }

// {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = `<INQUIRER>`;
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(`problems`);
//     } else if (!result.affectedRows) {
//       console.log(`nothing found`);
//     } else {
//       console.log(`deleted:  ${result.affectedRows}, id??`);
//     }
//   });
// }

// {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(`problems`);
//       return;
//     }
//     console.log(`win...  maybe need to show sum'n here?`);
//   });
// }

// {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = `<INQUIRER>`;

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(`problems`);
//     } else if (!result.affectedRows) {
//       console.log(`Nada found (maybe show searched item)`);
//     } else {
//       console.log(`win, ${result.affectedRows} som'n som'n som'n`);
//     }
//   });
// }
