import { Card, CardContent, Typography } from "@mui/material";

function YouTubeCard({ selectedPlayer }) {
    return (
        <Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 4, transform: "scale(0.95)" }}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                    src="https://www.youtube.com/embed/QKaRQ1fse8I?si=jFWLxbDXF_FwCTY3"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                    }}
                />
            </div>
            <CardContent>
                <Typography variant="h7">{`${selectedPlayer.name} Highlights`}</Typography>
            </CardContent>
        </Card>
    );
}

export default YouTubeCard;