import { Box, MenuItem, Select, Typography, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FORMATIONS } from "../../global/constants";
import SoccerField from "../lineupBuilder/soccerField";
import { toPng } from "html-to-image";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function LineupBuilder({ selectedTeam, playersByTeam, resetFlag }) {
    const [lineup, setLineup] = useState({});
    const [formation, setFormation] = useState("4-3-3");
    const [pngBlobUrl, setPngBlobUrl] = useState(""); // Blob URL for QR
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

    const handleGeneratePNG = () => {
        if (!fieldRef.current) return;

        toPng(fieldRef.current)
            .then((dataUrl) => {
                // Convert dataUrl to Blob
                const byteString = atob(dataUrl.split(",")[1]);
                const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });
                const blobUrl = URL.createObjectURL(blob);
                setPngBlobUrl(blobUrl);
            })
            .catch((err) => console.error("Failed to generate PNG:", err));
    };

    const isLineupComplete = () => {
        const positions = FORMATIONS[formation];
        return positions.every((slot) => lineup[slot.id]); // slot.id must have a playerId
    };

    const fileName = selectedTeam ? `${selectedTeam}_${formation}.png` : "";

    return (
        <Box>
            <Box display="flex" pt={2} mb={2}>
                <Typography sx={{ pr: 1, pl: 0.5 }}>Formation:</Typography>
                <Select
                    value={formation}
                    onChange={(e) => setFormation(e.target.value)}
                    size="small"
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

            <Box sx={{ width: 970, display: "flex", gap: 4 }}>
                {/* Lineup Builder (left) */}
                <Box flex={1}>
                    <Typography variant="h5" component="h2" align="center" sx={{ mb: 2 }}>
                        Lineup Builder
                    </Typography>
                    {/* Attach ref to container */}
                    <Box ref={fieldRef}>
                        <SoccerField
                            positions={FORMATIONS[formation]}
                            lineup={lineup}
                            players={playersByTeam}
                            onAssign={handleAssign}
                        />
                    </Box>
                </Box>

                {/* Controls (right) */}
                {isLineupComplete() &&
                    <Box display="flex" flexDirection="column" alignItems="center" mt="+7%">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleGeneratePNG}
                            sx={{ borderRadius: 2, mb: 2 }}
                            hidden={!isLineupComplete()}
                        >
                            Generate PNG & QR Code
                        </Button>

                        {/* Fixed-size container for QR code */}
                        <Box sx={{ width: 100, height: 100 }}>
                            {pngBlobUrl && (
                                <a href={pngBlobUrl} download={fileName}>
                                    <QRCode value={pngBlobUrl} size={90} includeMargin />
                                </a>
                            )}
                        </Box>
                    </Box>}

            </Box>
        </Box>
    );
}
