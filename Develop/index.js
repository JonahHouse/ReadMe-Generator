// GIVEN the developer has a GitHub profile and a repository

// WHEN prompted for the developer's GitHub username and repo specific information

// THEN a README for the repo is generated



// GitHub repository with a unique name and a README describing project.

// The generated README includes a bio image from the user's GitHub profile.

// The generated README includes the user's email.

// The generated README includes the following sections:

// Title
// Description
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// Questions

// The generated README includes 1 badge that's specific to the repository.

const githubToken = '013f3d36b1afea121813e7813cebebddbb3ed496';
const inquirer = require('inquirer');
const axios = require('axios');
let avatar;
let username;

let repos = [];



const questions = [ 
    
    // Title
    {
    name: 'Title',
    question: 'What is the title of your project?'
    },
    // Description
    {
    name: 'Description',
    question: 'What is the description of your project?'
    },
    // Table of Contents, Generate automatically
    // 'What are the table of contents of your ReadMe?',
    // Installation
    {
    name: 'Installation',    
    question: 'What installation needs to be done for your application?'
    }
    ,
    // Usage
    {
    name: 'Usage',
    question: 'What is the use of your application?'
    },
    // License
    {
    name: 'license',
    question: 'Let other developers know how the can and cannot use your application'
    },
    // Contributing
    {
    name: 'contributing',
    question: 'Set guidelines on how other developers can contribute to your application'
    },
    // Tests
    {
    name: 'tests',
    question: 'Write some tests that users can run for your application.'
    }
    // Questions, Generate Automatically
    // 'How can users contact you for questions?'
];

function writeToFile(fileName, data) {
}

function init() {

    // Ask for GitHub Username
    inquirer.prompt([
        {
            name: 'username',
            message: 'What is your GitHub username?',
        }
    ])
    .then(answer => {
        
        // Storing GitHub username
        let username = answer.username;

        // Getting GitHub email and avatar
        axios({
            method: "get",
        url: `https://api.github.com/users/${username}`,
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json"
        },
        auth: {
            username: 'JonahHouse',
            password: 'Jh343979a'
        }})
        .then(function ({ data }) {
            
            // Storing GitHub avatar
            avatar = data.avatar_url;

            // Storing GitHub email
            email = data.email;

        });

        // Passing in GitHub username to get repos
        axios({
            method: "get",
        url: `https://api.github.com/users/${username}/repos`,
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json"
        },
        auth: {
            username: 'JonahHouse',
            password: 'Jh343979a'
        }})
        .then(function ({ data }) {
        
        // Build array with repo names
        for (i = 0; i < data.length; i++) {
        repos.push(data[i].name);
        }

        // Ask for GitHub repo name
        inquirer.prompt([
            {
                type: 'list',
                name: 'repo',
                message: 'Which repo do you want to write a ReadMe for?',
                choices: repos
            }
        ])

        .then(answer => {
            
            // Stores which repo they want to write a ReadMe for
            let repo = answer.repo;

            // Get info on repo
            axios({
                method: "get",
            url: `https://api.github.com/repos/${username}/${repo}`,
            headers: {
                Authorization: `Bearer ${githubToken}`,
                "Content-Type": "application/json"
            },
            auth: {
                username: 'JonahHouse',
                password: 'Jh343979a'
            }})
            .then(function({ data }) {
                let answers = [];
                let askQuestions = function (num) {
                
                    if (num < questions.length) {
                        inquirer.prompt([
                        {
                            name: questions[num].name,
                            message: questions[num].question
                        }
                        ])
                        .then(function (answer) {

                            answers.push(answer);
                            num++;
                            askQuestions(num);

                        })
                        .catch(error => console.log(error));
                    } else {
let readMe = `
# ${answers[0].Title}
---------------------------------------

## Description
---------------------------------------
${answers[1].Description}

## Table of Contents
---------------------------------------
* [Installation](#installation)

* [Usage](#usage)

* [License](#license)


* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation
---------------------------------------
${answers[2].Installation}

## Usage
---------------------------------------
${answers[3].Usage}

## License
---------------------------------------
${answers[4].license}

## Tests
---------------------------------------
${answers[6].tests}

## Contributing
---------------------------------------
${answers[5].contributing}

## Questions
---------------------------------------
![profile pic](${avatar} "${username}")

Please send any inquiries to me through GitHub!(https://github.com/${username})
---------------------------------------
Created by ${username} 2020
`;

                        let printer = require('./printer.js')
                        printer(readMe, username, answers[0].Title);
                    }

                    
                }

                askQuestions(0);

            })
            .catch(error => console.log(error));

        })

        .catch(error => console.log(error));
        // End of asking for GitHub repo name

        }) 

        .catch(error => console.log(error));
        // End of getting Github username
    })

    // End of passing in GitHub username to get repos

}

init();
