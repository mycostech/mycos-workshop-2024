# useContext

- to manage the state globally
- used together with the `useState` Hook to share state between deeply nested components more easily

### Example

We have some data, such as permissions, which determines whether parts of the application are hidden or shown. This data is used in many components and has to be passed as "props" through each nested component. This practice is known as "prop drilling". However, this problem can be resolved using useContext.

```jsx
|--Context //contains the state and hook that will be used in children component 
|  |--component 
|  |----children component
```

## Create Context

PermissionContext.ts

```jsx
import { createContext} from 'react'

const initialState:PermissionContextState = {}
export const PermissionContext = createContext<T>(initialState)  
```

use the context with the state

```jsx
function PermissionContextProvider({ children }: ContextProviderProps) {

const [permission,setPermission] = useState()
const checkPermission =useCallback(()=>{})

  // Pass the value prop to the provider component to set the context value
      return (
        <PermissionContext.Provider
            value={{
            permission,
            setPermission,
            checkPermission
            }}
        >
            {children}
        </PermissionContext.Provider>
    )
}

```

use the context data from the child component

```jsx
import { useContext } from 'react'

function TodoList(){
	const { permission, setPermission, checkPermission} = useContext(PermissionContext)
	...
}
```

For globally

```jsx
function App(){
return <>
	<PermissionContext.Provider> 
	...
	</PermissionContext.Provider>
</>
```