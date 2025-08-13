export const isNonEmptyObject = obj => obj && Object.keys(obj).length > 0;

export const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

// Test Data
export const testTeamData = [
    { team: { id: 1, name: "Arsenal" } },
    { team: { id: 2, name: "Liverpool" } },
    { team: { id: 3, name: "Manchester City" } }];

export const testPlayerData = [
    { id: 1, number: 22, name: "David Raya", age: 29, position: "Goalkeeper", team: "Arsenal" },
    { id: 2, number: 2, name: "William Saliba", age: 24, position: "Defender", team: "Arsenal" },
    { id: 3, number: 7, name: "Bukayo Saka", age: 23, position: "Forward", team: "Arsenal" },
    { id: 4, number: 14, name: "Viktor Gyokeres", age: 27, position: "Forward", team: "Arsenal" },
    { id: 5, number: 1, name: "James Trafford", age: 22, position: "Goalkeeper", team: "Manchester City" },
    { id: 6, number: 24, name: "Josko Gvardiol", age: 23, position: "Defender", team: "Manchester City" },
    { id: 7, number: 16, name: "Rodri", age: 29, position: "Midfield", team: "Manchester City" },
    { id: 8, number: 9, name: "Erling Haaland", age: 25, position: "Forward", team: "Manchester City" },
    { id: 9, number: 1, name: "Alisson Becker", age: 32, position: "GoalKeeper", team: "Liverpool" },
    { id: 10, number: 4, name: "Virgil van Dijk", age: 34, position: "Defender", team: "Liverpool" },
    { id: 11, number: 17, name: "Florian Wirtz", age: 22, position: "Midfield", team: "Liverpool" },
    { id: 12, number: 11, name: "Mohamed Salah", age: 33, position: "Forward", team: "Liverpool" }
];