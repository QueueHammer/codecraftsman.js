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
    
    _.mixin({
      ccPluck: function (list, propChain) {
        var f = ferrit(propChain);
        return _.map(list, function (d) { return f(d); });
      },
      ccSortBy: function (list) {
        
        var sortWith = function(f){
          return function (a, b) {
            if(f(a) > f(b)) return 1;
            if(f(a) < f(b)) return -1;
            return 0;
          };
        };
        
        var sortList = _.chain(arguments)
          .last(arguments.length-1)
          .map(function (d) {
            return sortWith(_.isFunction(d) ? d : ferrit(d));
          })
          .value();
        
        return _.clone(list).sort(function (a, b) {
          return _.reduce(sortList, function (m, d, i) {
            return m !== 0 ? m : d(a, b);
          }, 0);
        }); 
      }
	});
  }
})(cc || {}); 