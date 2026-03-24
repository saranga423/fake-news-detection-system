import { useMemo } from "react";
import {
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import GlassCard from "../components/GlassCard";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

export default function PredictionResultCard({
  prediction = "Suspicious",
  confidence = 0,
  explanationKeywords = [],
}) {
  const tokens = useMemo(
    () => ({
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
      successSoft: "rgba(34,197,94,0.12)",
      warning: "#f59e0b",
      warningSoft: "rgba(245,158,11,0.12)",
      danger: "#ef4444",
      dangerSoft: "rgba(239,68,68,0.12)",
    }),
    []
  );

  const normalizedPrediction = String(prediction).toLowerCase();
  const confidenceValue = Math.max(0, Math.min(100, Number(confidence) || 0));

  const verdictConfig = useMemo(() => {
    if (normalizedPrediction === "real") {
      return {
        label: "REAL",
        title: "Credibility posture appears stable",
        icon: <VerifiedRoundedIcon sx={{ fontSize: 18 }} />,
        tone: tokens.success,
        toneSoft: tokens.successSoft,
        summary:
          "Detected language patterns appear comparatively neutral and lower-risk based on the current heuristic pass.",
      };
    }

    if (normalizedPrediction === "fake") {
      return {
        label: "FAKE",
        title: "High deception probability detected",
        icon: <ReportProblemRoundedIcon sx={{ fontSize: 18 }} />,
        tone: tokens.danger,
        toneSoft: tokens.dangerSoft,
        summary:
          "Multiple suspicious signals suggest deceptive framing, manipulative phrasing, or credibility instability.",
      };
    }

    return {
      label: "SUSPICIOUS",
      title: "Review recommended before trust action",
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 18 }} />,
      tone: tokens.warning,
      toneSoft: tokens.warningSoft,
      summary:
        "The content contains partial risk indicators and should be reviewed before publication, sharing, or moderation clearance.",
    };
  }, [normalizedPrediction, tokens]);

  const confidenceBand = useMemo(() => {
    if (confidenceValue >= 85) return "HIGH";
    if (confidenceValue >= 65) return "MEDIUM";
    return "LOW";
  }, [confidenceValue]);

  const derivedMetrics = useMemo(() => {
    const risk =
      normalizedPrediction === "fake"
        ? Math.min(96, Math.round(confidenceValue + 4))
        : normalizedPrediction === "suspicious"
        ? Math.min(84, Math.round(confidenceValue + 6))
        : Math.max(8, 100 - Math.round(confidenceValue));

    const credibility =
      normalizedPrediction === "real"
        ? Math.max(72, Math.round(confidenceValue))
        : normalizedPrediction === "suspicious"
        ? Math.max(35, 100 - Math.round(confidenceValue / 1.35))
        : Math.max(12, 100 - Math.round(confidenceValue));

    const explainability = Math.min(
      97,
      58 + (explanationKeywords?.length || 0) * 8
    );

    return {
      risk,
      credibility,
      explainability,
    };
  }, [confidenceValue, normalizedPrediction, explanationKeywords]);

  const metricCards = [
    {
      label: "Classification Confidence",
      value: `${confidenceValue.toFixed(1)}%`,
      progress: confidenceValue,
      icon: <PsychologyRoundedIcon sx={{ fontSize: 17 }} />,
      color: verdictConfig.tone,
    },
    {
      label: "Risk Index",
      value: `${derivedMetrics.risk}%`,
      progress: derivedMetrics.risk,
      icon: <HubRoundedIcon sx={{ fontSize: 17 }} />,
      color:
        normalizedPrediction === "real"
          ? tokens.success
          : normalizedPrediction === "fake"
          ? tokens.danger
          : tokens.warning,
    },
    {
      label: "Credibility Score",
      value: `${derivedMetrics.credibility}%`,
      progress: derivedMetrics.credibility,
      icon: <GppGoodRoundedIcon sx={{ fontSize: 17 }} />,
      color:
        normalizedPrediction === "real"
          ? tokens.success
          : normalizedPrediction === "fake"
          ? tokens.danger
          : tokens.warning,
    },
    {
      label: "Explainability Coverage",
      value: `${derivedMetrics.explainability}%`,
      progress: derivedMetrics.explainability,
      icon: <InsightsRoundedIcon sx={{ fontSize: 17 }} />,
      color: tokens.accent,
    },
  ];

  return (
    <GlassCard
      sx={{
        bgcolor: tokens.panel,
        border: `1px solid ${tokens.border}`,
        borderRadius: 3,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderBottom: `1px solid ${tokens.border}`,
          bgcolor: "rgba(255,255,255,0.01)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            color: tokens.textSoft,
            fontWeight: 700,
          }}
        >
          INFERENCE RESULT
        </Typography>

        <Chip
          size="small"
          icon={verdictConfig.icon}
          label={`${verdictConfig.label} / ${confidenceBand} CONFIDENCE`}
          sx={{
            fontFamily: monoFont,
            bgcolor: verdictConfig.toneSoft,
            color: verdictConfig.tone,
            border: `1px solid ${verdictConfig.tone}33`,
            "& .MuiChip-label": {
              fontWeight: 700,
              letterSpacing: "0.04em",
            },
          }}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: `1px solid ${tokens.border}`,
                bgcolor: tokens.panelSoft,
                height: "100%",
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center" mb={1.5}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: verdictConfig.toneSoft,
                    color: verdictConfig.tone,
                    border: `1px solid ${tokens.border}`,
                  }}
                >
                  {verdictConfig.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#f8fafc",
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {verdictConfig.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: tokens.textMuted,
                      letterSpacing: "0.06em",
                      mt: 0.4,
                    }}
                  >
                    VERDICT: {verdictConfig.label}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{
                  color: tokens.textSoft,
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                  mb: 2.2,
                }}
              >
                {verdictConfig.summary}
              </Typography>

              <Divider sx={{ borderColor: tokens.border, mb: 2 }} />

              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: "0.76rem",
                    color: tokens.textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Analyst Notes
                </Typography>

                <Typography
                  sx={{
                    color: tokens.textSoft,
                    lineHeight: 1.75,
                    fontSize: "0.92rem",
                  }}
                >
                  Use this output as a screening signal, not a standalone truth
                  source. Final decisions should combine model output, source
                  verification, and editorial review.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} lg={7}>
            <Grid container spacing={2}>
              {metricCards.map((metric) => (
                <Grid item xs={12} sm={6} key={metric.label}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${tokens.border}`,
                      bgcolor: tokens.panelElevated,
                      height: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1.2}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ color: metric.color, display: "grid" }}>
                          {metric.icon}
                        </Box>
                        <Typography
                          sx={{
                            color: tokens.textSoft,
                            fontSize: "0.88rem",
                            fontWeight: 600,
                          }}
                        >
                          {metric.label}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          color: "#f8fafc",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                        }}
                      >
                        {metric.value}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={metric.progress}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.06)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: metric.color,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: `1px solid ${tokens.border}`,
                bgcolor: tokens.panelSoft,
              }}
            >
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.76rem",
                  color: tokens.textMuted,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  mb: 1.4,
                }}
              >
                Extracted Signals
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {(explanationKeywords?.length ? explanationKeywords : ["no signals"]).map(
                  (keyword) => (
                    <Chip
                      key={keyword}
                      label={keyword}
                      size="small"
                      sx={{
                        bgcolor: "rgba(56,189,248,0.08)",
                        color: "#bae6fd",
                        border: `1px solid ${tokens.border}`,
                        borderRadius: 1.5,
                        "& .MuiChip-label": {
                          px: 1.2,
                          fontWeight: 600,
                        },
                      }}
                    />
                  )
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </GlassCard>
  );
}