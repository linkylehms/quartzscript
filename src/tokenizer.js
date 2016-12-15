/** START FILE tokenizer.js **/

(function(qsc) {
  /** START IMPORTS **/
  var StateCodes = qsc.StateCodes;
  /** END IMPORTS **/
  
  function tokenize(code) {
    var data = [];
    var tokens = [];
    for (var index = 0; index < code.length; index++) {
      var char = code.charAt(index);
      var latestData = data.slice(-1);
    }
  }
  
  /** START EXPORTS **/
  
  /** END EXPORTS **/
})(QuartzscriptCompiler);

/** END FILE tokenizer.js **/
