import {
    Box
} from "@mui/material";
import { isNonEmptyObject } from "../../global/constants";

function TeamLogoIcon({ selectedTeam, teamLogo }) {
    return (
        <Box>
            <Box
                sx={(theme) => ({
                    width: 69,
                    height: 69,
                    bgcolor: isNonEmptyObject(selectedTeam) ? theme.palette.background.paper : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid ",
                    borderColor: isNonEmptyObject(selectedTeam) ? "#ccc" : "transparent"
                })}
            >
                {isNonEmptyObject(selectedTeam) ? (
                    <img
                        src={teamLogo}
                        style={{ width: "95%", height: "95%", objectFit: "contain" }}
                    />
                ) : null}
            </Box>
        </Box>
    )
}


export default TeamLogoIcon;