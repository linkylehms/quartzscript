/** START FILE tokenizer.js **/

(function(qsc) {
  var StateCodes = qsc.StateCodes;
  
  var EasyRe = {
    ALPHA: /[a-zA-Z]/,
    ALPHA_DOLLAR_UNDER: /[a-zA-Z\$_]/,
    NUM: /\d/,
    NUM_BIN: /[01]/,
    NUM_OCT: /[0-7]/,
    NUM_HEX: /[0-9a-fA-F]/,
    ALPHA_DOLLAR_UNDER_NUM: /[a-zA-Z0-9\$_]/,
    RAD_PRE_LETTER: /[xbo]/, // Radix prefix letter (x, b, or o, for 0x (hex), 0b (binary), or 0o (octal))
    WS: /\w/,
    ST: / |\t/, // Space or tab
    PUNC: /[\\\/\$\{\}\[\]\.\,\-\+\?\=\(\)\^\*\|~`!@#%&_:;'"<>]/,
    DELIM: /\{\}\[\]\(\)/
  };
  
  function tokenize(code) {
    var data = [{state: StateCodes.EXEC}];
    var tokens = [];
    // TODOS: fill out endState stub
    function getLatestData() {
      return data[data.length - 1];
    }
    function addState(state) {
      data.push(state);
    }
    function redoCharCheck() {
      i--;
    }
    function endState(options) {
      var latestData = getLatestData();
      data.pop();
      options = options || {shouldNotAppend: false}
      
      if (!options.shouldNotAppend) {
        if (false) {
          // Special case logic here
        } else {
          tokens.push(latestData);
        }
      }
    }
    
    for (var i = 0; i < code.length; i++) {
      var char = code.charAt(i);
      switch (getLatestData().state) {
        case StateCodes.EXEC:
          if (EasyRe.ALPHA_DOLLAR_UNDER.test(char)) {
            addState({state: StateCodes.WORD, contents: char});
          } else if (EasyRe.NUM.test(char)) {
            addState({state: StateCodes.NUMBER, contents: char, radix: 10});
          } else if (EasyRe.ST.test(char)) {
            addState({state: StateCodes.SPACE_TAB});
            endState();
          } else if ('\n' === char) {
            addState({state: StateCodes.NEWLINE});
          } else if (EasyRe.DELIM.test(char)) {
            if (getLatestState().isStringInterpolation && '}' === char) {
              endState();
            } else {
              var delimState = ({
                '(': StateCodes.LP,
                ')': StateCodes.RP,
                '[': StateCodes.LS,
                ']': StateCodes.RS,
                '{': StateCodes.LB,
                '}': StateCodes.RB
              })[char];
              addState({state: delimState});
              endState();
            }
          } else if (EasyRe.PUNC.test()) {
              addState({state: StateCodes.PUNC_SEQ, contents: char});
          }
          break;
        case StateCodes.WORD:
          if (EasyRe.ALPHA_DOLLAR_UNDER_NUM.test(char)) {
            getLatestData().contents += char;
          } else {
            endState();
            redoCharCheck();
          }
          break;
        case StateCodes.NUMBER:
          if (({2: EasyRe.NUM_BIN, 8: EasyRe.NUM_OCT, 10: EasyRe.NUM, 16: EasyRe.NUM_HEX})[getLatestData().radix].test(char)) {
            getLatestData().contents += char;
          } else if (this.contents.length === 1 && EasyRe.RAD_PRE_LETTER.test(char)) {
            var radix = ({
              x: 16,
              o: 8,
              b: 2
            })[char];
            getLatestData().radix = radix;
          } else if ('_' === char) {
            // Do nothing. Underscores are allowed for readability.
          } else {
            addState({state: StateCodes.INVALID, char: char});
            endState();
            endState();
          }
          break;
        case StateCodes.SPACE_TAB:
          break;
        case StateCodes.PUNC_SEQ:
          if ('//' === getLatestData().contents) {
            endState({shouldNotAppend: true});
            addState({state: StateCodes.COMMENT, type: 'SL' /* SL for 'Single line' */, contents: ''});
            redoCharCheck();
          } else if ('/*' === getLatestData().contents) {
            endState({shouldNotAppend: true});
            addState({state: StateCodes.COMMENT, type: 'ML' /* ML for 'Multi-line' */, contents: ''});
            redoCharCheck();
          } else if (!EasyRe.DELIM.test(char) && EasyRe.PUNC.test(char)) {
            getLatestData().contents += char;
          } else {
            endState();
            redoCharCheck();
          }
          break;
        case StateCodes.INVALID:
          break;
        case StateCodes.NEWLINE:
          break;
        case StateCodes.STRING_BACKSLASH:
          break;
        case StateCodes.COMMENT:
          if ('SL' === getLatestData().type) {
            if ('\n' === char) {
              endState();
            } else {
              getLatestData().contents += char;
            }
          } else if ('ML' === getLatestData().type) {
            getLatestData().contents += char;
            if (getLatestData().contents.slice(-2) === '*/') {
              getLatestData().contents = getLatestData().contents.slice(0, -2);
              endState();
            }
          } else {
            // TODO: Error!
          }
          break;
        case StateCodes.STRING:
          if ('\\' === char) {
            addToken({state: StateCodes.STRING_PART, contents: getLatestData().contents});
            getLatestData().contents = '';
            addState({state: EasyRe.STRING_BACKSLASH, escaped: ''});
          } else if ('${' === getLatestData().contents.slice(-2)) {
            addToken({state: StateCodes.STRING_PART, contents: getLatestData().contents.slice(0, -2)});
            getLatestData.contents = '';
            addState({state: StateCodes.EXEC, stringInterpolation: true});
          } else {
            getLatestData().contents += char;
            if ('QUOTE' === getLatestData().delimType) {
              if (("'" === getLatestData().slice(-1) && 'SINGLE' === getLatestData().quoteType) ||
                  ('"' === getLatestData().slice(-1) && 'DOUBLE' === getLatestData().quoteType)) {
                getLatestData().contents = getLatestData().contents.slice(0, -1);
                endState();
              }
            } else if ('QUOTE_BRACE' === getLatestData().delimType) {
              if (("'{" === getLatestData().slice(-2) && 'SINGLE' === getLatestData().quoteType) ||
                  ('"{' === getLatestData().slice(-2) && 'DOUBLE' === getLatestData().quoteType)) {
                getLatestData().contents = getLatestData().contents.slice(0, -2);
                endState();
              }
            } else {
              // TODO: Error!
            }
          }
          break;
      }
    }
    
    return tokens;
  };
  
  /** START EXPORTS **/
  qsc.compiler.tokenize = tokenize;
})(QuartzscriptCompiler);

/** END FILE tokenizer.js **/
