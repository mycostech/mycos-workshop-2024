"use strict";(self.webpackChunkreact_cmu_docs_2024=self.webpackChunkreact_cmu_docs_2024||[]).push([[7668],{3728:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(4848),s=t(8453);const o={sidebar_position:1},a="Day two workshop",i={id:"day-two",title:"Day two workshop",description:"link game",source:"@site/docs/day-two.md",sourceDirName:".",slug:"/day-two",permalink:"/mycos-workshop-2024/docs/day-two",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Tutorial Intro",permalink:"/mycos-workshop-2024/docs/intro"}},l={},c=[{value:"clone project",id:"clone-project",level:2},{value:"create <code>.env</code> file",id:"create-env-file",level:2},{value:"All available API functions",id:"all-available-api-functions",level:2},{value:"First page code",id:"first-page-code",level:2},{value:"Main Game page code",id:"main-game-page-code",level:2},{value:"logic code",id:"logic-code",level:3},{value:"Score Page",id:"score-page",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"day-two-workshop",children:"Day two workshop"})}),"\n",(0,r.jsxs)(n.p,{children:["link game\n",(0,r.jsx)(n.a,{href:"https://happy-flower-0562fe610.5.azurestaticapps.net/",children:"hue-hunter-game"})]}),"\n",(0,r.jsxs)(n.p,{children:["or ",(0,r.jsx)(n.a,{href:"https://bit.ly/hue-hunter",children:"https://bit.ly/hue-hunter"})]}),"\n",(0,r.jsx)(n.p,{children:"or"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"link-qr",src:t(7256).A+"",width:"656",height:"656"})}),"\n",(0,r.jsx)(n.h2,{id:"clone-project",children:"clone project"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"https://github.com/mycostech/mycos-workshop-2024\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"create-env-file",children:["create ",(0,r.jsx)(n.code,{children:".env"})," file"]}),"\n",(0,r.jsxs)(n.p,{children:["Create ",(0,r.jsx)(n.code,{children:".env"})," in the root project folder"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-env",children:"VITE_WS_URL=https://mycos-react-training-2023.azurewebsites.net/scoreHub\nVITE_API_URL=https://mycos-react-training-2023.azurewebsites.net/api/appscore\nVITE_SESSION_ID=9EA18E08-AB5C-4BAD-8E31-045668BF3216\n"})}),"\n",(0,r.jsx)(n.h2,{id:"all-available-api-functions",children:"All available API functions"}),"\n",(0,r.jsxs)(n.p,{children:["stored in folder ",(0,r.jsx)(n.code,{children:"src/api/appScore.ts"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",metastring:"{22,27,32} showLineNumbers",children:"import axios from 'axios';\n\nconst apiUrl = import.meta.env.VITE_API_URL\nconst sessionId = import.meta.env.VITE_SESSION_ID\n\nconst axiosInstance = axios.create({\n    baseURL: apiUrl, // Replace with your API's base URL\n    timeout: 10000, // Optional timeout, adjust as needed\n    headers: {\n        'Content-Type': 'application/json',\n        '_SESSIONID ': sessionId\n        // Add other headers as needed, e.g., Authorization\n    },\n});\n\ninterface IScoreBody{\n    appName: string\n    userName: string\n    score: number\n}\n\nconst getAllListChannel = async() => {\n    const res = await axiosInstance.get('/ListChannel')\n    return res.data\n}\n\nconst getScoreByAppName = async(appName: string) => {\n    const res = await axiosInstance.get(`/GetScores/${appName}`)\n    return res.data\n}\n\nconst submitScore = async(data: IScoreBody) => {\n    const res = await axiosInstance.post('/SubmitScore', data)\n    return res.data\n}\n\nexport {\n    getAllListChannel,\n    getScoreByAppName,\n    submitScore\n}\n\n"})}),"\n",(0,r.jsx)(n.h2,{id:"first-page-code",children:"First page code"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/mycostech/mycos-workshop-2024/pull/6/files",children:"first home page code"})}),"\n",(0,r.jsx)(n.h2,{id:"main-game-page-code",children:"Main Game page code"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/mycostech/mycos-workshop-2024/pull/7/files",children:"main game page code"})}),"\n",(0,r.jsx)(n.h3,{id:"logic-code",children:"logic code"}),"\n",(0,r.jsxs)(n.p,{children:["File stored in ",(0,r.jsx)(n.code,{children:"src/pages/GamePage/core/ColorSpotGame.ts"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",metastring:"{14,58,79,108,114} showLineNumbers",children:"class ColorSpotGame {\n    private levels: number;\n    private stagesPerLevel: number;\n    private currentLevel: number;\n    private currentStage: number;\n\n    constructor(levels: number, stages: number) {\n        this.levels = levels;\n        this.stagesPerLevel = stages;\n        this.currentLevel = 1;\n        this.currentStage = 1;\n    }\n\n    getGameNextLevel(): { dots: string[], resultIdx: number } {\n        // TO DO:\n        // Generate a random base color for the level\n        const baseColor = this.getRandomColor();\n\n        // Convert base color to HSL\n        const hsl = this.hexToHSL(baseColor);\n\n        //Create Grid Size\n        const level = this.currentLevel;\n        const gridSize = this.calculateGridSize(level);\n\n        // Adjust lightness only, keeping hue and saturation consistent\n        // Randomly make the different color lighter or darker\n        let lightnessDifference\n        if (level < 5) {\n            lightnessDifference = Math.random() > 0.5 ? 10 : -10; // Randomly make the different color lighter or darker\n\n        } else if (level < 10) {\n            lightnessDifference = Math.random() > 0.5 ? 7 : -7\n        } else if (level < 15) {\n            lightnessDifference = Math.random() > 0.5 ? 4 : -4\n        } else {\n            lightnessDifference = Math.random() > 0.5 ? 2 : -2\n        }\n\n        // Ensure lightness stays within bounds\n        const diffColor = this.HSLToHex(hsl.h, hsl.s, Math.min(100, hsl.l + lightnessDifference));\n\n        // Generate an array of base color dots\n        const dots = Array(gridSize).fill(baseColor);\n\n        //Create random index (defferent color index)\n        const randomIndex = Math.floor(Math.random() * dots.length);\n\n        // Replace one dot with the different color\n        dots[randomIndex] = diffColor.toUpperCase();\n\n        return {\n           dots: dots,\n           resultIdx: randomIndex\n        };\n    }\n\n    nextStage() {\n        // TO DO:\n        console.log(`Level ${this.currentLevel} - Stage : ${this.currentStage} of : ${this.stagesPerLevel}`)\n        /*\n        //Check condition for go to next stage    \n        if (condition) {\n            // if stage less than level\n            \n        } else {\n            // if stage more than level   \n        }\n        */\n        if (this.currentStage < this.stagesPerLevel) {\n            this.currentStage++;\n        } else {\n            return this.nextLevel();\n        }\n        return true;\n    }\n\n    // Time will calculate in second\n    getScore(time: number): number {\n        const BASE_SCORE = 100; // Base score for completing a stage\n        const LEVEL_WEIGHT = 50; // Weight for each level\n        const STAGE_WEIGHT = 20; // Weight for each stage\n        const TIME_WEIGHT = 1; // Decrease score depends on time counter\n        // Logic for calculate score\n        const score = BASE_SCORE\n            + (this.currentLevel * LEVEL_WEIGHT)\n            + (this.currentStage * STAGE_WEIGHT)\n            - (time * TIME_WEIGHT);\n\n        // TO DO:\n        /*\n        if(condition){\n            //case: when current level = 1 and curent stage = 1 (Game over in lv.1 stage 1)\n            // return score = 0\n        }else{\n            // Round the score to the nearest integer and ensure it is not negative\n            // return rounding score.\n        }\n        */\n        if(this.currentLevel === 1 && this.currentStage ===1){\n            return 0\n        }else{\n            return Math.max(Math.round(score), 0)\n        }\n        \n    }\n\n    getCurrentLevel() {\n        // TO DO:\n        // return current level\n        return this.currentLevel;\n    }\n\n    getCurrentStage() {\n        // TO DO:\n        // current stage\n        return this.currentStage;\n    }\n\n    private nextLevel() {\n    // TO DO:\n    /*\n        if (this.currentLevel < this.levels) {\n            //Case: Go to next stage.\n            //if current level less than level.\n            // increment current level\n\n            // Reset stage to 1 when moving to the next level\n\n            // return true\n\n        } else {\n            // if current level more than level\n            // That means complete all level.\n            // return false\n        }\n    */\n        if (this.currentLevel < this.levels) {\n            // increment current level\n            this.currentLevel++;\n\n            // Reset stage to 1 when moving to the next level\n            this.currentStage = 1; \n            return true;\n        } else {\n            console.log('You have completed all levels!');\n            return false;\n        }\n        return true\n    }\n\n\n    // Convert hex to HSL\n    private hexToHSL(hex: string) {\n        const r = parseInt(hex.slice(1, 3), 16) / 255;\n        const g = parseInt(hex.slice(3, 5), 16) / 255;\n        const b = parseInt(hex.slice(5, 7), 16) / 255;\n\n        const max = Math.max(r, g, b);\n        const min = Math.min(r, g, b);\n        let h: number = 0, s: number = 0\n        const l: number = (max + min) / 2;\n\n        if (max !== min) {\n            const d = max - min;\n            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);\n            switch (max) {\n                case r: h = (g - b) / d + (g < b ? 6 : 0); break;\n                case g: h = (b - r) / d + 2; break;\n                case b: h = (r - g) / d + 4; break;\n            }\n            h /= 6;\n        }\n\n        return { h: h * 360, s: s * 100, l: l * 100 };\n    }\n\n    private HSLToHex(h: number, s: number, l: number): string {\n        // Normalize the input values\n        h = h % 360; // Ensure h is within [0, 360)\n        s = Math.max(0, Math.min(100, s)); // Clamp s between [0, 100]\n        l = Math.max(0, Math.min(100, l)); // Clamp l between [0, 100]\n\n        s /= 100;\n        l /= 100;\n\n        const c = (1 - Math.abs(2 * l - 1)) * s;\n        const x = c * (1 - Math.abs((h / 60) % 2 - 1));\n        const m = l - c / 2;\n\n        let r: number = 0, g: number = 0, b: number = 0;\n\n        if (h >= 0 && h < 60) {\n            r = c;\n            g = x;\n            b = 0;\n        } else if (h >= 60 && h < 120) {\n            r = x;\n            g = c;\n            b = 0;\n        } else if (h >= 120 && h < 180) {\n            r = 0;\n            g = c;\n            b = x;\n        } else if (h >= 180 && h < 240) {\n            r = 0;\n            g = x;\n            b = c;\n        } else if (h >= 240 && h < 300) {\n            r = x;\n            g = 0;\n            b = c;\n        } else if (h >= 300 && h < 360) {\n            r = c;\n            g = 0;\n            b = x;\n        }\n\n        // Adding a fallback mechanism in case the calculations yield unexpected NaN values\n        if (isNaN(r)) r = 0;\n        if (isNaN(g)) g = 0;\n        if (isNaN(b)) b = 0;\n\n        r = Math.round((r + m) * 255);\n        g = Math.round((g + m) * 255);\n        b = Math.round((b + m) * 255);\n\n        const toHex = (value: number) => value.toString(16).padStart(2, '0');\n        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;\n    }\n\n    // Function to generate a random color\n    private getRandomColor(): string {\n        const letters = '0123456789ABCDEF';\n        let color = '#';\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n    private calculateGridSize(level: number): number {\n        // The grid size is the square root of the number of elements.\n        // Break down the difficulty related to the max level of the game\n        level = level + 1;\n        return level * level;\n    }\n}\n\nexport default ColorSpotGame;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"score-page",children:"Score Page"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/mycostech/mycos-workshop-2024/pull/8/files",children:"score page"})})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},7256:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/bit.ly_hue-hunter-acd29b8ed891b606cae8e68b746c1c90.jpeg"},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var r=t(6540);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);