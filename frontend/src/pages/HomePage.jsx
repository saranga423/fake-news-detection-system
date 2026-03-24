import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import GlassCard from "../components/GlassCard";
import NewsInputCard from "../components/NewsInputCard";
import PredictionResultCard from "../components/PredictionResultCard";
import UrlAnalyzerCard from "../components/UrlAnalyzerCard";

const heroStats = [
  { label: "Pipeline", value: "NLP / Credibility / Risk" },
  { label: "Latency", value: "< 200ms" },
  { label: "Mode", value: "Human-in-the-loop" },
  { label: "Output", value: "Real / Fake / Suspicious" },
];

const modules = [
  {
    icon: <VerifiedRoundedIcon fontSize="small" />,
    title: "Credibility Layer",
    text: "Confidence scoring, structural trust cues, and source-signal weighting.",
  },
  {
    icon: <PsychologyRoundedIcon fontSize="small" />,
    title: "Language Pattern Engine",
    text: "Detects sensational framing, manipulative phrasing, and intent anomalies.",
  },
  {
    icon: <InsightsRoundedIcon fontSize="small" />,
    title: "Explainability Surface",
    text: "Shows why an article was flagged using interpretable signal markers.",
  },
  {
    icon: <SecurityRoundedIcon fontSize="small" />,
    title: "Moderation Workflow",
    text: "Designed for analyst review, newsroom screening, and trust operations.",
  },
];

const statusRows = [
  { label: "MODEL", value: "v2.4 / ACTIVE" },
  { label: "QUEUE", value: "NORMAL" },
  { label: "SIGNAL ENGINE", value: "ONLINE" },
  { label: "RISK INDEX", value: "STABLE" },
];

const monoSx = {
  fontFamily:
    '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace',
};

export default function HomePage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const themeTokens = useMemo(
    () => ({
      bg: "#020617",
      panel: "#0b1220",
      panelSoft: "#0f172a",
      panelElevated: "#111827",
      border: "rgba(148,163,184,0.16)",
      borderStrong: "rgba(148,163,184,0.26)",
      text: "#e5e7eb",
      textSoft: "#94a3b8",
      textMuted: "#64748b",
      accent: "#38bdf8",
      accentSoft: "rgba(56,189,248,0.10)",
      success: "#22c55e",
      warning: "#f59e0b",
    }),
    []
  );

  const handleAnalyze = ({ headline, text }) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const combined = `${headline || ""} ${text || ""}`.toLowerCase();

      const fakeSignals = [
        "shocking",
        "secret",
        "viral",
        "guaranteed",
        "breaking",
        "exposed",
        "must see",
        "they don't want you to know",
      ];

      const matchedSignals = fakeSignals.filter((word) =>
        combined.includes(word)
      );

      let prediction = "Real";
      let baseConfidence = 85;

      if (matchedSignals.length >= 2) {
        prediction = "Fake";
        baseConfidence = 91;
      } else if (matchedSignals.length === 1) {
        prediction = "Suspicious";
        baseConfidence = 72;
      }

      const finalConfidence = (baseConfidence + Math.random() * 4).toFixed(1);

      setResult({
        prediction,
        confidence: parseFloat(finalConfidence),
        explanationKeywords:
          matchedSignals.length > 0
            ? matchedSignals
            : ["neutral syntax", "verified context", "objective tone"],
      });

      setIsAnalyzing(false);

      window.scrollTo({
        top: 520,
        behavior: "smooth",
      });
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: themeTokens.bg,
        color: themeTokens.text,
        backgroundImage: `
          radial-gradient(circle at top left, rgba(56,189,248,0.08), transparent 24%),
          radial-gradient(circle at 85% 10%, rgba(59,130,246,0.06), transparent 20%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Box
            sx={{
              mb: 3,
              px: { xs: 0.5, md: 0 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Chip
                  size="small"
                  label="LIVE SYSTEM"
                  icon={<RadarRoundedIcon />}
                  sx={{
                    ...monoSx,
                    bgcolor: themeTokens.accentSoft,
                    color: themeTokens.accent,
                    border: `1px solid ${themeTokens.borderStrong}`,
                    height: 28,
                    "& .MuiChip-label": {
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                    },
                  }}
                />
                <Chip
                  size="small"
                  label="SANDBOX"
                  sx={{
                    ...monoSx,
                    bgcolor: "rgba(245,158,11,0.10)",
                    color: themeTokens.warning,
                    border: `1px solid rgba(245,158,11,0.22)`,
                    height: 28,
                    "& .MuiChip-label": {
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                    },
                  }}
                />
              </Stack>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#f8fafc",
                }}
              >
                Misinformation Analysis Workstation
              </Typography>

              <Typography
                sx={{
                  maxWidth: 820,
                  color: themeTokens.textSoft,
                  lineHeight: 1.8,
                  fontSize: { xs: "0.98rem", md: "1.03rem" },
                }}
              >
                Analyze headlines, article bodies, and URLs using a structured
                intelligence interface built for credibility assessment,
                explainability, and moderation support.
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => navigate("/dashboard")}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  bgcolor: "#e2e8f0",
                  color: "#0f172a",
                  px: 2.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#cbd5e1" },
                }}
              >
                Open Dashboard
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/model")}
                sx={{
                  borderColor: themeTokens.borderStrong,
                  color: themeTokens.text,
                  px: 2.5,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "rgba(226,232,240,0.35)",
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                Model Registry
              </Button>
            </Stack>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} lg={7.5}>
              <GlassCard
                sx={{
                  bgcolor: themeTokens.panel,
                  border: `1px solid ${themeTokens.border}`,
                  borderRadius: 3,
                  boxShadow: "none",
                  overflow: "hidden",
                  backdropFilter: "none",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderBottom: `1px solid ${themeTokens.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    bgcolor: "rgba(255,255,255,0.01)",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <TerminalRoundedIcon
                      sx={{ color: themeTokens.accent, fontSize: 20 }}
                    />
                    <Typography
                      sx={{
                        ...monoSx,
                        fontSize: "0.84rem",
                        letterSpacing: "0.08em",
                        color: themeTokens.textSoft,
                        fontWeight: 700,
                      }}
                    >
                      ANALYSIS CONSOLE
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      ...monoSx,
                      fontSize: "0.78rem",
                      color: themeTokens.success,
                    }}
                  >
                    STATUS: READY
                  </Typography>
                </Box>

                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <NewsInputCard
                    onAnalyze={handleAnalyze}
                    isLoading={isAnalyzing}
                  />
                </Box>
              </GlassCard>
            </Grid>

            <Grid item xs={12} lg={4.5}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <GlassCard
                  sx={{
                    bgcolor: themeTokens.panelSoft,
                    border: `1px solid ${themeTokens.border}`,
                    borderRadius: 3,
                    boxShadow: "none",
                    p: 0,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderBottom: `1px solid ${themeTokens.border}`,
                      bgcolor: "rgba(255,255,255,0.01)",
                    }}
                  >
                    <Typography
                      sx={{
                        ...monoSx,
                        fontSize: "0.82rem",
                        letterSpacing: "0.08em",
                        color: themeTokens.textSoft,
                        fontWeight: 700,
                      }}
                    >
                      SYSTEM STATUS
                    </Typography>
                  </Box>

                  <Stack spacing={0} sx={{ p: 2 }}>
                    {statusRows.map((row, index) => (
                      <Box key={row.label}>
                        <Box
                          sx={{
                            py: 1.35,
                            px: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              ...monoSx,
                              fontSize: "0.8rem",
                              color: themeTokens.textMuted,
                              letterSpacing: "0.06em",
                            }}
                          >
                            {row.label}
                          </Typography>
                          <Typography
                            sx={{
                              ...monoSx,
                              fontSize: "0.82rem",
                              color: "#e2e8f0",
                              fontWeight: 700,
                            }}
                          >
                            {row.value}
                          </Typography>
                        </Box>
                        {index !== statusRows.length - 1 && (
                          <Divider sx={{ borderColor: themeTokens.border }} />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </GlassCard>

                <GlassCard
                  sx={{
                    bgcolor: themeTokens.panelSoft,
                    border: `1px solid ${themeTokens.border}`,
                    borderRadius: 3,
                    boxShadow: "none",
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{
                      ...monoSx,
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: themeTokens.textSoft,
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    LIVE METRICS
                  </Typography>

                  <Grid container spacing={2}>
                    {heroStats.map((item) => (
                      <Grid item xs={12} sm={6} key={item.label}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${themeTokens.border}`,
                            bgcolor: themeTokens.panelElevated,
                          }}
                        >
                          <Typography
                            sx={{
                              ...monoSx,
                              fontSize: "0.74rem",
                              color: themeTokens.textMuted,
                              letterSpacing: "0.08em",
                              mb: 0.8,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#f8fafc",
                              fontSize: "0.96rem",
                              fontWeight: 700,
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 2.5 }}>
                    <Typography
                      sx={{
                        ...monoSx,
                        fontSize: "0.75rem",
                        color: themeTokens.textMuted,
                        mb: 1,
                      }}
                    >
                      THREAT MONITOR / LOW VOLATILITY
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={28}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.06)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: themeTokens.accent,
                        },
                      }}
                    />
                  </Box>
                </GlassCard>
              </Stack>
            </Grid>
          </Grid>
        </motion.div>

        {result && (
          <Box sx={{ mb: 4 }}>
            <Alert
              severity="warning"
              variant="outlined"
              sx={{
                mb: 3,
                borderRadius: 2,
                color: "#fde68a",
                bgcolor: "rgba(245,158,11,0.08)",
                borderColor: "rgba(245,158,11,0.22)",
                "& .MuiAlert-icon": { color: "#f59e0b" },
              }}
            >
              Sandbox inference is active. Replace the heuristic simulation with
              your FastAPI model endpoint for production-grade analysis.
            </Alert>

            <PredictionResultCard {...result} />
          </Box>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={8}>
            <UrlAnalyzerCard />
          </Grid>

          <Grid item xs={12} lg={4}>
            <GlassCard
              sx={{
                height: "100%",
                bgcolor: themeTokens.panelSoft,
                border: `1px solid ${themeTokens.border}`,
                borderRadius: 3,
                boxShadow: "none",
                p: 3,
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center" mb={2}>
                <LanRoundedIcon sx={{ color: themeTokens.accent }} />
                <Typography
                  sx={{
                    ...monoSx,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    color: themeTokens.textSoft,
                    fontWeight: 700,
                  }}
                >
                  API INTEGRATION
                </Typography>
              </Stack>

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#f8fafc", mb: 1.5 }}
              >
                Connect to editorial and moderation systems
              </Typography>

              <Typography
                sx={{
                  color: themeTokens.textSoft,
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                Route classification, confidence, explanation signals, and URL
                checks into newsroom workflows, trust-and-safety operations, or
                internal review pipelines.
              </Typography>

              <Button
                variant="outlined"
                startIcon={<PublicRoundedIcon />}
                sx={{
                  width: "fit-content",
                  borderColor: themeTokens.borderStrong,
                  color: themeTokens.text,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "rgba(226,232,240,0.35)",
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                Request API Documentation
              </Button>
            </GlassCard>
          </Grid>
        </Grid>

        <GlassCard
          sx={{
            bgcolor: themeTokens.panel,
            border: `1px solid ${themeTokens.border}`,
            borderRadius: 3,
            boxShadow: "none",
            p: 3,
          }}
        >
          <Typography
            sx={{
              ...monoSx,
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              color: themeTokens.textSoft,
              fontWeight: 700,
              mb: 2,
            }}
          >
            PLATFORM CAPABILITIES
          </Typography>

          <Grid container spacing={2}>
            {modules.map((feature) => (
              <Grid item xs={12} md={6} key={feature.title}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${themeTokens.border}`,
                    bgcolor: themeTokens.panelElevated,
                    height: "100%",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: themeTokens.accentSoft,
                        color: themeTokens.accent,
                        border: `1px solid ${themeTokens.border}`,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: "#f8fafc" }}>
                      {feature.title}
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      color: themeTokens.textSoft,
                      lineHeight: 1.75,
                      fontSize: "0.96rem",
                    }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </GlassCard>
      </Container>
    </Box>
  );
}