// function sum() {

//     let totalSum = 0;

//     for (let i = 0; i < arguments.length; i++) {

//         totalSum += arguments[i];

//     }

//     return totalSum;


// }

// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));


// function sum(...nums) {

//     let totalSum = 0;

//     for (let i = 0; i < nums.length; i++) {

//         totalSum += nums[i];

//     }

//     return totalSum;


// }

// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));


Function.prototype.myBind = function (context, ...bindArgs) {

    return (...callArgs) => {

        return this.apply(context, bindArgs.concat(callArgs))

    }

}

Function.prototype.myBind = function (context, ...bindArgs) {

    const that = this;

    return function (...callArgs) {

        return that.apply(context, bindArgs.concat(callArgs))

    }

}






class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true



function curriedSum(numArgs) {

    const numbers = [];

    return function _curriedSum(num) {

        numbers.push(num)

        if (numbers.length === numArgs) {

            return sumAndLog(numbers);

        } else {

            return _curriedSum;

        }

    }

}

function sumAndLog(arr) {

    let sum = arr.reduce((acc, el) => {
        return acc + el

    })

    console.log(sum)

}

const sum = curriedSum(4);

sum(5)(30)(20)(1);



// // Write Curried Sum without a helpe function.  in ES - 6 

// function curriedSum(numArgs) {
//     const numbers = [];
//     function _curriedSum(num) {
//       numbers.push(num);
//       if (numbers.length === numArgs) {
//         let sum = numbers.reduce((acc, el) => acc + el);
//         console.log(sum);
//       } else {
//         return _curriedSum;
//       }
//     }
//     return _curriedSum;
//   }
  
//   const sum = curriedSum(4);
//   sum(5)(30)(20)(1);


//   // Write Curried Sum without a helpe function.  in ES - 5

//   function curriedSum(numArgs) {
//     var numbers = [];
  
//     function _curriedSum(num) {
//       numbers.push(num);
//       if (numbers.length === numArgs) {
//         var sum = numbers.reduce(function(acc, el) {
//           return acc + el;
//         }, 0);
//         console.log(sum);
//       } else {
//         return _curriedSum;
//       }
//     }
  
//     return _curriedSum;
//   }
  
//   var sum = curriedSum(4);
//   sum(5)(30)(20)(1);


Function.prototype.curry = function (numArgs) {

    let args = [];
    const fn = this;

    return function _curry(arg) {

        this // window
        args.push(arg);

        if (args.length < numArgs) {

            return _curry
            
        }  else if (args.length === numArgs) {

            return fn.apply(undefined, args);   // why can't we do this

        }

    }

}

function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
  }
  
  sumThree(4, 20, 6); // == 30
  
  // you'll write `Function#curry`!
  let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
  f1 = f1(4); // [Function]
  f1 = f1(20); // [Function]
  f1 = f1(6); // = 30
  
  // or more briefly:
  console.log(sumThree.curry(3)(4)(20)(6)); // == 30


// meow.curry(5)
// -> returning function

// _curry

// _curry()



// using apply
// Function.prototype.curry1 = function (numArgs) {
//     const args = [];
//     const fn = this;
//     function _curriedFn(arg) {
//       args.push(arg);
//       if (args.length === numArgs) {
//         return fn.apply(null, args);
//       } else {
//         return _curriedFn;
//       }
//     }
//     return _curriedFn;
//   };
  
  /**
   * With ES6 arrow functions
   * Notice we dont need to keep track of the `this` context (const fn = this).
   * An arrow function does not have its own `this`, 
   * the `this` value of the enclosing execution context is used.
   */
//   Function.prototype.curry2 = function (nArg) {
//     const argArray = [];
//     const _curriedFn = (arg) => {
//       argArray.push(arg);
//       if (argArray.length === nArg) {
//         // spreading the array into individual arguments
//         return this(...argArray); 
//       } else {
//         return _curriedFn;
//       }
//     };
//     return _curriedFn;
//   };


Function.prototype.inherits = function(Parent) {
  function Surrogate() {}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};







