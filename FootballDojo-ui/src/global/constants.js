// Helper Functions
export const isNonEmptyObject = obj => obj && Object.keys(obj).length > 0;
export const isNonEmptyListObject = obj => obj && obj.length > 0;

export const formatUtcDate = (utcDate) => {
    const date = new Date(utcDate);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${month} - ${day} - ${year}`;
}

export const formatDateForFixtureProfile = (dateStr) => {
    if (!dateStr) return '';

    // Remove spaces around hyphens
    const cleanStr = dateStr.replace(/\s+/g, '');

    const [month, day, year] = cleanStr.split('-');
    const date = new Date(`${year}-${month}-${day}`);

    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatUtcDateForHeadToHeadGrid = (utcDate) => {
    if (!utcDate) return '';

    const date = new Date(utcDate);

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const convertCmToFeetInches = (cmString) => {
    const cm = parseFloat(cmString); // Extract number
    if (isNaN(cm)) return "";

    const totalInches = cm / 2.54; // 1 inch = 2.54 cm
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    return `${feet}'${inches}"`;
};

export const convertKgToLbs = (kgString) => {
    const kg = parseFloat(kgString); // Extract number
    if (isNaN(kg)) return "";

    const lbs = kg * 2.20462; // 1 kg = 2.20462 lbs
    return `${lbs.toFixed(1)} lbs`;
};

export const getGoalColor = (theme, teamGoals, otherGoals) => {
    if (teamGoals > otherGoals)
        return {
            bg: theme.palette.mode === "dark" ? DARKMODE_GREEN : LIGHTMODE_GREEN,
            fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
        };
    if (teamGoals < otherGoals)
        return {
            bg: theme.palette.mode === "dark" ? DARKMODE_RED : LIGHTMODE_RED,
            fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
        };
    return {
        bg: theme.palette.grey[500],
        fg: theme.palette.getContrastText(theme.palette.grey[500])
    };
};

// Button and Bubble color combos
export const DARKMODE_GREEN = "#006400";
export const LIGHTMODE_GREEN = "#90ee90";
export const DARKMODE_PURPLE = "#4b0052";
export const LIGHTMODE_PURPLE = "#d9b3ff";
export const DARKMODE_RED = "#8b0000";
export const LIGHTMODE_RED = "#ff7f7f";
export const DARKMODE_TEXT = "#ffffff";
export const LIGHTMODE_TEXT = "#000000";
export const DARKMODE_GRID_BORDER = "2px solid #ccc";
export const LIGHTMODE_GRID_BORDER = "2px solid #000000";

// Europe's Top 5 Leagues
export const TOP5LEAGUES = [
    { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png" },
    { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png" },
    { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png" },
    { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png" },
    { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png" }
];

// Position Sort Order
export const POSITION_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

// Formations
export const FORMATIONS = {
    "3-4-3": [
        { id: "4:1", label: "LW", role: "Attacker", top: "10%", left: "20%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "10%", left: "50%" },
        { id: "4:3", label: "RW", role: "Attacker", top: "10%", left: "80%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "38%", left: "20%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "38%", left: "40%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "38%", left: "60%" },
        { id: "3:4", label: "RM", role: "Midfielder", top: "38%", left: "80%" },

        { id: "2:1", label: "CB", role: "Defender", top: "64%", left: "20%" },
        { id: "2:2", label: "CB", role: "Defender", top: "64%", left: "50%" },
        { id: "2:3", label: "CB", role: "Defender", top: "64%", left: "80%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "3-5-1-1": [
        { id: "5:1", label: "ST", role: "Attacker", top: "3%", left: "50%" },

        { id: "4:1", label: "CF", role: "Attacker", top: "21%", left: "50%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "40%", left: "13%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "40%", left: "32%" },
        { id: "3:3", label: "CAM", role: "Midfielder", top: "40%", left: "50%" },
        { id: "3:4", label: "CM", role: "Midfielder", top: "40%", left: "68%" },
        { id: "3:5", label: "RM", role: "Midfielder", top: "40%", left: "87%" },

        { id: "2:1", label: "CB", role: "Defender", top: "64%", left: "20%" },
        { id: "2:2", label: "CB", role: "Defender", top: "64%", left: "50%" },
        { id: "2:3", label: "CB", role: "Defender", top: "64%", left: "80%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "3-5-2": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "28%", left: "15%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "38%", left: "30%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "38%", left: "70%" },
        { id: "3:4", label: "RM", role: "Midfielder", top: "28%", left: "85%" },
        { id: "3:5", label: "CAM", role: "Midfielder", top: "28%", left: "50%" },

        { id: "2:1", label: "CB", role: "Defender", top: "63%", left: "20%" },
        { id: "2:2", label: "CB", role: "Defender", top: "63%", left: "50%" },
        { id: "2:3", label: "CB", role: "Defender", top: "63%", left: "80%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "3-4-2-1": [
        { id: "5:1", label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: "4:1", label: "LAM", role: "Midfielder", top: "18%", left: "35%" },
        { id: "4:2", label: "RAM", role: "Midfielder", top: "18%", left: "65%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "40%", left: "20%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "40%", left: "40%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "40%", left: "60%" },
        { id: "3:4", label: "RM", role: "Midfielder", top: "40%", left: "80%" },

        { id: "2:1", label: "CB", role: "Defender", top: "62%", left: "20%" },
        { id: "2:2", label: "CB", role: "Defender", top: "62%", left: "50%" },
        { id: "2:3", label: "CB", role: "Defender", top: "62%", left: "80%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-3-3": [
        { id: "4:1", label: "LW", role: "Attacker", top: "10%", left: "25%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "50%" },
        { id: "4:3", label: "RW", role: "Attacker", top: "10%", left: "75%" },

        { id: "3:1", label: "CM", role: "Midfielder", top: "37%", left: "25%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "37%", left: "50%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "37%", left: "75%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-4-2": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "25%", left: "25%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "40%", left: "40%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "40%", left: "60%" },
        { id: "3:4", label: "RM", role: "Midfielder", top: "25%", left: "75%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-2-3-1": [
        { id: "5:1", label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: "4:1", label: "LAM", role: "Midfielder", top: "24%", left: "25%" },
        { id: "4:2", label: "CAM", role: "Midfielder", top: "24%", left: "50%" },
        { id: "4:3", label: "RAM", role: "Midfielder", top: "24%", left: "75%" },

        { id: "3:1", label: "CDM", role: "Midfielder", top: "44%", left: "40%" },
        { id: "3:2", label: "CDM", role: "Midfielder", top: "44%", left: "60%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-5-1": [
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "25%", left: "20%" },
        { id: "3:2", label: "RM", role: "Midfielder", top: "25%", left: "80%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "35%", left: "35%" },
        { id: "3:4", label: "CM", role: "Midfielder", top: "35%", left: "65%" },
        { id: "3:5", label: "CDM", role: "Midfielder", top: "45%", left: "50%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-1-4-1": [
        { id: "5:1", label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: "4:1", label: "LM", role: "Midfielder", top: "25%", left: "20%" },
        { id: "4:2", label: "CM", role: "Midfielder", top: "25%", left: "40%" },
        { id: "4:3", label: "CM", role: "Midfielder", top: "25%", left: "60%" },
        { id: "4:4", label: "RM", role: "Midfielder", top: "25%", left: "80%" },

        { id: "3:1", label: "CDM", role: "Midfielder", top: "45%", left: "50%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-3-1-2": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: "3:1", label: "CAM", role: "Midfielder", top: "18%", left: "50%" },

        { id: "3:2", label: "CM", role: "Midfielder", top: "35%", left: "30%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "35%", left: "70%" },
        { id: "3:4", label: "CDM", role: "Midfielder", top: "45%", left: "50%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "4-2-2-2": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: "3:1", label: "LAM", role: "Midfielder", top: "24%", left: "25%" },
        { id: "3:2", label: "RAM", role: "Midfielder", top: "24%", left: "75%" },

        { id: "3:3", label: "CDM", role: "Midfielder", top: "43%", left: "40%" },
        { id: "3:4", label: "CDM", role: "Midfielder", top: "43%", left: "60%" },

        { id: "2:1", label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: "2:4", label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "5-3-2": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: "4:2", label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: "3:1", label: "CM", role: "Midfielder", top: "30%", left: "30%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "30%", left: "70%" },
        { id: "3:3", label: "CDM", role: "Midfielder", top: "40%", left: "50%" },

        { id: "2:1", label: "LWB", role: "Defender", top: "55%", left: "15%" },
        { id: "2:2", label: "CB", role: "Defender", top: "65%", left: "30%" },
        { id: "2:3", label: "CB", role: "Defender", top: "65%", left: "50%" },
        { id: "2:4", label: "CB", role: "Defender", top: "65%", left: "70%" },
        { id: "2:5", label: "RWB", role: "Defender", top: "55%", left: "85%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ],

    "5-4-1": [
        { id: "4:1", label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: "3:1", label: "LM", role: "Midfielder", top: "20%", left: "20%" },
        { id: "3:2", label: "CM", role: "Midfielder", top: "32%", left: "40%" },
        { id: "3:3", label: "CM", role: "Midfielder", top: "32%", left: "60%" },
        { id: "3:4", label: "RM", role: "Midfielder", top: "20%", left: "80%" },

        { id: "2:1", label: "LWB", role: "Defender", top: "47%", left: "15%" },
        { id: "2:2", label: "RWB", role: "Defender", top: "47%", left: "85%" },
        { id: "2:3", label: "CB", role: "Defender", top: "62%", left: "28%" },
        { id: "2:4", label: "CB", role: "Defender", top: "62%", left: "50%" },
        { id: "2:5", label: "CB", role: "Defender", top: "62%", left: "72%" },

        { id: "1:1", label: "GK", role: "Goalkeeper", top: "83%", left: "50%" }
    ]
};