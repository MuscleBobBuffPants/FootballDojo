import { configureStore } from '@reduxjs/toolkit';
import fixturesByLeagueIdReducer from '../redux/fixtures/fetchFixturesByLeagueId';
import headToHeadFixturesReducer from '../redux/fixtures/fetchHeadToHeadFixtures';
import recentFormByTeamIdReducer from '../redux/fixtures/fetchRecentFormByTeamId';
import playerProfileByPlayerIdReducer from '../redux/players/fetchPlayerProfileByPlayerId';
import playersByTeamReducer from '../redux/players/fetchPlayersByTeam';
import playerStatsBySeasonReducer from '../redux/stats/fetchPlayerStatsBySeason';
import teamsByLeagueIdReducer from '../redux/teams/fetchTeamsByLeagueId';

export const store = configureStore({
    reducer: {
        teamsByLeagueId: teamsByLeagueIdReducer,
        playersByTeam: playersByTeamReducer,
        playerProfileByPlayerId: playerProfileByPlayerIdReducer,
        fixturesByLeagueId: fixturesByLeagueIdReducer,
        playerStatsBySeason: playerStatsBySeasonReducer,
        headToHeadFixtures: headToHeadFixturesReducer,
        recentFormByTeamId: recentFormByTeamIdReducer
    },
});