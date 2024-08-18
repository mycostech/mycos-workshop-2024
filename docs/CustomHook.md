# Custom Hook

We can creating custom hook for reuseable purpose or separate logic that not have any HTML for clean code.

## naming

create with `camelCase` and state with `use` both file and function name

## Rules of Hooks

1. Only call Hooks at the top level

```javascript
function Counter() {
	// ✅ Good: top-level in a function component
	const [count, setCount] = useState(0)
	// ...
}

function useWindowWidth() {
	// ✅ Good: top-level in a custom Hook
	const [width, setWidth] = useState(window.innerWidth)
	// ...
}
```

- Do not call Hooks inside conditions or loops.
- Do not call Hooks after a conditional return statement.
- Do not call Hooks in event handlers.
- Do not call Hooks in class components.
- Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect.
- Do not call Hooks inside try/catch/finally blocks.

```javascript
function Bad({ cond }) {
	if (cond) {
		// 🔴 Bad: inside a condition (to fix, move it outside!)
		const theme = useContext(ThemeContext)
	}
	// ...
}

function Bad() {
	for (let i = 0; i < 10; i++) {
		// 🔴 Bad: inside a loop (to fix, move it outside!)
		const theme = useContext(ThemeContext)
	}
	// ...
}

function Bad({ cond }) {
	if (cond) {
		return
	}
	// 🔴 Bad: after a conditional return (to fix, move it before the return!)
	const theme = useContext(ThemeContext)
	// ...
}

function Bad() {
	function handleClick() {
		// 🔴 Bad: inside an event handler (to fix, move it outside!)
		const theme = useContext(ThemeContext)
	}
	// ...
}

function Bad() {
	const style = useMemo(() => {
		// 🔴 Bad: inside useMemo (to fix, move it outside!)
		const theme = useContext(ThemeContext)
		return createStyle(theme)
	})
	// ...
}

class Bad extends React.Component {
	render() {
		// 🔴 Bad: inside a class component (to fix, write a function component instead of a class!)
		useEffect(() => {})
		// ...
	}
}

function Bad() {
	try {
		// 🔴 Bad: inside try/catch/finally block (to fix, move it outside!)
		const [x, setX] = useState(0)
	} catch {
		const [x, setX] = useState(1)
	}
}
```

2. Only call Hooks from React functions

```javascript
function FriendList() {
	const [onlineStatus, setOnlineStatus] = useOnlineStatus() // ✅
}

function setOnlineStatus() {
	// ❌ Not a component or custom Hook!
	const [onlineStatus, setOnlineStatus] = useOnlineStatus()
}
```

3. Don’t dynamically mutate a Hook

   ```javascript
   function ChatInput() {
   	const useDataWithLogging = withLogging(useData) // 🔴 Bad: don't write higher order Hooks
   	const data = useDataWithLogging()
   }

   //////
   function ChatInput() {
   	const data = useDataWithLogging() // ✅ Good: Create a new version of the Hook
   }

   function useDataWithLogging() {
   	// ... Create a new version of the Hook and inline the logic here
   }
   ```

## example

```javascript
// useCalAge.ts

const useCalAge = () => {
    const [isPass, setIsPass] = useState(false)

    const calAge = (age: number) => {
        if (age >= 20) {
            setIsPass(true)
        } else {
            setIsPass(false)
        }
    }

    return [isPass, callAge] as const
    // as const is tell typescript compiler cast type specifically
}

// use in component
const Component = () => {
    // since it return with array so free declare variable but need to correct index.
    const [isCanGoToPub, callMyAge] = useCalAge()

    callMyAge(19)

    // isCanGoToPub is fakse
}
```

Another example

```javascript
// useMultiply.ts

const useMultiply = () => {
	const [result, setResult] = useState(0)

	const calMulti = (a: number, b: number) => {
		setResult(a * b)
	}

	return {
		result,
		calMulti,
	}
}

// use in Component
const Component = () => {
	// since it return with Object so we declare with object(Spread syntax) and can change name with : but not specifically index
	const { calMulti: calMultiply, result: multiplyResult } = useMultiply()

	calMultiply(10, 5)
	// multiplyResult is 50

	calMulti(10, 10) // error since we already change default name
}
```

Get Size of Window Hook

```javascript
// useWindowSize.ts

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	})

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		// Add event listener
		window.addEventListener("resize", handleResize)

		// Call handler right away so state gets updated with initial window size
		handleResize()

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return windowSize
}
```

## Homework

Time to do homework, finished two hooks both have tests make all the tests pass to finished.

### First call Prime Number Hook

edit file [usePrimeNumber.ts](../src/hooks/usePrimeNumber/usePrimeNumber.ts)

Requirements return with array only

- First index return isPrime true/false
- Second index return function for calculatePrime this function receive one param num: number
- Third index return latest num which input in second fn

### Second, Thai win Hook

Story, when we enter to stored or restaurant we need to enter thai win hook, and after finished, we exit thai win hook too.

edit file [useThaiWin.ts](../src/hooks/useThaiWin/useThaiWin.ts)

Requirements return with array only

- First index return isLogin status true/false
- Second index return `enter function` this enter function will call `enterThaiWin` Api
- Third index return `exit function` this exit function will call `exitThaiWin` Api

Disclaimer

- After we enter once, when we hit enter again or spam, it must call only one `enterThaiWin` Api
- Call Exit too, no spamming, and if we never enter before and call exit must do nothing mean not call `exitThaiWin` Api
- When we enter but forgot to exit, after we close the app the hook should exit automatically which call one `exitThaiWin` Api (spoil, when destroy hook)
