const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const USR = process.env.USR;
const DDB = process.env.DDB;
const PW = process.env.PW;



class CLI {
  constructor() {
    
  this.dd = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: USR,
      password: PW,
      database: DDB
    },
    console.log(`Connected to the ${DDB} database.`)
  );
  
    this.theChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 
                       'Add a role', 'Add an employee', 'Update an employee role', 'Exit'];
  }
  run() {
    // console.log(`da db: ${db}`);
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'sql',
          message: 'What would you like to do?',
          choices: this.theChoices
        }
      ])
      .then(({ sql }) => {
        // this.title = `${name}'s Tasks`;
        // console.log(`Running [${sql}] command`);
        let theParams = '';
        switch(sql){
          case this.theChoices[this.theChoices.length - 1]:
            this.dd.end(err=>{
              if(err){
                console.log(`error closing db: ${err}`);
                return;
              }
              console.log(`... end of line`);
            });
            return console.log(`ttfn`);
          case this.theChoices[0]:  //  View departments
            theParams = this.viewDepartments();
            break;
          case this.theChoices[1]:  //  View roles
            theParams = this.viewRoles();
            break;
          case this.theChoices[2]:  //  View employees
            theParams = this.viewEmployees();
            break;
        }

        // if(theParams != this.theChoices[this.theChoices.length - 1]){
        //   console.log(`after SWITCH........\n${theParams}`);
        //   this.run();
        // }
        return theParams;
      })
      .then((r)=>{
        console.log(`.then(r): ${r}`);
        this.run();
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

  viewDepartments() {
    // Get query results
    this.dd.query(`SELECT ?? FROM department`, [['id', 'name']], (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      let str;
      const rowRay = [];
      const lenRay = new Array(2).fill(0);
      
      for(let i = 0; i < rows.length; i++){
        // str = "";
        // str += rows[i].id;
        // str = str.padEnd(10) + rows[i].name;
        // str = str.padEnd(10);
        let str1 = rows[i].id.toString();
        let str2 = rows[i].name;
        rowRay.push({str1, str2});
        if(str1.length > lenRay[0]){
          lenRay[0] = str1.length;
        }
        if(str2.length > lenRay[1]){
          lenRay[1] = str2.length;
        }
      };
      // console.log(`$$$$~... ${rowRay}\nlenRay: ${lenRay}`);
      // console.log(``.padEnd(dashLen, '='));
      // Display column names


      str = "";
      let dashLen;
      this.dd.query('SHOW COLUMNS FROM department', function(err, rows, fields){
        for(let i = 0; i < rows.length; i++){
          str += rows[i].Field.padEnd(lenRay[i]);
        }
        console.log(str);
        dashLen = str.length;
        console.log(''.padEnd(dashLen, '-'));
        return str;
      });



      // this.formatColumns('SHOW COLUMNS FROM department', rowRay, lenRay);
    });


      // return this.run();
  }
  
  // formatColumns(q, r, l){
  //   let str = "";
  //   let dashLen;
  //   this.dd.query(q, function(err, rows, fields){
  //     for(let i = 0; i < rows.length; i++){
  //       str += rows[i].Field.padEnd(l[i]);
  //     }
  //     console.log(str);
  //     dashLen = str.length;
  //     console.log(''.padEnd(dashLen, '-'));
  //   });
  //   return -1;
  // }

  viewRoles() {
    // Display column names
    // this.formatColumns('SHOW COLUMNS FROM role');
    let str = "";
    let dashLen;
    this.dd.query('SHOW COLUMNS FROM role', function(err, rows, fields){
      for(let i = 0; i < rows.length; i++){
        str += rows[i].Field.padEnd(10);
      }
      console.log(str);
      dashLen = str.length;
      console.log(''.padEnd(dashLen, '-'));
    });
    
    // Display query results
    this.dd.query(`SELECT * FROM role`, (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      // console.log(rows);
      let str;
      rows.forEach((x)=>{
        str = "";
        str += x.id;
        str = str.padEnd(10) + x.title;
        str = str.padEnd(10);
        console.log(str);
      });
      console.log(``.padEnd(dashLen, '='));
      return this.run();
    });
  }
  
  viewEmployees() {
    // Display column names
    this.dd.query('SHOW COLUMNS FROM employee', function(err, rows, fields){
      let len = 0;
      let str = "";
      for(let i = 0; i < rows.length; i++){
        str += rows[i].Field + "\t\t";
        len += 4;
      }
      console.log(str);
      len += str.length;
      str = "";
      for(let i = 0; i < len; i++){
        str += "-";
      }
      console.log(str);
    });
    
    // Display query results
    this.dd.query(
      `SELECT * FROM employee JOIN role ON role_id = role.id`, (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      // console.log(rows);
      rows.forEach((x)=>{
        let str = x.id + "\t\t" + x.first_name + "\t";
        if(x.first_name.length < 7){ str += "\t\t";}
        str += x.last_name;
        if(x.last_name.length < 7){ str += "\t\t\t";}
        str += x.title;
        if(x.title.length < 7){ str += "\t";}
        str += x.salary;
        if(x.salary.length < 7){ str += "\t";}
        // need managers too (maybe more?)
        console.log(str);
      });
      console.log(`==============================================\n`);
      return this.run();
    });
  }
}
const cli = new CLI();

cli.run();




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