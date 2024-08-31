"use strict";(self.webpackChunkreact_cmu_docs_2024=self.webpackChunkreact_cmu_docs_2024||[]).push([[6965],{9988:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var o=t(4848),r=t(8453);const s={sidebar_position:5},i="More about JSX",c={id:"jsx",title:"More about JSX",description:"JSX not only show html or render props",source:"@site/docs/jsx.md",sourceDirName:".",slug:"/jsx",permalink:"/mycos-workshop-2024/docs/jsx",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Basic Typescript",permalink:"/mycos-workshop-2024/docs/basic-typescript"},next:{title:"State And Event",permalink:"/mycos-workshop-2024/docs/state-and-event"}},a={},d=[{value:"Fragment",id:"fragment",level:2},{value:"Inline Style",id:"inline-style",level:2},{value:"Condition",id:"condition",level:2},{value:"One IF",id:"one-if",level:3},{value:"If Else",id:"if-else",level:3}];function l(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"more-about-jsx",children:"More about JSX"})}),"\n",(0,o.jsx)(e.p,{children:"JSX not only show html or render props"}),"\n",(0,o.jsxs)(e.p,{children:["we will re-used ",(0,o.jsx)(e.code,{children:"MyName"})," Component for this section"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"// MyName.tsx\ntype MyNameProps = {\n\tname: string,\n\tage: number,\n}\n\nexport const MyName = (props: MyNameProps) => {\n\tconst name = props.name\n\tconst age = props.age\n\treturn (\n\t\t<p>\n\t\t\tHi {name} I am {age} years old.\n\t\t</p>\n\t)\n}\n"})}),"\n",(0,o.jsx)(e.h2,{id:"fragment",children:"Fragment"}),"\n",(0,o.jsx)(e.p,{children:"Commonly, Root JSX in return of Component, should have one level."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:'// BAD\nreturn (\n    <p>Name</p>\n    <p>Age</p>\n)\n\n// GOOD\nreturn (\n    <div>\n        <p>Name</p>\n        <p>Age</p>\n    </div>\n)\n\n\n// GOOD with reduce dow tree level with React Fragment\nimport { Fragment } from "react";\n\nreturn (\n    <Fragment>\n        <p>Name</p>\n        <p>Age</p>\n    </Fragment>\n)\n\n// Shorter Version\n\nreturn (\n    <>\n        <p>Name</p>\n        <p>Age</p>\n    </>\n)\n'})}),"\n",(0,o.jsx)(e.h2,{id:"inline-style",children:"Inline Style"}),"\n",(0,o.jsx)(e.p,{children:"Before this section we mention inline style, here we go"}),"\n",(0,o.jsxs)(e.p,{children:["JSX can inline style with ",(0,o.jsx)(e.code,{children:"object"}),"only. Forgot it? back to Basic Typescript."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",metastring:"{4-7}",children:"return (\n\t<>\n\t\t<p\n\t\tstyle={{\n\t\t\tcolor: \"red\",\n\t\t\tfontSize: '24px',\n\t\t}}\n\t\t>\n\t\t\tName\n\t\t</p>\n\t\t<p>Age</p>\n\t</>\n)\n"})}),"\n",(0,o.jsx)(e.h2,{id:"condition",children:"Condition"}),"\n",(0,o.jsx)(e.p,{children:"JSX can do condition"}),"\n",(0,o.jsx)(e.h3,{id:"one-if",children:"One IF"}),"\n",(0,o.jsx)(e.p,{children:"Example one if condition; if age greater than or equal 20, can go inside pub"}),"\n",(0,o.jsxs)(e.p,{children:["Do condition inside expression ",(0,o.jsx)(e.code,{children:"{}"})]}),"\n",(0,o.jsxs)(e.p,{children:["Use ",(0,o.jsx)(e.code,{children:"&&"})," after condition"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",metastring:"{6}",children:"//MyName.tsx\n\nreturn (\n\t<>\n\t\t<p>Name</p>\n\t\t{age >= 20 && <p>Can go inside pub</p>}\n\t</>\n)\n"})}),"\n",(0,o.jsx)(e.h3,{id:"if-else",children:"If Else"}),"\n",(0,o.jsx)(e.p,{children:"if have more than one condition; if age >= 18 I can voted., else I am too young."}),"\n",(0,o.jsxs)(e.p,{children:["Use ",(0,o.jsx)(e.code,{children:"short if"})," of JavaScript"]}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.code,{children:"condition ? 'if true' : 'else'"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",metastring:"{4}",children:'return (\n\t<>\n\t\t<p>Name</p>\n\t\t<p>{age >= 18 ? "I can voted." : "I am too young."}</p>\n\t</>\n)\n'})}),"\n",(0,o.jsxs)(e.p,{children:["Now we warp expression to inside ",(0,o.jsx)(e.code,{children:"<p>"})," instead, then it have to print string in both condition."]})]})}function p(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>c});var o=t(6540);const r={},s=o.createContext(r);function i(n){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),o.createElement(s.Provider,{value:e},n.children)}}}]);