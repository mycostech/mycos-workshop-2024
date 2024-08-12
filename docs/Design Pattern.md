# Design Pattern

React design patterns are reusable solutions to common problems encountered during React development. 

- **Enhance code readability and maintainability:** Well-defined patterns make code more self-explanatory and easier to understand, reducing the time and effort required for maintenance and future development.
- **Promote code reusability:** React design patterns encourage the creation of modular and reusable components, allowing you to avoid repetitive coding.

## **Container/Presentational pattern**

1. **Presentational Components**:
    - These components focus on **how data is shown to the user**. They handle rendering and styling without altering the data they receive.
    - Typically, presentational components are **stateless** (they don’t manage their own React state) unless they need a UI-related state.
    
    ```jsx
    // DogImages.js (Presentational Component)
    import React from "react";
    
    function DogImages({ dogs }) {
      return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
    }
    ```
    
2. **Container Components**:
    - These components handle **data fetching and application logic**. They pass data to the presentational components they contain.
    - Container components usually don’t render other components directly; their primary purpose is to manage data.
    - Example
    
    ```jsx
    // DogImagesContainer.js (Container Component)
    import React from "react";
    import DogImages from "./DogImages";
    
    export default class DogImagesContainer extends React.Component {
      // Fetch dog images from an API and manage state here
      // ...
    
      render() {
        return <DogImages dogs={/* Pass fetched dog images here */} />;
      }
    }
    ```
    
3. **The Business Logic Layer**
    - **Hooks** — Custom hooks for data processing and caching.
    - **Utilities** — Pure function helpers for sorting, filtering, etc.
    - **Context** — Global state management if needed.
    
    Here’s an example custom hook `hooks/useData.js` in this layer:
    
    ```
    // hooks/useData.js
    
    import { useEffect, useState } from 'react';
    import { fetchData } from '../api';
    
    export const useData = () => {
      const [data, setData] = useState(null);
    
      useEffect(() => {
        const fetchAndSetData = async () => {
          const data = await fetchData();
          setData(data);
        }
    
        fetchAndSetData();
      }, []);
    
      return { data };
    }
    ```
    
    ## Directory Layout
    
    ```jsx
    my-react-app/
    ├── src/
    │ ├── components/
    │ │ ├── FilterSlider 
    | | |  ├── useFilterSlider.ts // or create hooks directory for container the hooks.
    | | |  ├── FilterSliderContext.ts // or create context directory for container the context.
    | | |  ├── FilterSlider.test.ts // or create test directory for container the test files.
    | | |  ├── FilterSlider.tsx
    | | |  ├── FilterSlider.scss
    │ │ └── …
    │ ├── pages/  
    │ │ ├── Home.ts
    │ │ ├── About.ts
    │ │ ├── Contact.ts
    │ │ └── …
    | ├── hooks/ // for contains globally hook
    │ ├── assets/
    │ │ ├── images/
    │ │ ├── styles/
    │ │ └── …
    │ ├── App.ts
    │ ├── index.ts
    │ └── …
    ├── public/
    │ ├── index.html
    │ ├── manifest.json
    │ └── …
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── …
    ```