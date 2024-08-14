# React Component
What is Component, is the Unit of Work to do any Job of React Like;
- Build User Interface
- Render HTML
- Build user interactive like click scrollable
- ETC.

## Hello World
Component to render Hello Word text

```typescript
export const HelloWorld () => {
    return (
        <p>
            Hello world
        </p>
    )
}
```
detail?
create a component like create a function in javascript.

first, `export` this API (reserve word) use to export this component called HelloWorld to other component can see and use itself.

HelloWord, component name always naming with PascalCase.

return, render API of React's Component in this case render paragraph html with content "Hello world"

Example: 

[![StackBlitz Example](https://img.shields.io/badge/Preview-StackBlitz-blue)](https://stackblitz.com/edit/mycos-component?embed=1&file=src%2FApp.tsx)


<iframe src="https://stackblitz.com/edit/mycos-component?embed=1&file=src%2FApp.tsx&embed=1" style="width: 100%; height: 300px; border: 0;"></iframe>




