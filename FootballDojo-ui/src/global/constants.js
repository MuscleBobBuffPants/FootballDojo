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

// Allow Attackers for Certain Positions
export const POSSIBLE_ATTACKER_POSITIONS = ["ST", "LW", "RW", "CF", "LM", "RM"];

// Formations
export const FORMATIONS = {
    "3-4-3": [
        { id: 2, label: "LW", role: "Attacker", top: "10%", left: "20%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "50%" },
        { id: 4, label: "RW", role: "Attacker", top: "10%", left: "80%" },

        { id: 5, label: "LM", role: "Midfielder", top: "35%", left: "20%" },
        { id: 6, label: "CM", role: "Midfielder", top: "28%", left: "50%" },
        { id: 7, label: "RM", role: "Midfielder", top: "35%", left: "80%" },
        { id: 8, label: "CDM", role: "Midfielder", top: "48%", left: "50%" },

        { id: 9, label: "CB", role: "Defender", top: "65%", left: "20%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "80%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "3-5-2": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: 4, label: "LM", role: "Midfielder", top: "25%", left: "15%" },
        { id: 5, label: "RM", role: "Midfielder", top: "25%", left: "85%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "30%" },
        { id: 7, label: "CM", role: "Midfielder", top: "35%", left: "70%" },
        { id: 8, label: "CAM", role: "Midfielder", top: "25%", left: "50%" },

        { id: 9, label: "CB", role: "Defender", top: "65%", left: "20%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "80%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "3-4-2-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LAM", role: "Midfielder", top: "15%", left: "35%" },
        { id: 4, label: "RAM", role: "Midfielder", top: "15%", left: "65%" },

        { id: 5, label: "LM", role: "Midfielder", top: "35%", left: "20%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "40%" },
        { id: 7, label: "CM", role: "Midfielder", top: "35%", left: "60%" },
        { id: 8, label: "RM", role: "Midfielder", top: "35%", left: "80%" },

        { id: 9, label: "CB", role: "Defender", top: "65%", left: "20%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "80%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-3-3": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },
        { id: 3, label: "LW", role: "Attacker", top: "10%", left: "25%" },
        { id: 4, label: "RW", role: "Attacker", top: "10%", left: "75%" },

        { id: 5, label: "CM", role: "Midfielder", top: "35%", left: "30%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "70%" },
        { id: 7, label: "CDM", role: "Midfielder", top: "45%", left: "50%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-4-2": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: 4, label: "LM", role: "Midfielder", top: "25%", left: "25%" },
        { id: 5, label: "RM", role: "Midfielder", top: "25%", left: "75%" },
        { id: 6, label: "CM", role: "Midfielder", top: "40%", left: "40%" },
        { id: 7, label: "CM", role: "Midfielder", top: "40%", left: "60%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-2-3-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LW", role: "Attacker", top: "15%", left: "20%" },
        { id: 4, label: "CAM", role: "Midfielder", top: "25%", left: "50%" },
        { id: 5, label: "RW", role: "Attacker", top: "15%", left: "80%" },

        { id: 6, label: "CDM", role: "Midfielder", top: "45%", left: "35%" },
        { id: 7, label: "CDM", role: "Midfielder", top: "45%", left: "65%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-5-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LM", role: "Midfielder", top: "20%", left: "20%" },
        { id: 4, label: "CM", role: "Midfielder", top: "40%", left: "35%" },
        { id: 5, label: "CM", role: "Midfielder", top: "40%", left: "65%" },
        { id: 6, label: "RM", role: "Midfielder", top: "20%", left: "80%" },
        { id: 7, label: "CAM", role: "Midfielder", top: "25%", left: "50%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-1-4-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LM", role: "Midfielder", top: "25%", left: "20%" },
        { id: 4, label: "CM", role: "Midfielder", top: "25%", left: "40%" },
        { id: 5, label: "CM", role: "Midfielder", top: "25%", left: "60%" },
        { id: 6, label: "RM", role: "Midfielder", top: "25%", left: "80%" },

        { id: 7, label: "CDM", role: "Midfielder", top: "45%", left: "50%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-3-1-2": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "35%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "65%" },

        { id: 4, label: "CAM", role: "Midfielder", top: "15%", left: "50%" },

        { id: 5, label: "CM", role: "Midfielder", top: "35%", left: "30%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "50%" },
        { id: 7, label: "CM", role: "Midfielder", top: "35%", left: "70%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-2-2-2": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: 4, label: "CAM", role: "Midfielder", top: "25%", left: "35%" },
        { id: 5, label: "CAM", role: "Midfielder", top: "25%", left: "65%" },

        { id: 6, label: "CDM", role: "Midfielder", top: "45%", left: "40%" },
        { id: 7, label: "CDM", role: "Midfielder", top: "45%", left: "60%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "5-3-2": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "60%" },

        { id: 4, label: "CM", role: "Midfielder", top: "35%", left: "25%" },
        { id: 5, label: "CM", role: "Midfielder", top: "35%", left: "50%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "75%" },

        { id: 7, label: "LWB", role: "Defender", top: "55%", left: "15%" },
        { id: 8, label: "RWB", role: "Defender", top: "55%", left: "85%" },
        { id: 9, label: "CB", role: "Defender", top: "70%", left: "25%" },
        { id: 10, label: "CB", role: "Defender", top: "70%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "70%", left: "75%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "5-4-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LM", role: "Midfielder", top: "25%", left: "20%" },
        { id: 4, label: "CM", role: "Midfielder", top: "35%", left: "40%" },
        { id: 5, label: "CM", role: "Midfielder", top: "35%", left: "60%" },
        { id: 6, label: "RM", role: "Midfielder", top: "25%", left: "80%" },

        { id: 7, label: "LWB", role: "Defender", top: "55%", left: "15%" },
        { id: 8, label: "RWB", role: "Defender", top: "55%", left: "85%" },
        { id: 9, label: "CB", role: "Defender", top: "70%", left: "25%" },
        { id: 10, label: "CB", role: "Defender", top: "70%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "70%", left: "75%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ]
};