# QuartzScript language guide

## Modules
- Most files export things.
- Files that need to use those exports must be able to reference them somehow...
- Solution: *modules*! (see below)
```typescript
module myModuleName
```

## Imports
- You can import resources via modules.
- Reference resources by *modules*, not file names.

Wrong:
```javascript
// WRONG:
import usefulStuff from "some-file";
// ALSO WRONG:
var usefulStuff = require('some-file');
```
Right:
```actionscript
// RIGHT:
import someModuleName
```
- By default, module contents are put in global namespace.
- Alternatively, you can specify a namespace:
``` python
import myModule as myModule
```

## Basic Syntax
- No semicolons, use newlines.
- Compiler recognizes these as whitespace: space, tab, newline.
- Blocks and functions use brackets ({}).

### if, if-else
- Basically like Swift.
```swift
// RIGHT (no parentheses):
if condition {
  // Do stuff if condition is true
}

//UNNECESSARY (with parentheses):
if (condition) {
  // Do stuff if condition is true.
}

if condition {
  // Do stuff if condition is true.
} else {
  // Do stuff if condition is false.
}
```

### while, for-in
- `while`s and `for`s are pretty much like Swift.
- C-like `for` loops (this kind `for (var i = 0; i < l; i++) are not supported.
- Use `for [key, val] in Object` instead.

### Destructuring
- Yay! QS supports destructuring. 🎉
- For those unfamiliar:
```javascript
var someArray = [22, 5] // random stuff array
// old way:
var x = someArray[0]
var y = someArray[1]
// x === 22
// y === 5

// new way:
var [x, y] = someArray
// x === 22
// y === 5

// works for objects too!
var someObj = {a: 'Hi', b: function(){}, c: []}
var {a, b, c} = someObj
// a === 'Hi'
// b === someObj.b
// c === someObj.c
```

### Variables and constants
- `let` for constants, `var` for variables, like Swift.
- Constants cannot be reassigned, but their values can change, like in JS.
- Good practice to use constants for references.
- Block scope.
- Not a typed languages, so this is legal:
```swift
var x = 8;
x = 'hi'
x = []
x = {}
x = func() {

}
x = MyClass()
```

### Switch-case
- Different than most languages.
```swift
switch x {
  case 'Hi' {
    // do stuff...
  }
  case 'Bye', 'Adiós', 'Goodbye', 'Cya' {
    // do stuff if either of the above matches x
  }
  // default case is optional
  default {
  
  }
}
```

### Strings
- Single and double quote both work, like in JS.
- Triple quote also supported (three double quotes `"""`), similar to Python.
- Interpolation `${}` works with all strings.
- Backslash can escape.

### Comments
- Single line: `// blah blah blah`
- Multi-line:
```javascript
/*
blah blah
blah
*/
```
- Multi-line comments are nestable.

### Enums (Enumerations)
```swift
enum CompassDirectonAbbreviations {
  case NORTH: 'N'
  case EAST: 'E'
  case SOUTH: 'S'
  case WEST: 'W'
}
var x = CompassDirectionAbbreviations.NORTH
// x === 'N'

// You don't need to specify raw values, they will be automatically assigned
enum CompassDirections {
  case NORTH
  case EAST
  case SOUTH
  case WEST
}

var y = CompassDirections.NORTH
// y is whatever the compiler assigns NORTH to
```

### Functions
```swift
func myFunction(param, secondParam) {
  return param + secondParam;
}

let x = myFunction(param: 'randomValue', secondParam: 1337);

// Used `unnamed` modifier for unnamed parameters.
func myOtherFunc(unnamed param, namedParam) {

}

myOtherFunc('randomValue', namedParam: 8);
```

### Classes
```javascript
// empty class:
class MyClass {

}

// inheritance:
class MyClass: SuperClass {

}

// initialization:
class MyClass {
  init(propValue) {
    @prop = propValue
  }
}

// methods:
class Cat {
  init(name) {
    @name = name
  }
  sayName() {
    alert('My name is ${name}.');
  }
}

// using a class
var garfield = Cat(name: 'Garfield')
```

### This/Self/Me
- Uses `@prop` instead of `self.prop` or `this.prop`. Same for methods.
- Use `@@myPropertyNameGoesHere` to reference static properties and methods.
- `a::b` is shortcut for Javascript's `a.prototype.b`.

### Exports
- Use the `export` variable.
- `export` is `{}` by default.

### External modules
- TODO
