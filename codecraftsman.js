(function () {
  String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        formatted = formatted.replace(
          RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return formatted;
  };

  String.prototype.log = function () {
    console.log(this.toString());
  };

  if(typeof(_) !== 'undefined'){
    String.prototype.template = function (obj, opt) {
      var defaultOpt = {interpolate: /\{\{(.+?)\}\}/g};
      _.extend(defaultOpt, opt);
      return _.template(this, obj, defaultOpt);
    };
  }
  
  function ScriptPath() {
    var scriptPath = '';
    try {
      throw new Error();
    }
    catch(e) {
      var stackLines = e.stack.split('\n');
      var callerIndex = 0;
      for(var i in stackLines){
        if(!stackLines[i].match(/http[s]?:\/\//)) continue;
        callerIndex = Number(i) + 2;
        break;
      }
      pathParts = stackLines[callerIndex].match(/((http[s]?:\/\/.+\/)([^\/]+\.js)):/);
    }
    
    this.fullPath = function() {
      return pathParts[1];
    };
    
    this.path = function() {
      return pathParts[2];
    };
    
    this.file = function() {
      return pathParts[3];
    };
    
    this.fileNoExt = function() {
      var parts = this.file().split('.');
      parts.length = parts.length != 1 ? parts.length - 1 : 1;
      return parts.join('.');
    };
  }
    
  window.getScriptPath = function () {
    return new ScriptPath();	
  };
})(); 
