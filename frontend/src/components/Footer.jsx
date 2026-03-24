import { Box, Container, Divider, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 6,
        borderTop: "1px solid rgba(148,163,184,0.16)",
        bgcolor: "#020617",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* TOP ROW */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          {/* SYSTEM IDENTITY */}
          <Stack spacing={0.5}>
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Veritas AI
            </Typography>

            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "#64748b",
                letterSpacing: "0.08em",
              }}
            >
              MISINFORMATION ANALYSIS WORKSTATION
            </Typography>
          </Stack>

          {/* NAV LINKS */}
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={() => navigate("/privacy")}
              sx={{
                textTransform: "none",
                color: "#94a3b8",
                fontSize: "0.82rem",
                "&:hover": { color: "#e2e8f0" },
              }}
            >
              Privacy
            </Button>

            <Button
              size="small"
              onClick={() => navigate("/terms")}
              sx={{
                textTransform: "none",
                color: "#94a3b8",
                fontSize: "0.82rem",
                "&:hover": { color: "#e2e8f0" },
              }}
            >
              Terms
            </Button>

            <Button
              size="small"
              onClick={() => navigate("/model")}
              sx={{
                textTransform: "none",
                color: "#94a3b8",
                fontSize: "0.82rem",
                "&:hover": { color: "#e2e8f0" },
              }}
            >
              Model
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "rgba(148,163,184,0.12)" }} />

        {/* BOTTOM ROW */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.7rem",
              color: "#64748b",
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} VERITAS AI · ALL RIGHTS RESERVED
          </Typography>

          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.7rem",
              color: "#475569",
              letterSpacing: "0.06em",
            }}
          >
            SYSTEM STATUS: OPERATIONAL · LATENCY NORMAL · NLP PIPELINE ACTIVE
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}