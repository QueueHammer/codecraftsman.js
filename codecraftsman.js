cc = (function (cc) {
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

  if(typeof(_) !== undefined){
    String.prototype.template = function (obj, opt) {
      var defaultOpt = {interpolate: /\{\{(.+?)\}\}/g};
      _.extend(defaultOpt, opt);
      return _.template(this, obj, defaultOpt);
    };
    
    var ferrit = function(propChain) {
      return function (obj) {
        return _.reduce(propChain.split('.'), function (m, d, i) {
          return d in m ? m[d] : undefined;
        }, obj);
      };
    };
  }
  
  function ScriptPath() {
    var scriptPath = '';
    try {
      throw new Error();
    }
    catch(e) {
      pathParts = e.stack.match(/((http:\/\/.+\/)([^\/]+\.js)):/);
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
  }
  
  window.getScriptPath = function () {
    return new ScriptPath();	
  };
})(cc || {}); 
