# Typescript
Simulate strong type interpreter to JavaScript, reduce Developer pain (or increase)


## Declare Variable

first `const`, declare once for constant and it never changed.

```typescript
const oneRem = '16px'

// typescript or non assign
const oneRem: string = '16px'
```

and `let` declare to be able to change later

```typescript
let age;

age = 25;

age = 30;

// typescript 

let age: number;

age = 25

age = 30
```

### Naming
how to naming but it can be changed follow team culture.

Declare Component, Declare Interface/Type, Global Variable File use `PascalCase`
```typescript
    const CalFuncCom = () => {}
    export CalFuncCom


    const OneRem = '16px';
    export OneRem

    interface YourSelf {
        name: string;
    }
```

function name, variable inside function / component block, use `camelCase`
```typescript
const Component = () => {
    const myAge: number = 25;

    let firstName: string = 'Nook';
}
```

#### Trip use IDE/Text editor extension
In VS code, use `Prettier`, `EditorCOnfig` extension


## Normal Type
like javascript typescript have normal type with 
```typescript
const isFinished: boolean = false

const myName: string = 'Nook'

const myAge: number = 29.0001
```

### Object Type
in javascript, both array and object is object type
```javascript

const mySelf = { name: 'Nook' }
console.log(typeof mySelf)
// object

const arr = []
console.log(typeof mySelf)
// object
```

how to check is array?
```javascript
const arr = []
Array.isArray(arr)
// true
```

### Typescript Object Type
Typescript offer two API, `interface` and `type`, in basic both can be use 
the different is syntax also `interface` can inherit like OOP, `type` can generic programable(advanced) 

```typescript
interface YourSelf {
    name: string;
    age: number;
}
```

### Optional type
Above example all it required type, if we want some field optionally add `?`

```typescript
    let age?: number;

    type YourSelf = {
    name: string;
    age?: number;
}
```
### Any Type
We don't know how to deal with the type, put it any but not recommend for entry app

```typescript
 let donKnow: any;
```

### More of Typescript
- Generic <T>
- unknown, never
- Enum
- helper, Partial, Required, 

## Spread Syntax
Guarantee return new object, fix pass by ref.

What is the problem?
```javascript
const aInit = { name: 'Nook' }

const bCopy = a;

bCopy.name = 'Robert'

console.log(aInit.name)
// 'Robert'
console.log(bCopy.name)
// 'Robert'
```

How to prevent
```javascript
const aInit = { name: 'Nook', age: 29 }

// or called clone deep
const bCopy = {...aInit}

bCopy.name = 'Robert'

console.log(aInit.name)
// 'Nook'
console.log(bCopy.name)
// 'Robert'
```

Example how to clone and add isFinished field
```javascript
const aInit = { name: 'Nook', age: 29 }

const bCopy = {...aInit, isFInished: true }
```

### Spread Array
Array can use spread too.

```javascript
const numArr = [1, 2, 3, 4, 5]

const cloneArr = [...numArr];
```

*But it cannot spread the wrong type*


### Other ability of Spread
We can remove property of object.

```javascript
const mySelf = { name: 'Nook', age: 29, isFinished: false }

// We extract age from mySelf and assign to age with the same name, other field declare with `rest`
const { age, ...rest } = mySelf
console.log(age)
// 29
console.log(rest)
// { name: 'Nook', isFinished: false }

// Another example if we want change age variable and get age value
const { age: eAge, ...other } = mySelf
console.log(eAge)
//29

console.log(age)
// error

const removeAge = { ...other }
```

## Manage New Array
Guarantee return new array with `map`, `filter`, `reduce`

example object

```typescript

type TProduct = {
    price: number;
    name: string;
    isIncludeTax: boolean;
}

const products: TProduct[] = [
    { price: 45.99, name: "Coffee Maker", isIncludeTax: false },
    { price: 120.00, name: "Bluetooth Speaker", isIncludeTax: true },
    { price: 75.50, name: "Electric Kettle", isIncludeTax: false },
    { price: 22.25, name: "Desk Lamp", isIncludeTax: true },
    { price: 15.00, name: "Notebook Set", isIncludeTax: false }
];

```
### map
transform shape of each item in array 

syntax
```javascript
const newArray = array.map(callbackFunction(currentValue, index?, array?));

// or 

const array.map((eachArr, index) => {

    return eachArr
})

```

Example increase price * 1.5
```typescript
const cbProductIncreasePrice = (product) => {

    return {
        ...product,
        price: product.price * 1.5
    }
}

const newProducts = products.map(cbProductIncreasePrice)

// or

const newProducts = products.map(product => {

    return {
        ...product,
        price: product.price * 1.5
    }
})
```

### filter 
filter item then return a new array with filter condition truly

example filter only isIncludeTax is false
```javascript
// one statement we can ignore curry bracket, it auto return
// since filter will filtering only true condition so we add ! to false !false === true
const notIncludeTaxProducts = products.filter(product => !product.isIncludeTax)

// or 
const notIncludeTaxProducts = products.filter(product => {
    return !product.isIncludeTax
})
```
### reduce
Want to aggregate array to another shape, or one value

syntax
```javascript

array.reduce((agg, curItem) => {
    return agg + curItem;
}, 0); // Initial value

array.reduce((mergeObj, curField) => {
    return {
        ...mergeObj,
        curField: curField
    };
}, {}); // Initial value

// can condition
array.reduce((mergeObj, curField) => {

    if (some true)
    return {
        ...mergeObj,
        curField: curField
    };

    else do nothing
    return mergeObj

}, {}); // Initial value

```

example total of this products
```javascript
const totalCost = products.reduce((total, curProduct) => {
    
    return total + curProduct.price
}, 0) //init total with 0
```

total of product's tax include 
```javascript
const totalCost = products.reduce((total, curProduct) => {
    if (curProduct.isIncludeTax) {
        return total + curProduct.price
    }

    return total    
}, 0) //init total with 0
```

total of product if tax exclude add 7%

```javascript
const taxRate = 0.07; // 7% tax rate

// one line condition if true use statement after ? otherwise use statement after :
const totalCost = products.reduce((total, curProduct) => {
    const priceIncludingTax = product.isIncludeTax ? product.price : product.price * (1 + taxRate);
    return total + priceIncludingTax
}, 0) //init total with 0

// Or normal statement if
const totalCost = products.reduce((total, curProduct) => {
    if (product.isIncludeTax) {
        return total + product.price
    }
    return total + product.price * (1 + taxRate);
}, 0) //init total with 0

```

## Asynchronous Function 
Code will working with non blocking previous line

### Promise
Promise type is asynchronous operation will return Success or Rejected

example
```javascript
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation code here
    const success = performSomeOperation();
    if (success) {
        resolve("Operation successful");
    } else {
        reject("Operation failed");
    }
});

```
### Handle Promise
we can handle two promise two method

example sleep 
```javascript
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

First example call sleep with `then` when success, and `catch` when reject (this is no reject)
```javascript

sleep(5000)
  .then(() => console.log('after 5 second'))
```

Second, call sleep with await / async 

```javascript
const testSleep = async () => {
    await sleep(5000)
    console.log('after 5 second')
}

// Or

async function testSleep () {
    await sleep(5000)
    console.log('after 5 second')
}
```

### Concurrent
Example of Concurrent

First, then style
```typescript
    const testConcur = () => {
        sleep(3000)
            .then(() => console.log('Second'))
        
        sleep(2000)
            .then(() => console.log('Third'))

        console.log('First')
    }
    testConcur()
    // First
    // Third
    // Second
```

Second, async/await style
```javascript
    const testConcur = async () => {
        await sleep(3000)
            console.log('Second')
        
        await sleep(2000)
            console.log('Third')

        console.log('First')
    }
    testConcur()
    // Second
    // Third
    // First
```

Call API Example
```typescript
const fakeCallApi = async (isValid: boolean) => {
    await sleep(5000)
    return new Promise((resolve, reject) => {
        if(isValid) {
            resolve({isSuccess: true, name: 'NOOK'})
        } else {
            reject({message: 'opp error'})
        }
    });
}
```
First, `then`

```typescript
const testCallApi = () => {
    fakeCallApi(true)
        .then((res) => console.log(res)) // res is {isSuccess: true, name: 'NOOK'}

    
    fakeCallApi(false)
        .then((res) => {}) // no call then since it reject
        .catch(err => console.log(err)) // {message: 'opp error'}
        .finally(() => console.log('last step')) // Whatever success or fail, this will call lasts
}
testCallApi()
```

Second, async / await 
```typescript
const testCallApi = async () => {
    try {
       const res = await fakeCallApi(true)
       console.log(res)
    } catch (err: any) {
        console.log(err)
    } finally {
        console.log('last step')
    }
}
testCallApi()
```

Which async?
- AJAX (call API)
- upload file
- read file
- some DOM Event
- setTimeout function
- etc