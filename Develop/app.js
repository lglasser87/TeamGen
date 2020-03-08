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
        message : 'What is your employee\'s name?'
    }, {
        type: 'number',
        name: 'id',
        message : 'What is your employee\'s ID number?',
    }, {
        type: 'input',
        name: 'email',
        message: 'What is your employee\'s email?'
    }, {
        type: 'list',
        name: 'role',
        message : 'What is your employee\'s role?',
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
        message: 'What is your Github account?'
    }
    ]).then(res => {
        data.push(res.github)
        const engineer = new Engineer(data[0], data[1], data[2], data[3])
        addedEmployees.push(engineer);
        console.log(addedEmployees)
        nextEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const newIntern = (data) => {
    inquirer.prompt([{
        type: 'input',
        name: 'school',
        message: 'What school do you currently attend?'
    }
    ]).then(res => {
        data.push(res.school)
        const intern = new Intern(data[0], data[1], data[2], data[3])
        addedEmployees.push(intern);
        console.log(addedEmployees)
        nextEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const newManager = (data) => {
    inquirer.prompt([{
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?'
    }
    ]).then(res => {
        data.push(parseInt(res.officeNumber));
        const manager = new Manager(data[0], data[1], data[2], data[3])
        addedEmployees.push(manager);
        console.log(addedEmployees)
        nextEmployee();
    }).catch(err => {
        if (err) console.log(err);
    })
}

const nextEmployee = () => {
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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
