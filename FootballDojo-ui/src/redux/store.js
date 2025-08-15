import { configureStore } from '@reduxjs/toolkit';
import fixturesByLeagueIdReducer from '../redux/fixtures/fetchFixturesByLeagueId';
import playerProfileByPlayerIdReducer from '../redux/players/fetchPlayerProfileByPlayerId';
import playersByTeamReducer from '../redux/players/fetchPlayersByTeam';
import teamsByLeagueIdReducer from '../redux/teams/fetchTeamsByLeagueId';
import playerStatsBySeasonReducer from '../redux/stats/fetchPlayerStatsBySeason';

export const store = configureStore({
    reducer: {
        teamsByLeagueId: teamsByLeagueIdReducer,
        playersByTeam: playersByTeamReducer,
        playerProfileByPlayerId: playerProfileByPlayerIdReducer,
        fixturesByLeagueId: fixturesByLeagueIdReducer,
        playerStatsBySeason: playerStatsBySeasonReducer
    },
});