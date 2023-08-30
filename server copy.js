this.dd.query(`SELECT * FROM role`, (err,rows,fld)=>{
  let rRay = [];
  if(err){
    console.log(`err: ${err}`);
    return;
  }
  rows.forEach(x=>{
    const tmp = {id: x.id, name: x.title};
    rRay.push(tmp);
  });
  



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
      type: 'list',
      name: 'role',
      message: 'Which department?',
      choices: rRay
    }
  ])
  .then(({ title, salary, role })=>{
    const selectedRol = rRay.find(x=> role == x.name);
    const qq = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
    this.dd.query(qq, [`${title}`,salary,selectedRol.id], (e)=>{
      if(e){console.log(`e: ${e}`)};
      console.clear();
      return this.run();
    });
  })
  .catch((e)=>{
    console.log(`error:  ${e}`);
  });



})