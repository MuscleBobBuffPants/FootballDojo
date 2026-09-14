import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNonEmptyObject } from "../../global/constants";
import { fetchStandingsByLeagueId } from "../../redux/standings/fetchStandingsByLeagueId";
import { clearTeamStats, fetchTeamStatsByTeam } from "../../redux/stats/fetchTeamStatsByTeam";
import PanelCard from "../common/PanelCard";
import { rowVariants } from "../common/motionVariants";
import SeasonDropdown from "../seasonDropdown";
import TeamProfile from "../teams/teamProfiles/teamProfile";

function StandingRow({ standing, isSelected, onClick }) {
    return (
        <Box
            component={motion.div}
            variants={rowVariants}
            onClick={onClick}
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.1,
                cursor: "pointer",
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: isSelected
                    ? theme.palette.mode === "dark"
                        ? "rgba(168,85,247,0.16)"
                        : "rgba(142,36,207,0.10)"
                    : "transparent",
                transition: "background-color 120ms ease",
                "&:hover": {
                    bgcolor: isSelected
                        ? theme.palette.mode === "dark"
                            ? "rgba(168,85,247,0.22)"
                            : "rgba(142,36,207,0.16)"
                        : theme.palette.background.secondary,
                },
            })}
        >
            <Typography
                variant="body2"
                sx={{ width: 20, flexShrink: 0, color: "text.secondary", fontWeight: 700 }}
            >
                {standing.rank}
            </Typography>
            <Box
                component="img"
                src={standing.teamLogo}
                alt={standing.teamName}
                sx={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }}
            />
            <Typography
                variant="body2"
                sx={{
                    flex: 1,
                    minWidth: 0,
                    fontWeight: isSelected ? 700 : 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {standing.teamName}
            </Typography>
            <Typography variant="caption" sx={{ width: 26, textAlign: "center", color: "text.secondary" }}>
                {standing.gamesPlayed}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    width: 34,
                    textAlign: "center",
                    fontWeight: 600,
                    color: standing.goalDifference > 0 ? "result.win" : standing.goalDifference < 0 ? "result.loss" : "text.secondary",
                }}
            >
                {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
            </Typography>
            <Typography variant="body2" sx={{ width: 30, textAlign: "right", fontWeight: 700 }}>
                {standing.points}
            </Typography>
        </Box>
    );
}

export default function StandingsGrid({ selectedLeague, selectedTeam }) {
    const dispatch = useDispatch();

    const [selectedSeason, setSelectedSeason] = useState(2025);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    const standingsByLeagueId = useSelector((state) => state.standingsByLeagueId.list);
    const status = useSelector((state) => state.standingsByLeagueId.status);
    const error = useSelector((state) => state.standingsByLeagueId.error);

    const selectedTeamStats = useSelector((state) => state.teamStatsByTeam.stats);

    useEffect(() => {
        if (selectedLeague) {
            dispatch(fetchStandingsByLeagueId({ leagueId: selectedLeague.id, season: selectedSeason }));
        }
    }, [dispatch, selectedLeague, selectedSeason]);

    useEffect(() => {
        setSelectedSeason(2025);
    }, [selectedLeague, selectedTeam]);

    useEffect(() => {
        if (selectedTeamId) {
            dispatch(fetchTeamStatsByTeam({
                teamId: selectedTeamId,
                leagueId: selectedLeague.id,
                season: selectedSeason
            }));
        }
    }, [dispatch, selectedTeamId]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeamStats)) {
            setModalOpen(true);
        }
    }, [selectedTeamStats]);

    const handleClose = () => {
        setModalOpen(false);
        setSelectedTeamId(null);
        dispatch(clearTeamStats());
    };

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    const standings = isNonEmptyObject(selectedLeague)
        ? standingsByLeagueId.map((response, index) => ({
            id: index,
            teamId: response.team.id,
            rank: response.rank,
            teamName: response.team.name,
            teamLogo: response.team.logo,
            gamesPlayed: response.all.played,
            goalDifference: response.goalsDiff,
            points: response.points,
        }))
        : [];

    return (
        <>
            <PanelCard
                title={selectedLeague ? `${selectedLeague.name} Table` : " "}
                control={
                    isNonEmptyObject(selectedLeague) && (
                        <SeasonDropdown selectedSeason={selectedSeason} handleSeasonChange={handleSeasonChange} />
                    )
                }
                loading={status === "loading"}
                error={status === "failed" ? error : null}
                onRetry={() => dispatch(fetchStandingsByLeagueId({ leagueId: selectedLeague.id, season: selectedSeason }))}
                isEmpty={standings.length === 0}
                emptyMessage={!selectedLeague ? "Please select a league..." : "No standings available"}
            >
                {standings.map((standing) => (
                    <StandingRow
                        key={standing.id}
                        standing={standing}
                        isSelected={selectedTeam && standing.teamName === selectedTeam.name}
                        onClick={() => setSelectedTeamId(standing.teamId)}
                    />
                ))}
            </PanelCard>
            {isNonEmptyObject(selectedTeamStats) && (
                <TeamProfile
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedLeague={selectedLeague}
                    selectedSeason={selectedSeason}
                    selectedTeamStats={selectedTeamStats}
                />
            )}
        </>
    );
}
