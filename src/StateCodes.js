(function(qsc) {
  var StateCodes = {
    EXEC: 0,
    
    WORD: 1,
    NUMBER: 2,
    
    SPACE_TAB: 3,
    NEWLINE: 4,
    
    PUNC_SEQ: 5,
    LP: 6,
    RP: 7,
    LS: 8,
    RS: 9,
    LC: 10,
    RC: 11,
    
    COMMENT: 12,
    
    STRING: 13,
    STRING_PART: 14,
    STRING_BACKSLASH: 15,
    STRING_INTERPOLATION: 16,
    
    INVALID: 17
  };
    
  
  /** START EXPORTS **/
  
  qsc.StateCodes = StateCodes;
})(QuartzscriptComiler);
