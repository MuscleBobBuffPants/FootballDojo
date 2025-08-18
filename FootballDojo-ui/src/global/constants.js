// Helper Functions
export const isNonEmptyObject = obj => obj && Object.keys(obj).length > 0;

export const formatUtcDate = (utcDate) => {
    const date = new Date(utcDate);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${month} - ${day} - ${year}`;
}

// Sort by Position
export const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

// Formations
export const FORMATIONS = {
    "4-3-3": [
        // Attackers
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },
        { id: 3, label: "LW", role: "Attacker", top: "10%", left: "25%" },
        { id: 4, label: "RW", role: "Attacker", top: "10%", left: "75%" },

        // Midfielders
        { id: 5, label: "CM", role: "Midfielder", top: "35%", left: "30%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "70%" },
        { id: 7, label: "CDM", role: "Midfielder", top: "40%", left: "50%" },

        // Defenders
        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        // Goalkeeper
        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

    "4-4-2": [
        // Attackers
        { id: 2, label: "ST", role: "Attacker", top: "7%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "7%", left: "60%" },

        // Midfielders
        { id: 4, label: "LM", role: "Midfielder", top: "32%", left: "25%" },
        { id: 5, label: "RM", role: "Midfielder", top: "32%", left: "75%" },
        { id: 6, label: "CM", role: "Midfielder", top: "42%", left: "40%" },
        { id: 7, label: "CM", role: "Midfielder", top: "42%", left: "60%" },

        // Defenders
        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        // Goalkeeper
        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],
    "4-2-3-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LW", role: "Attacker", top: "15%", left: "20%" },
        { id: 4, label: "CAM", role: "Midfielder", top: "25%", left: "50%" },
        { id: 5, label: "RW", role: "Attacker", top: "15%", left: "80%" },

        { id: 6, label: "CDM", role: "Midfielder", top: "42%", left: "35%" },
        { id: 7, label: "CDM", role: "Midfielder", top: "42%", left: "65%" },

        { id: 8, label: "LB", role: "Defender", top: "65%", left: "12%" },
        { id: 9, label: "RB", role: "Defender", top: "65%", left: "88%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "37%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "63%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ],

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
        { id: 4, label: "CM", role: "Midfielder", top: "30%", left: "40%" },
        { id: 5, label: "CM", role: "Midfielder", top: "30%", left: "60%" },
        { id: 6, label: "RM", role: "Midfielder", top: "25%", left: "80%" },

        { id: 7, label: "LWB", role: "Defender", top: "55%", left: "15%" },
        { id: 8, label: "RWB", role: "Defender", top: "55%", left: "85%" },
        { id: 9, label: "CB", role: "Defender", top: "70%", left: "25%" },
        { id: 10, label: "CB", role: "Defender", top: "70%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "70%", left: "75%" },

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
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "40%" },
        { id: 3, label: "ST", role: "Attacker", top: "5%", left: "60%" },

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

    "3-4-2-1": [
        { id: 2, label: "ST", role: "Attacker", top: "5%", left: "50%" },

        { id: 3, label: "LAM", role: "Midfielder", top: "15%", left: "35%" },
        { id: 4, label: "RAM", role: "Midfielder", top: "15%", left: "65%" },

        { id: 5, label: "LM", role: "Midfielder", top: "35%", left: "20%" },
        { id: 6, label: "CM", role: "Midfielder", top: "35%", left: "45%" },
        { id: 7, label: "CM", role: "Midfielder", top: "35%", left: "55%" },
        { id: 8, label: "RM", role: "Midfielder", top: "35%", left: "80%" },

        { id: 9, label: "CB", role: "Defender", top: "65%", left: "20%" },
        { id: 10, label: "CB", role: "Defender", top: "65%", left: "50%" },
        { id: 11, label: "CB", role: "Defender", top: "65%", left: "80%" },

        { id: 1, label: "GK", role: "Goalkeeper", top: "85%", left: "50%" }
    ]
};