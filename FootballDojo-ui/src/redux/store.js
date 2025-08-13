import { configureStore } from '@reduxjs/toolkit';
import playersByTeamReducer from '../redux/players/fetchPlayersByTeam';
import teamsByLeagueIdReducer from '../redux/teams/fetchTeamsByLeagueId';
import playerProfileByPlayerIdReducer from '../redux/players/fetchPlayerProfileByPlayerId';

export const store = configureStore({
    reducer: {
        teamsByLeagueId: teamsByLeagueIdReducer,
        playersByTeam: playersByTeamReducer,
        playerProfileByPlayerId: playerProfileByPlayerIdReducer
    },
});