var config = require('./config');
var texts = config.texts;
var creator = require('./creator');
function argumentHandle(arg) {
    var command;
    var name;
    if(arg.substring(0, 2) == '--') {
        command = arg.substring(2)
    }
    else if(arg.substring(0, 1) == '-') {
        command = arg.substring(1)
    }
    else if(arg.indexOf(':') != -1) {
        var pieces = arg.split(':');
        command = pieces[0];
        name = pieces[1];
    }
    else {
        console.log(texts.DEFAULT_ERROR)
    }
    switch (command) {
        case 'help':
            console.log(texts.HELP_MESSAGE)
            break;
        case 'h':
            console.log(texts.HELP_MESSAGE)
            break;
        case 'module':
            creator.createModule(name)
            break;
        default:
            console.log(texts.DEFAULT_ERROR)
            break;
    }

}
/** take arg */
var arg = process.argv[2]
if(arg) {
    argumentHandle(arg)
} else {
    console.log(texts.COMMAND_REQUIRE)
}
