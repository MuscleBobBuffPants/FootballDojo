import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import { FORMATIONS } from "../../global/constants";
import SoccerField from "../lineupBuilder/soccerField";

export default function LineupBuilder({ selectedTeam, playersByTeam, resetFlag }) {
    const [lineup, setLineup] = useState({});
    const [formation, setFormation] = useState("4-3-3");
    const [pngBlobUrl, setPngBlobUrl] = useState("");
    const fieldRef = useRef(null);

    useEffect(() => {
        setLineup({});
        setPngBlobUrl("");
    }, [playersByTeam, resetFlag, formation]);

    const handleAssign = (slotId, playerId) => {
        setLineup((prev) => {
            const newLineup = { ...prev };
            Object.keys(newLineup).forEach((key) => {
                if (newLineup[key] === playerId) {
                    newLineup[key] = null;
                }
            });
            newLineup[slotId] = playerId ?? null;
            return newLineup;
        });
    };

    const isLineupComplete = () => {
        const positions = FORMATIONS[formation];
        return positions.every((slot) => lineup[slot.id]);
    };

    const handleGeneratePNG = async () => {
        try {
            const dataUrl = await toPng(fieldRef.current);

            // Create a Blob
            const byteString = atob(dataUrl.split(",")[1]);
            const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const blobUrl = URL.createObjectURL(blob);

            // download immediately
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName || "lineup.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // optional: keep state if you want preview later
            setPngBlobUrl(blobUrl);
        } catch (err) {
            console.error("Failed to generate PNG:", err);
        }
    };

    const fileName = selectedTeam ? `${selectedTeam}_${formation}.png` : "";

    return (
        <Box>
            <Box display="flex" pt={2} mb={2}>
                <Typography sx={{ pr: 1, pl: 0.5 }}>Formation:</Typography>
                <Select
                    size="small"
                    value={formation}
                    onChange={(e) => setFormation(e.target.value)}
                    MenuProps={{
                        PaperProps: { style: { maxHeight: 48 * 4 + 8 } },
                    }}
                >
                    {Object.keys(FORMATIONS).map((formationKey) => (
                        <MenuItem key={formationKey} value={formationKey}>
                            {formationKey}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{ width: 970, display: "flex", gap: 2 }}>
                <Box flex={1}>
                    <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                        Lineup Builder
                    </Typography>
                    <Box ref={fieldRef}>
                        <SoccerField
                            positions={FORMATIONS[formation]}
                            lineup={lineup}
                            players={playersByTeam}
                            onAssign={handleAssign}
                        />
                    </Box>
                </Box>
                {isLineupComplete() &&
                    < Box display="flex" flexDirection="column" alignItems="center" mt="+7%">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleGeneratePNG}
                            sx={{ borderRadius: 2, mb: 2 }}
                            hidden={!isLineupComplete()}
                        >
                            Download Lineup & Share
                        </Button>
                        {pngBlobUrl && (
                            <a
                                href={pngBlobUrl}
                                download={fileName}
                                style={{ display: "none" }}
                                id="download-link"
                            >
                                download
                            </a>
                        )}
                    </Box>
                }
            </Box>
        </Box>
    );
}
