const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");

require('events').EventEmitter.prototype._maxListeners = 100;

let addedEmployees = [];

const newEmployee = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message : 'What is your employee name?',
    }, {
        type: 'number',
        name: 'id',
        message : 'What is your employee ID number?',
    }, {
        type: 'input',
        name: 'email',
        message: 'What is your employee email?',
    }, {
        type: 'list',
        name: 'role',
        message : 'What is your employee role?',
        choices: ['Manager', 'Engineer', 'Intern']
    }]).then(res => {
        const basicInfo = [];
        basicInfo.push(res.name, parseInt(res.id), res.email);
        if (res.role === 'Engineer') newEngineer(basicInfo);
        if (res.role === 'Intern') newIntern(basicInfo);
        if (res.role === 'Manager') newManager(basicInfo);
    }).catch(err => {
        if (err) console.log(err);
    })
}

const newEngineer = (data) => {
    inquirer.prompt([{
        type: 'input',
        name: 'github',
        message: 'What is your Github account?',
    }
    ]).then(res => {
        data.push(res.github)
        const engineer = new Engineer(data[0], data[1], data[2], data[3])
        addedEmployees.push(engineer);
        console.log(addedEmployees)
        otherEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const newIntern = (data) => {
    inquirer.prompt([{
        type: 'input',
        name: 'school',
        message: 'What school do you currently attend?',
    }
    ]).then(res => {
        data.push(res.school)
        const intern = new Intern(data[0], data[1], data[2], data[3])
        addedEmployees.push(intern);
        console.log(addedEmployees)
        otherEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const newManager = (data) => {
    inquirer.prompt([{
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?',
    }
    ]).then(res => {
        data.push(parseInt(res.officeNumber));
        const manager = new Manager(data[0], data[1], data[2], data[3])
        addedEmployees.push(manager);
        console.log(addedEmployees)
        otherEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const otherEmployee = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to add another employee?'
    }).then(res => {
        if (res.continue === true) {
            newEmployee()
        }
        else {
            fs.writeFileSync(outputPath, render(addedEmployees))
        };
    })
}

newEmployee()
​
​

