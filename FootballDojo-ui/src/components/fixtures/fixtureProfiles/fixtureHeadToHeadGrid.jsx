import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    formatUtcDateForHeadToHeadGrid,
    getGoalColor,
    isNonEmptyObject
} from "../../../global/constants";
import { fetchHeadToHeadFixtures } from "../../../redux/fixtures/fetchHeadToHeadFixtures";
import PanelCard from "../../common/PanelCard";
import { rowVariants } from "../../common/motionVariants";

function GoalBubble({ teamGoals, otherGoals }) {
    const theme = useTheme();
    const size = 24;
    const { bg, fg } = getGoalColor(theme, teamGoals, otherGoals);
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: size,
                height: size,
                borderRadius: "50%",
                bgcolor: bg,
                color: fg,
                fontWeight: 800,
                fontSize: 12,
                flexShrink: 0,
            }}
        >
            {teamGoals}
        </Box>
    );
}

function HeadToHeadRow({ fixture }) {
    return (
        <Box
            component={motion.div}
            variants={rowVariants}
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.1,
                borderTop: `1px solid ${theme.palette.divider}`,
            })}
        >
            <GoalBubble teamGoals={fixture.awayTeamGoals} otherGoals={fixture.homeTeamGoals} />
            <Box
                component="img"
                src={fixture.awayLogo}
                alt={fixture.awayName}
                sx={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "center" }}>
                <Typography variant="body2" noWrap>
                    {fixture.awayName} @ {fixture.homeName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {fixture.date}
                </Typography>
            </Box>
            <Box
                component="img"
                src={fixture.homeLogo}
                alt={fixture.homeName}
                sx={{ width: 22, height: 22, objectFit: "contain", flexShrink: 0 }}
            />
            <GoalBubble teamGoals={fixture.homeTeamGoals} otherGoals={fixture.awayTeamGoals} />
        </Box>
    );
}

export default function FixtureHeadToHeadGrid({ selectedFixture }) {
    const dispatch = useDispatch();

    const headToHeadFixtures = useSelector((state) => state.headToHeadFixtures.list);
    const status = useSelector((state) => state.headToHeadFixtures.status);
    const error = useSelector((state) => state.headToHeadFixtures.error);

    useEffect(() => {
        if (isNonEmptyObject(selectedFixture)) {
            dispatch(fetchHeadToHeadFixtures({ homeTeamId: selectedFixture.homeTeam.id, awayTeamId: selectedFixture.awayTeam.id }));
        }
    }, [dispatch, selectedFixture]);

    const filteredFixtures = isNonEmptyObject(selectedFixture)
        ? headToHeadFixtures
            .filter((f) => new Date(f.fixture.date) <= new Date())
            .map((response, index) => ({
                id: index,
                homeTeamGoals: response.goals.home,
                awayTeamGoals: response.goals.away,
                date: formatUtcDateForHeadToHeadGrid(new Date(response.fixture.date)),
                rawDate: new Date(response.fixture.date),
                homeName: response.teams.home.name,
                homeLogo: response.teams.home.logo,
                awayName: response.teams.away.name,
                awayLogo: response.teams.away.logo,
            }))
            .sort((a, b) => b.rawDate - a.rawDate)
        : [];

    return (
        <PanelCard
            title={`Previous Matchups (${filteredFixtures.length})`}
            loading={status === "loading"}
            error={status === "failed" ? error : null}
            onRetry={() => dispatch(fetchHeadToHeadFixtures({ homeTeamId: selectedFixture.homeTeam.id, awayTeamId: selectedFixture.awayTeam.id }))}
            isEmpty={filteredFixtures.length === 0}
            emptyMessage="No previous matchups"
            maxHeight={320}
        >
            {filteredFixtures.map((fixture) => (
                <HeadToHeadRow key={fixture.id} fixture={fixture} />
            ))}
        </PanelCard>
    );
}
