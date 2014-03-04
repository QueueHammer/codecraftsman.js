#codecraftsman.js
================

Some useful extensions to string, logging, and to get a ScriptPath.

Unlike most libries this small set of helper functions are global in scope. The extentions to string extend the prototype and String.template will not be applied unless underscore.js is present.

##String.format()

A .net like string formater where arguments are matched with place holders in the string.

    //For example
    'Something {{0}} to {{1}}'.format('new','see');
    
    //Will produce
    'Something new to see'
    
##String.template()

This is a shortcut to the underscore template function. It applies an object directly to a string as the template

    //For example
    'A {{equus}}! A {{equus}}! My {{residence}} for a {{equus}}.'.template({residence:'kingdom',equus:'horse'});
    
    //Will state
    'A horse! A horse! My kingdom for a horse.'

##String.log()

With two new ways to cleanly create new strings it will not be long before they start gettnig logged. So why not make loggin strings eaiser all tougether? O.K.

    //Any string can now be logged to the console
    'This will show up on console'.log();
    
    //Why was it not always that easy
    //Because someone was writing console.log() in C and Java and didn't want JS devs to miss out on the fun.
    //Seceriously...
    
##ScriptPath()

At times it would be nice to have a funciton to use to get the current path of the code block we are in. Say for
some reason you were writing modular code and you know by some convention based on the location of script A file B 
should be in another place. ScriptPath will help with that.

    //Create a new path obj for in script 'http://localhost:81/src/demo.js'
    var srcPathInfo = ScriptPath();

###srcPathObj.fullPath()

Returns the full path from protocall, http/https, to file with extension.

    //Will return 'http://localhost:81/src/demo.js'
    srcPathInfo.fullPath();

###srcPathObj.path()

Returns the path with protocall and a trailing slash

    //Will return 'http://localhost:81/src/'
    srcPathInfo.path();

###srcPathObj.file()

Returns just the file *with* extention.

    //Will return 'demo.js'
    srcPathInfo.file();

###srcPathObj.fileNoExt()

Returns just the file *with out* extention.

    //Will return 'demo'
    srcPathInfo.fileNoExt();

For now thats it...
    
