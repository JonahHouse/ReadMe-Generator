

function printer(answers, username, title) {

    var fs = require('fs')
    fs.writeFile( `${username}-${title}-readme.md`, answers, function (err) {
        if (err) return console.log(err)
    
    }
    )

}


module.exports = printer;


