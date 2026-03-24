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
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import GlassCard from "../components/GlassCard";
import NewsInputCard from "../components/NewsInputCard";
import PredictionResultCard from "../components/PredictionResultCard";
import UrlAnalyzerCard from "../components/UrlAnalyzerCard";
import SectionTitle from "../components/SectionTitle";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const initialFeed = [
  {
    id: 1,
    source: "Global Politics Wire",
    headline: "Government secrets exposed in shocking overnight leak",
    verdict: "Fake",
    confidence: 92.4,
    time: "09:42",
  },
  {
    id: 2,
    source: "City Monitor",
    headline: "Transport authority confirms phased route expansion plan",
    verdict: "Real",
    confidence: 87.3,
    time: "09:28",
  },
  {
    id: 3,
    source: "TrendBurst Daily",
    headline: "They don't want you to know this miracle health trick",
    verdict: "Fake",
    confidence: 94.1,
    time: "09:13",
  },
  {
    id: 4,
    source: "Civic Desk",
    headline: "Local council budget proposal enters public review period",
    verdict: "Real",
    confidence: 84.9,
    time: "08:56",
  },
  {
    id: 5,
    source: "Social Stream Capture",
    headline: "Breaking footage may reveal hidden election plot",
    verdict: "Suspicious",
    confidence: 71.8,
    time: "08:31",
  },
];

const analystRows = [
  {
    id: "A-1042",
    artifact: "Election rumor batch",
    status: "Queued",
    owner: "Analyst 02",
    risk: 64,
  },
  {
    id: "A-1041",
    artifact: "Health misinformation scan",
    status: "Review",
    owner: "Analyst 05",
    risk: 81,
  },
  {
    id: "A-1040",
    artifact: "Regional news verification",
    status: "Cleared",
    owner: "Analyst 01",
    risk: 18,
  },
  {
    id: "A-1039",
    artifact: "Social headline sweep",
    status: "Escalated",
    owner: "Analyst 03",
    risk: 89,
  },
];

function SmallMetric({ label, value, hint, icon, color = "#38bdf8" }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid rgba(148,163,184,0.16)",
        bgcolor: "#111827",
        height: "100%",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "#64748b",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 0.8,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontSize: "1.2rem",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "0.82rem",
              mt: 0.8,
            }}
          >
            {hint}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            display: "grid",
            placeItems: "center",
            bgcolor: `${color}14`,
            color,
            border: "1px solid rgba(148,163,184,0.16)",
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Box>
  );
}

function FeedRow({ item }) {
  const tone =
    item.verdict === "Real"
      ? { color: "#22c55e", bg: "rgba(34,197,94,0.10)" }
      : item.verdict === "Fake"
      ? { color: "#ef4444", bg: "rgba(239,68,68,0.10)" }
      : { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 2,
        border: "1px solid rgba(148,163,184,0.14)",
        bgcolor: "#111827",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#f8fafc",
              fontWeight: 700,
              fontSize: "0.94rem",
              lineHeight: 1.45,
              mb: 0.4,
            }}
          >
            {item.headline}
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "#64748b",
              }}
            >
              SOURCE / {item.source.toUpperCase()}
            </Typography>

            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "#64748b",
              }}
            >
              TIME / {item.time}
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            size="small"
            label={item.verdict}
            sx={{
              bgcolor: tone.bg,
              color: tone.color,
              border: `1px solid ${tone.color}33`,
              fontWeight: 700,
            }}
          />
          <Typography
            sx={{
              fontFamily: monoFont,
              color: "#cbd5e1",
              fontSize: "0.76rem",
              minWidth: 70,
              textAlign: "right",
            }}
          >
            {item.confidence.toFixed(1)}%
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

function StatusBar({ label, value, color }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.8}>
        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: monoFont,
            color: "#f8fafc",
            fontSize: "0.78rem",
            fontWeight: 700,
          }}
        >
          {value}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "rgba(255,255,255,0.06)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
}

export default function DashboardPage() {
  const [result, setResult] = useState({
    prediction: "Suspicious",
    confidence: 78.4,
    explanationKeywords: [
      "breaking",
      "suspicious framing",
      "clickbait phrasing",
      "low-source clarity",
    ],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feed] = useState(initialFeed);

  const tokens = useMemo(
    () => ({
      bg: "#020617",
      panel: "#0b1220",
      panelSoft: "#0f172a",
      panelElevated: "#111827",
      border: "rgba(148,163,184,0.16)",
      borderStrong: "rgba(148,163,184,0.24)",
      text: "#e5e7eb",
      textSoft: "#94a3b8",
      textMuted: "#64748b",
      accent: "#38bdf8",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
    }),
    []
  );

  const summary = useMemo(() => {
    const real = feed.filter((x) => x.verdict === "Real").length;
    const fake = feed.filter((x) => x.verdict === "Fake").length;
    const suspicious = feed.filter((x) => x.verdict === "Suspicious").length;

    return {
      total: feed.length,
      real,
      fake,
      suspicious,
    };
  }, [feed]);

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
    }, 850);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.bg,
        color: tokens.text,
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(56,189,248,0.05), transparent 20%),
          radial-gradient(circle at 100% 10%, rgba(59,130,246,0.05), transparent 20%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        <SectionTitle
          eyebrow="ANALYTICS WORKSPACE"
          title="Detection Operations Dashboard"
          subtitle="Unified monitoring surface for content classification, signal review, source screening, and model-status visibility."
          rightSlot={
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<RadarRoundedIcon />}
                label="LIVE VIEW"
                sx={{
                  fontFamily: monoFont,
                  bgcolor: "rgba(56,189,248,0.10)",
                  color: tokens.accent,
                  border: `1px solid ${tokens.borderStrong}`,
                  "& .MuiChip-label": {
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  },
                }}
              />
              <Button
                size="small"
                startIcon={<RefreshRoundedIcon />}
                sx={{
                  textTransform: "none",
                  color: "#cbd5e1",
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.02)",
                    borderColor: tokens.borderStrong,
                  },
                }}
              >
                Refresh
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SmallMetric
              label="Articles Processed"
              value="12,482"
              hint="Rolling 24h ingestion"
              icon={<ArticleRoundedIcon sx={{ fontSize: 18 }} />}
              color="#38bdf8"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SmallMetric
              label="Flagged High Risk"
              value={`${summary.fake + summary.suspicious}`}
              hint="Requires analyst attention"
              icon={<WarningAmberRoundedIcon sx={{ fontSize: 18 }} />}
              color="#f59e0b"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SmallMetric
              label="Model Confidence"
              value={`${result.confidence.toFixed(1)}%`}
              hint="Current active inference"
              icon={<PsychologyRoundedIcon sx={{ fontSize: 18 }} />}
              color="#22c55e"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SmallMetric
              label="Avg. Latency"
              value="184ms"
              hint="Inference pipeline stable"
              icon={<SpeedRoundedIcon sx={{ fontSize: 18 }} />}
              color="#a78bfa"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} xl={8}>
            <Stack spacing={3}>
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
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.2}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
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
                      PRIMARY ANALYSIS PANEL
                    </Typography>

                    <Chip
                      size="small"
                      label={isAnalyzing ? "INFERENCE RUNNING" : "SYSTEM READY"}
                      sx={{
                        fontFamily: monoFont,
                        bgcolor: isAnalyzing
                          ? "rgba(245,158,11,0.10)"
                          : "rgba(34,197,94,0.10)",
                        color: isAnalyzing ? tokens.warning : tokens.success,
                        border: `1px solid ${
                          isAnalyzing
                            ? "rgba(245,158,11,0.22)"
                            : "rgba(34,197,94,0.22)"
                        }`,
                        "& .MuiChip-label": {
                          fontWeight: 700,
                        },
                      }}
                    />
                  </Stack>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <NewsInputCard
                        onAnalyze={handleAnalyze}
                        isLoading={isAnalyzing}
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <PredictionResultCard {...result} />
                    </Grid>
                  </Grid>
                </Box>
              </GlassCard>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={7}>
                  <GlassCard
                    sx={{
                      bgcolor: tokens.panel,
                      border: `1px solid ${tokens.border}`,
                      borderRadius: 3,
                      boxShadow: "none",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderBottom: `1px solid ${tokens.border}`,
                        bgcolor: "rgba(255,255,255,0.01)",
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
                        RECENT SIGNAL FEED
                      </Typography>
                    </Box>

                    <Stack spacing={1.4} sx={{ p: 2.2 }}>
                      {feed.map((item) => (
                        <FeedRow key={item.id} item={item} />
                      ))}
                    </Stack>
                  </GlassCard>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Stack spacing={3}>
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
                          RISK DISTRIBUTION
                        </Typography>
                      </Box>

                      <Stack spacing={2} sx={{ p: 3 }}>
                        <StatusBar
                          label="Verified / Real"
                          value={(summary.real / summary.total) * 100}
                          color={tokens.success}
                        />
                        <StatusBar
                          label="Suspicious / Review"
                          value={(summary.suspicious / summary.total) * 100}
                          color={tokens.warning}
                        />
                        <StatusBar
                          label="Fake / Escalate"
                          value={(summary.fake / summary.total) * 100}
                          color={tokens.danger}
                        />
                      </Stack>
                    </GlassCard>

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
                          SYSTEM HEALTH
                        </Typography>
                      </Box>

                      <Stack spacing={2.2} sx={{ p: 3 }}>
                        <StatusBar
                          label="Inference Engine"
                          value={96}
                          color={tokens.success}
                        />
                        <StatusBar
                          label="Vector Retrieval"
                          value={88}
                          color={tokens.accent}
                        />
                        <StatusBar
                          label="Moderation Queue"
                          value={63}
                          color={tokens.warning}
                        />
                        <StatusBar
                          label="Data Consistency"
                          value={91}
                          color="#a78bfa"
                        />
                      </Stack>
                    </GlassCard>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Stack spacing={3}>
              <UrlAnalyzerCard />

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
                    MODEL REGISTRY SNAPSHOT
                  </Typography>
                </Box>

                <Stack spacing={1.4} sx={{ p: 2.2 }}>
                  {[
                    {
                      name: "Classifier Core",
                      version: "v2.4.1",
                      status: "ACTIVE",
                      icon: <PsychologyRoundedIcon sx={{ fontSize: 18 }} />,
                    },
                    {
                      name: "Risk Engine",
                      version: "v1.8.3",
                      status: "ONLINE",
                      icon: <ShieldRoundedIcon sx={{ fontSize: 18 }} />,
                    },
                    {
                      name: "Explainability Layer",
                      version: "v1.2.7",
                      status: "READY",
                      icon: <InsightsRoundedIcon sx={{ fontSize: 18 }} />,
                    },
                    {
                      name: "Source Graph",
                      version: "v3.0.0",
                      status: "SYNCED",
                      icon: <HubRoundedIcon sx={{ fontSize: 18 }} />,
                    },
                  ].map((row) => (
                    <Box
                      key={row.name}
                      sx={{
                        p: 1.8,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Stack direction="row" spacing={1.2} alignItems="center">
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 1.5,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: "rgba(56,189,248,0.10)",
                              color: tokens.accent,
                              border: `1px solid ${tokens.border}`,
                            }}
                          >
                            {row.icon}
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                color: "#f8fafc",
                                fontWeight: 700,
                                fontSize: "0.92rem",
                              }}
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: monoFont,
                                fontSize: "0.72rem",
                                color: tokens.textMuted,
                                mt: 0.3,
                              }}
                            >
                              {row.version}
                            </Typography>
                          </Box>
                        </Stack>

                        <Chip
                          size="small"
                          label={row.status}
                          sx={{
                            fontFamily: monoFont,
                            bgcolor: "rgba(34,197,94,0.10)",
                            color: tokens.success,
                            border: "1px solid rgba(34,197,94,0.22)",
                            "& .MuiChip-label": { fontWeight: 700 },
                          }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </GlassCard>

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
                    ANALYST ACTIVITY
                  </Typography>
                </Box>

                <Stack spacing={1.2} sx={{ p: 2.2 }}>
                  {analystRows.map((row, index) => {
                    const chipTone =
                      row.status === "Cleared"
                        ? { color: tokens.success, bg: "rgba(34,197,94,0.10)" }
                        : row.status === "Escalated"
                        ? { color: tokens.danger, bg: "rgba(239,68,68,0.10)" }
                        : row.status === "Review"
                        ? { color: tokens.warning, bg: "rgba(245,158,11,0.10)" }
                        : { color: tokens.accent, bg: "rgba(56,189,248,0.10)" };

                    return (
                      <Box
                        key={row.id}
                        sx={{
                          p: 1.8,
                          borderRadius: 2,
                          border: `1px solid ${tokens.border}`,
                          bgcolor: tokens.panelElevated,
                        }}
                      >
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              sx={{
                                color: "#f8fafc",
                                fontWeight: 700,
                                fontSize: "0.92rem",
                              }}
                            >
                              {row.artifact}
                            </Typography>

                            <Chip
                              size="small"
                              label={row.status}
                              sx={{
                                bgcolor: chipTone.bg,
                                color: chipTone.color,
                                border: `1px solid ${chipTone.color}33`,
                                "& .MuiChip-label": { fontWeight: 700 },
                              }}
                            />
                          </Stack>

                          <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
                            <Typography
                              sx={{
                                fontFamily: monoFont,
                                fontSize: "0.72rem",
                                color: tokens.textMuted,
                              }}
                            >
                              ID / {row.id}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: monoFont,
                                fontSize: "0.72rem",
                                color: tokens.textMuted,
                              }}
                            >
                              OWNER / {row.owner.toUpperCase()}
                            </Typography>
                          </Stack>

                          <Box>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={0.6}
                            >
                              <Typography
                                sx={{
                                  color: tokens.textSoft,
                                  fontSize: "0.84rem",
                                }}
                              >
                                Risk Score
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: monoFont,
                                  color: "#f8fafc",
                                  fontSize: "0.74rem",
                                }}
                              >
                                {row.risk}%
                              </Typography>
                            </Stack>

                            <LinearProgress
                              variant="determinate"
                              value={row.risk}
                              sx={{
                                height: 7,
                                borderRadius: 999,
                                bgcolor: "rgba(255,255,255,0.06)",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor:
                                    row.risk >= 80
                                      ? tokens.danger
                                      : row.risk >= 50
                                      ? tokens.warning
                                      : tokens.success,
                                },
                              }}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </GlassCard>

              <GlassCard
                sx={{
                  bgcolor: tokens.panel,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 3,
                  boxShadow: "none",
                  p: 3,
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center" mb={1.4}>
                  <StorageRoundedIcon sx={{ color: tokens.accent }} />
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: tokens.textSoft,
                      fontWeight: 700,
                    }}
                  >
                    OPERATIONS NOTE
                  </Typography>
                </Stack>

                <Alert
                  severity="warning"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    bgcolor: "rgba(245,158,11,0.08)",
                    borderColor: "rgba(245,158,11,0.20)",
                    color: "#fde68a",
                    "& .MuiAlert-icon": {
                      color: tokens.warning,
                    },
                  }}
                >
                  Dashboard metrics are currently driven by frontend simulation.
                  Replace static values with FastAPI-backed telemetry, inference,
                  and review-queue endpoints for production behavior.
                </Alert>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    startIcon={<LanRoundedIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#cbd5e1",
                      border: `1px solid ${tokens.border}`,
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderColor: tokens.borderStrong,
                      },
                    }}
                  >
                    Connect API
                  </Button>

                  <Button
                    startIcon={<AutoGraphRoundedIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#cbd5e1",
                      border: `1px solid ${tokens.border}`,
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderColor: tokens.borderStrong,
                      },
                    }}
                  >
                    View Logs
                  </Button>
                </Stack>
              </GlassCard>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 0.2 }}>
          <Grid item xs={12} md={4}>
            <SmallMetric
              label="Source Graph Coverage"
              value="91.2%"
              hint="Cross-source linkage health"
              icon={<HubRoundedIcon sx={{ fontSize: 18 }} />}
              color="#38bdf8"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SmallMetric
              label="Review Queue Depth"
              value="28"
              hint="Pending moderation items"
              icon={<ManageSearchRoundedIcon sx={{ fontSize: 18 }} />}
              color="#f5ed0b"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SmallMetric
              label="Trust Clearance Rate"
              value="84.7%"
              hint="Latest analyst cycle"
              icon={<VerifiedRoundedIcon sx={{ fontSize: 18 }} />}
              color="#22c55e"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}