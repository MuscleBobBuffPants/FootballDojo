import { configureStore } from '@reduxjs/toolkit';
import fixturesByLeagueIdReducer from '../redux/fixtures/fetchFixturesByLeagueId';
import headToHeadFixturesReducer from '../redux/fixtures/fetchHeadToHeadFixtures';
import lastCompletedFixtureIdReducer from '../redux/fixtures/fetchLastCompletedFixtureId';
import recentFormByTeamIdReducer from '../redux/fixtures/fetchRecentFormByTeamId';
import lineupByFixtureIdAndTeamIdReducer from '../redux/lineups/fetchLineupByFixtureIdAndTeamId';
import playerProfileByPlayerIdReducer from '../redux/players/fetchPlayerProfileByPlayerId';
import playersByTeamReducer from '../redux/players/fetchPlayersByTeam';
import standingsByLeagueIdReducer from '../redux/standings/fetchStandingsByLeagueId';
import selectedPlayersReducer from '../redux/statTracking/selectedPlayers';
import playerStatsBySeasonReducer from '../redux/stats/fetchPlayerStatsBySeason';
import teamStatsByTeamReducer from '../redux/stats/fetchTeamStatsByTeam';
import teamsByLeagueIdReducer from '../redux/teams/fetchTeamsByLeagueId';
import venueByVenueIdReducer from '../redux/venues/fetchVenueByVenueId';

export const store = configureStore({
    reducer: {
        teamsByLeagueId: teamsByLeagueIdReducer,
        playersByTeam: playersByTeamReducer,
        playerProfileByPlayerId: playerProfileByPlayerIdReducer,
        fixturesByLeagueId: fixturesByLeagueIdReducer,
        lastCompletedFixtureId: lastCompletedFixtureIdReducer,
        lineupByFixtureIdAndTeamId: lineupByFixtureIdAndTeamIdReducer,
        playerStatsBySeason: playerStatsBySeasonReducer,
        headToHeadFixtures: headToHeadFixturesReducer,
        recentFormByTeamId: recentFormByTeamIdReducer,
        standingsByLeagueId: standingsByLeagueIdReducer,
        selectedPlayers: selectedPlayersReducer,
        teamStatsByTeam: teamStatsByTeamReducer,
        venueByVenueId: venueByVenueIdReducer
    },
});