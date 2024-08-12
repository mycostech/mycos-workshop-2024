# React Hook
hook is api provide by react

## useState
manage state in component, every state change it will cause component re-render with pretty fast (they said)

syntax
```typescript
const [state, setTheState] = useState<type>(initialValue)

//example
const [count, setCount] = useState<number>(0)
```

### how to set state
We prefer set a state with callback function inside setStateFn

```typescript
// BAD
setTheState(state + 1)

// GOOD
setTheState(previous => previous + 1)

// BAD
setToggle(!isShow)

// GOOD
setTheState(prev => !prev)

// BAD
setMySelfAge({...mySelfState, age: 29 })

// GOOD
setMySelfAge(prev => {...prev, age: 29 })
```

We don't know how different BAD/GOOD yet, but it will be big effect when use inside `useEffect`

## useEffect
Trigger or called when subscribe state changed

syntax
```typescript

useEffect(() => {
    // do whatever after state change
    return () => {
        // do before next state change
    }

}, [subscribeState]) // or dependencies
```

example click to setCount(5)

```typescript
    const [count, setCount] = useState(3)

    useEffect(() => {
        console.log('after count change: ', count)

        return () => {
            console.log('before count change: ', count)
        }
    }, [count])

    // it will be log following
    // before count change: 3
    // after count change: 5
```
## Empty array of subscribe
this purpose for call once when initial component

```typescript

useEffect(() => {
    // call once when component is created or first render
    return () => {
        // call once when component being destroy
    }
}, [])
```

## Use other state inside useEffect
The rule is want to use state inside useEffect, we need to add in dependencies array except setState function,

example we have new isShow state which our count can divine by 5 will toggle isShow state

How to do that with useEffect?
```javascript
const [count, setCount] = useState(4)
const [isShow, setIsShow] = useState(false)
// BAD, will cause infinite loop
useEffect(() => {
    
    if (count % 5 === 0) {
        setIsShow(!isShow)
    }
    console.log('trigger effect')
}, [count, isShow])
```
Because when the count is 5 will set isShow since we subscribe isShow too, isShow change state it will trigger useEffect then condition still too and continue setIsShow and isShow change trigger useEffect again and so on...
That why we prefer setState with callback in previous section

```javascript
const [count, setCount] = useState(4)
const [isShow, setIsShow] = useState(false)
// GOOD
useEffect(() => {
    
    if (count % 5 === 0) {
        setIsShow(prev => prev)
    }
    console.log('trigger effect')
}, [count])
```

## useRef
First purpose of useRef it direct accessing DOM element
and working after `.current` only

example change directly dom background without using state
syntax 
```typescript
    const divRef = useRef<HTMLDivElement>(null)

    divRef.current.backgroundColor = 'red'

    return  (
		<div ref={divRef}>
        </div>
    )
    
```

Second purpose, useRef not trigger react re-render, so it good to stored some value that we don't want to trigger
Example want to keep previous count state and doesn't want to trigger re-render
```javascript
const [count, setCount] = useState(4)
const previousCountRef = useRef<number>(null)

useEffect(() => {
    return () => {
        previousCountRef.current = count
    }
    
}, [count])
```

Another example, keep isShow when count > 5 but don't want to trigger re-render

```javascript
const [count, setCount] = useState(4)
const isShowRef = useRef<boolean>(false)

useEffect(() => {
    if (count > 5) {
        isShowRef.current = true
    }
    
}, [count])
```
We don't need to register ref to dependencies array but do not forget to set in `.current` only

## useCallback
This hook memorize function in React Component, when we need to pass function to another component to avoid unnecessary re-render

We create function use in component it will be fine, but if we want to use this function inside useEffect
we need to register in dependencies array and it will cause trigger effect infinite because the same function name but it difference symbol

example 
```javascript
const a = () => {}
const b = () => {}
a === b // false
```

Start like above we create function `callApiAfterCountEvery5`
```javascript

const callApiAfterCountEvery5 = () => {
		console.log('call api')
}

useEffect(() => {
    if (count % 5 === 0 && count !== 0) {
        callApiAfterCountEvery5()
    }
}, [callApiAfterCountEvery5, count])

```
unlike `setState`, another function or custom function in component need to register in dependencies array too if we want to use inside useEffect

when call `setCount(5)` it called callApiAfterCountEvery5 once
when call `setCount(10)` it called callApiAfterCountEvery5 once again and so on
it look like working well but if we have another state like `isShow` state but isShow do not subscribe in useEffect

```javascript

const [count, setCount] = useState(5)
const [isShow, setIsShow] = useState(false)

const callApiAfterCountEvery5 = () => {
		console.log('call api')
}

useEffect(() => {
    if (count % 5 === 0 && count !== 0) {
        callApiAfterCountEvery5()
    }
}, [callApiAfterCountEvery5, count])

// simulate click isShow
setIsShow(prev => !prev)
```
it log `call api` now it have problem

Because when component re-render it will create new function too even the same name (but it difference symbol like example above) and setIsShow trigger the component re-render
we can fix by memo function `useCallback`

syntax
```javascript
    const functionName = useCallback(() => {

    }, [stateSubscribe])
```
like useEffect the function will re-create only state subscribe changed if we create empty subscribe
```javascript
const callApiAfterCountEvery5 = useCallback(() => {
		console.log('call api')
}, [])
```
it only create once after component created

now it can solve the problem when click setIsShow, it doesn't call api effect


## useMemo
like useCallback but it for state object or prop object and need to return value

syntax
```javascript
const variableName = useMemo(() => {
    return MemoValue
}, [stateSubscribe])
```

Example; If we have some calculation with count but don't want to calculate every re-render

```javascript
const countMultiFive = useMemo(() => {
    return count * 5;
}, [count])
```
The `countMultiFive` will re-created only when count changed, after we click setIsShow, it do nothing.


## Other React Hook API
More hook will helpful but not in this section

- useDeferredValue
- useImperativeHandle
- useTransition

all hook: https://react.dev/reference/react/hooks