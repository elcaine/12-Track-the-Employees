/*~~~ Got this from 10-OOP>01-Acitivities>28>Dev>lib ~~~*/
const inquirer = require('inquirer');
// const { join } = require('path');
// const { writeFile } = require('fs/promises');
// const { createDocument } = require('./document');

class CLI {
  constructor() {
    // this.title = '';

    // Array of task objects e.g. [{ text: string, priority: bool }, ...]
    this.queryParams;
    this.theChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 
                       'Add a role', 'Add an employee', 'Update an employee role', 'Exit'];
  }
  run(db) {
    console.log(`da db: ${db}`);
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'sql',
          message: 'Select action>>',
          choices: this.theChoices
        }
      ])
      .then(({ sql }) => {
        // this.title = `${name}'s Tasks`;
        console.log(`is sql 'sql'?>>> ${sql}`);

        switch(sql){
          case this.theChoices[this.theChoices.length - 1]:
            return console.log(`ttfn`);
          case this.theChoices[0]:  //  View departments
            // console.log(`reached switch with [${sql}]`);
            this.queryParams = this.viewDepartments();
            break;
          case this.theChoices[1]:  //  View departments
            // console.log(`reached switch with [${sql}]`);
            this.queryParams = this.viewRoles();
            break;
        }

        console.log(`$$$$ AFTER SWITCH $$$$---->>> ${this.queryParams}`);
        db.query(`SELECT * FROM department`, (err,res)=>{
          if(err){
            console.log(`problems: ${err}`);
            return;
          }
          res.forEach((x)=>console.log(`~~~~ ${JSON.stringify(x)}`));
          // console.log(`$$$$~... ${JSON.stringify(res)}`);
        })

        return this.run();
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }

  viewDepartments() {
    const query = [`SELECT * FROM department`];
    return query;
  }
  
  viewRoles() {
    const query = [`SELECT * FROM roles`];
    return query;
  }

  addTask() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter task',
        },
        {
          type: 'confirm',
          name: 'confirmAddTask',
          message: 'Would you like to add another task?',
        },
      ])
      .then(({ text, confirmAddTask }) => {
        console.log(`text: ${text}\tconfirmAddTask: ${confirmAddTask}`);
        if (confirmAddTask) {
          return this.addTask();
        }
      });
  }
}

module.exports = CLI;
