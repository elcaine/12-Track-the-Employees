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
        console.log(`sql: ${sql}`);
        switch(sql){
          case this.theChoices[this.theChoices.length - 1]:
            this.dd.end(err=>{
              if(err){
                console.log(`error closing db: ${err}`);
                return;
              }
              console.log(`... end of line`);
            });
            console.log(`ttfn`);
            break;
          case this.theChoices[0]:  //  View departments
            this.viewDepartments();
            break;
          case this.theChoices[1]:  //  View roles
            this.viewRoles();
            break;
          case this.theChoices[2]:  //  View employees
            this.viewEmployees();
            break;
          case this.theChoices[3]:  //  Add department
            this.addDept();
            break;
          case this.theChoices[4]:  //  Add Role
            this.addRole();
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

  viewDepartments() {
    let str = "";
    const rowRay = [];
    const lenRay = new Array(2).fill(0);
    // Get query results
    this.dd.query(`SELECT ?? FROM department`, [['id', 'name']], (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      
      for(let i = 0; i < rows.length; i++){
        let str1 = rows[i].id.toString();
        let str2 = rows[i].name;
        rowRay.push([str1, str2]);
        if(str1.length > lenRay[0]){
          lenRay[0] = str1.length;
        }
        if(str2.length > lenRay[1]){
          lenRay[1] = str2.length;
        }
      };
    });

    let dashLen;
    this.dd.query('SHOW COLUMNS FROM department', function(err, rows, fields){
      for(let i = 0; i < rows.length; i++){
        str += rows[i].Field.padEnd(lenRay[i]+5);
      }
      dashLen = str.length;
      str += '\n'.padEnd(dashLen, '-');
      for(let i = 0; i < rowRay.length; i++){
        str += `\n${rowRay[i][0].padEnd(lenRay[0]+5)}${rowRay[i][1].padEnd(lenRay[1]+5)}`;
      }
      str += '\n'.padEnd(dashLen, '=');
      console.clear();
      console.log(str);
    });
    // this.formatColumns(`SELECT ?? FROM department`, 'SHOW COLUMNS FROM department', [['id', 'name']]);
    return this.run();
  }
  
  // formatColumns(q, c, p){
  //   let str = "";
  //   const rowRay = [];
  //   const lenRay = new Array(2).fill(0);
  //   // Get query results
  //   this.dd.query(q, p, (err,rows,flds)=>{
  //     if(err){
  //       console.log(`problems!!!!!!!!!!!!!: ${err}`);
  //       return;
  //     }
      
  //     for(let i = 0; i < rows.length; i++){
  //       let str1 = rows[i].id.toString();
  //       let str2 = rows[i].name;
  //       rowRay.push([str1, str2]);
  //       if(str1.length > lenRay[0]){
  //         lenRay[0] = str1.length;
  //       }
  //       if(str2.length > lenRay[1]){
  //         lenRay[1] = str2.length;
  //       }
  //     };
  //   });

  //   let dashLen;
  //   this.dd.query(c, function(err, rows, fields){
  //     for(let i = 0; i < rows.length; i++){
  //       str += rows[i].Field.padEnd(lenRay[i]+5);
  //     }
  //     dashLen = str.length;
  //     str += '\n'.padEnd(dashLen, '-');
  //     for(let i = 0; i < rowRay.length; i++){
  //       str += `\n${rowRay[i][0].padEnd(lenRay[0]+5)}${rowRay[i][1].padEnd(lenRay[1]+5)}`;
  //     }
  //     str += '\n'.padEnd(dashLen, '=');
  //     console.clear();
  //     console.log(str);
  //   });
  // }

  viewRoles() {
    let str = "";
    const rowRay = [];
    const lenRay = new Array(4).fill(0);
    // Get query results
    this.dd.query(`SELECT ?? FROM role JOIN department ON department.id=department_id`, 
                [['role.id', 'role.title', 'role.salary', 'department.name']], (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      
      for(let i = 0; i < rows.length; i++){
        let id = rows[i].id.toString();
        let title = rows[i].title;
        let salary = rows[i].salary.toString();
        let name = rows[i].name.toString();
        rowRay.push([id, title, salary, name]);
        if(id.length > lenRay[0]){
          lenRay[0] = id.length;
        }
        if(title.length > lenRay[1]){
          lenRay[1] = title.length;
        }
        if(salary.length > lenRay[0]){
          lenRay[0] = salary.length;
        }
        if(name.length > lenRay[1]){
          lenRay[1] = name.length;
        }
      };
    });

    let dashLen;
    this.dd.query('SHOW COLUMNS FROM role', function(err, rows, fields){
      const pad = 10;
      for(let i = 0; i < rows.length-1; i++){
        str += rows[i].Field.padEnd(lenRay[i]+pad);
      }
      str += 'department'.padEnd(lenRay[4]+pad);
      dashLen = str.length;
      str += '\n'.padEnd(dashLen, '-');
      for(let i = 0; i < rowRay.length; i++){
        str += `\n${rowRay[i][0].padEnd(lenRay[0]+pad)}${rowRay[i][1].padEnd(lenRay[1]+pad)}`;
        str += `${rowRay[i][2].padEnd(lenRay[2]+pad)}${rowRay[i][3].padEnd(lenRay[0]+pad)}`;
      }
      str += '\n'.padEnd(dashLen, '=');
      console.clear();
      console.log(str);
    });
    return this.run();
  }
  
  viewEmployees() {
    let str = "";
    const rowRay = [];
    const lenRay = new Array(6).fill(0);
    // Get query results
    let qq = 
    `SELECT ??, e2.first_name AS mgr FROM employee e1 JOIN role ON role_id=role.id JOIN department ON department_id=department.id
    JOIN employee e2 ON e1.manager_id=e2.id`
    this.dd.query(qq, 
                [['e1.id', 'e1.first_name', 'e1.last_name', 'role.title',
                  'department.name', 'role.salary']], (err,rows,flds)=>{
      if(err){
        console.log(`problems!!!!!!!!!!!!!: ${err}`);
        return;
      }
      
      rows.forEach(x=>console.log(x));
      for(let i = 0; i < rows.length; i++){
        let id = rows[i].id.toString();
        let first_name = rows[i].first_name;
        let last_name = rows[i].last_name;
        let title = rows[i].title;
        let dept = rows[i].name;
        let salary = rows[i].salary.toString();
        let mgr = rows[i].mgr;
        rowRay.push([id, first_name, last_name, dept, title, salary, mgr]);
        if(id.length > lenRay[0]){
          lenRay[0] = id.length;
        }
        if(first_name.length > lenRay[1]){
          lenRay[1] = first_name.length;
        }
        if(last_name.length > lenRay[2]){
          lenRay[2] = last_name.length;
        }
        if(dept.length > lenRay[3]){
          lenRay[3] = dept.length;
        }
        if(title.length > lenRay[4]){
          lenRay[4] = title.length;
        }
        if(salary.length > lenRay[5]){
          lenRay[5] = salary.length;
        }
        if(mgr.length > lenRay[6]){
          lenRay[6] = mgr.length;
        }
      };
    });

    let dashLen;
    this.dd.query('SHOW COLUMNS FROM employee', function(err, rows, fields){
      const pad = 3;
      const pad2 = 7;
      str += 'id'.padEnd(lenRay[0]+pad) + 'fName'.padEnd(lenRay[1]+pad) + 'lName'.padEnd(lenRay[2]+pad);
      str += 'dept'.padEnd(lenRay[3]+pad2) + 'title'.padEnd(lenRay[4]+pad2) + 'salary'.padEnd(lenRay[5]+pad2);
      str += 'mgr'.padEnd(lenRay[6]+pad);
      // rows.forEach(x=>console.log('???? ', x.Field));
      dashLen = str.length;
      str += '\n'.padEnd(dashLen, '-');
      for(let i = 0; i < rowRay.length; i++){
        str += `\n${rowRay[i][0].padEnd(lenRay[0]+pad)}${rowRay[i][1].padEnd(lenRay[1]+pad)}`;
        str += `${rowRay[i][2].padEnd(lenRay[2]+pad)}${rowRay[i][3].padEnd(lenRay[3]+pad2)}`
        str += `${rowRay[i][4].padEnd(lenRay[4]+pad2)}${rowRay[i][5].padEnd(lenRay[5]+pad2)}${rowRay[i][6].padEnd(lenRay[6]+pad)}`;
      }
      str += '\n'.padEnd(dashLen, '=');
      // console.clear();
      console.log(str);
    });

    return this.run();
  }

  addDept() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'dpt',
        message: 'What is the department name?'
      }
    ])
    .then(({ dpt })=>{
      const qq = `INSERT INTO department(name) VALUES('${dpt}')`;
      this.dd.query(qq);
      return this.run();
    })
    .catch((e)=>{
      console.log(`error:  ${e}`);
    });
  }

  addRole() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title name?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary?'
      },
      {
        type: 'input',
        name: 'dept_id',
        message: 'What is the department_id?'
      }
    ])
    .then(({ title, salary, dept_id })=>{
      const qq = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
      this.dd.query(qq, [`${title}`,salary,dept_id], (e)=>{
        if(e){console.log(`e: ${e}`)};
        return this.run();
      });
    })
    .catch((e)=>{
      console.log(`error:  ${e}`);
    });
  }
  
}
const cli = new CLI();

cli.run();






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
