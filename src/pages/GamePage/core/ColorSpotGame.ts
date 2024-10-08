class ColorSpotGame {
    private levels: number;
    private stagesPerLevel: number;
    private currentLevel: number;
    private currentStage: number;

    constructor(levels: number, stages: number) {
        this.levels = levels;
        this.stagesPerLevel = stages;
        this.currentLevel = 1;
        this.currentStage = 1;
    }

    getGameNextLevel(): { dots: string[], resultIdx: number } {
        const level = this.currentLevel;
        const baseColor = this.getRandomColor(); // Generate a random base color for the level
        const hsl = this.hexToHSL(baseColor); // Convert base color to HSL
        const gridSize = this.calculateGridSize(level);
        console.log(gridSize);

        // Adjust lightness only, keeping hue and saturation consistent
        let lightnessDifference
        if (level < 5) {
            lightnessDifference = Math.random() > 0.5 ? 10 : -10; // Randomly make the different color lighter or darker

        } else if (level < 10) {
            lightnessDifference = Math.random() > 0.5 ? 7 : -7
        } else if (level < 15) {
            lightnessDifference = Math.random() > 0.5 ? 4 : -4
        } else {
            lightnessDifference = Math.random() > 0.5 ? 2 : -2
        }
        const diffColor = this.HSLToHex(hsl.h, hsl.s, Math.min(100, hsl.l + lightnessDifference)); // Ensure lightness stays within bounds

        const dots = Array(gridSize).fill(baseColor); // Generate an array of base color dots
        const randomIndex = Math.floor(Math.random() * dots.length);
        dots[randomIndex] = diffColor.toUpperCase(); // Replace one dot with the different color

        return {
            dots,
            resultIdx: randomIndex
        };
    };

    nextStage() {
        console.log(`Level ${this.currentLevel} - Stage : ${this.currentStage} of : ${this.stagesPerLevel}`)
        if (this.currentStage < this.stagesPerLevel) {
            this.currentStage++;
        } else {
            return this.nextLevel();
        }
        return true;
    }

    // Time will calculate in second
    getScore(time: number): number {
        const BASE_SCORE = 100; // Base score for completing a stage
        const LEVEL_WEIGHT = 50; // Weight for each level
        const STAGE_WEIGHT = 20; // Weight for each stage
        const TIME_WEIGHT = 1; // Decrease score depends on time counter
        const score = BASE_SCORE
            + (this.currentLevel * LEVEL_WEIGHT)
            + (this.currentStage * STAGE_WEIGHT)
            - (time * TIME_WEIGHT);

        // Round the score to the nearest integer and ensure it is not negative
        return this.currentLevel === 1 && this.currentStage ===1 ? 0 : Math.max(Math.round(score), 0);
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getCurrentStage() {
        return this.currentStage;
    }


    // Convert hex to HSL
    private hexToHSL(hex: string) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number = 0, s: number = 0
        const l: number = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    };

    private HSLToHex(h: number, s: number, l: number): string {
        // Normalize the input values
        h = h % 360; // Ensure h is within [0, 360)
        s = Math.max(0, Math.min(100, s)); // Clamp s between [0, 100]
        l = Math.max(0, Math.min(100, l)); // Clamp l between [0, 100]

        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r: number = 0, g: number = 0, b: number = 0;

        if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (h >= 240 && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (h >= 300 && h < 360) {
            r = c;
            g = 0;
            b = x;
        }

        // Adding a fallback mechanism in case the calculations yield unexpected NaN values
        if (isNaN(r)) r = 0;
        if (isNaN(g)) g = 0;
        if (isNaN(b)) b = 0;

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        const toHex = (value: number) => value.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    // Function to generate a random color
    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    private calculateGridSize(level: number): number {
        // The grid size is the square root of the number of elements.
        // Break down the difficulty related to the max level of the game
        level = level + 1;
        return level * level;
    }

    private nextLevel() {
        if (this.currentLevel < this.levels) {
            this.currentLevel++;
            this.currentStage = 1; // Reset stage to 1 when moving to the next level
            return true;
        } else {
            console.log('You have completed all levels!');
            return false;
        }
    }
}

export default ColorSpotGame;