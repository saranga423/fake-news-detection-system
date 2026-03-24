import { useMemo } from "react";
import {
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
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import GlassCard from "../components/GlassCard";
import SectionTitle from "../components/SectionTitle";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const trendData = [
  { label: "Mon", real: 68, suspicious: 21, fake: 11 },
  { label: "Tue", real: 63, suspicious: 24, fake: 13 },
  { label: "Wed", real: 59, suspicious: 27, fake: 14 },
  { label: "Thu", real: 65, suspicious: 22, fake: 13 },
  { label: "Fri", real: 61, suspicious: 25, fake: 14 },
  { label: "Sat", real: 57, suspicious: 28, fake: 15 },
  { label: "Sun", real: 64, suspicious: 23, fake: 13 },
];

const signalClusters = [
  { name: "sensational framing", count: 142, tone: "warning" },
  { name: "source ambiguity", count: 118, tone: "warning" },
  { name: "clickbait phrasing", count: 97, tone: "danger" },
  { name: "neutral syntax", count: 166, tone: "success" },
  { name: "verified context", count: 124, tone: "success" },
  { name: "manipulative urgency", count: 73, tone: "danger" },
  { name: "claim inflation", count: 89, tone: "warning" },
  { name: "objective tone", count: 138, tone: "success" },
];

const sourceGroups = [
  {
    label: "Mainstream News",
    volume: 4821,
    avgConfidence: 89,
    risk: 16,
  },
  {
    label: "Blogs / Independent Sites",
    volume: 2146,
    avgConfidence: 71,
    risk: 44,
  },
  {
    label: "Social Captures",
    volume: 3568,
    avgConfidence: 66,
    risk: 58,
  },
  {
    label: "Forums / User Posts",
    volume: 1742,
    avgConfidence: 61,
    risk: 63,
  },
];

const explanationRows = [
  {
    headline: "Government secrets exposed in shocking overnight leak",
    topSignals: ["shocking", "claim inflation", "source ambiguity"],
    verdict: "Fake",
    confidence: 92.4,
  },
  {
    headline: "Transport authority confirms phased route expansion plan",
    topSignals: ["verified context", "neutral syntax", "objective tone"],
    verdict: "Real",
    confidence: 87.3,
  },
  {
    headline: "Breaking footage may reveal hidden election plot",
    topSignals: ["breaking", "manipulative urgency", "low-source clarity"],
    verdict: "Suspicious",
    confidence: 74.1,
  },
];

function StatTile({ label, value, hint, icon, color = "#38bdf8" }) {
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
              mb: 0.7,
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              color: "#f8fafc",
              fontSize: "1.18rem",
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

function DistributionBar({ label, value, color }) {
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

function TrendRow({ item }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "68px 1fr",
        gap: 1.5,
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: "0.76rem",
          color: "#94a3b8",
          letterSpacing: "0.06em",
        }}
      >
        {item.label.toUpperCase()}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Box sx={{ flex: item.real }}>
          <Box
            sx={{
              height: 10,
              borderRadius: 999,
              bgcolor: "#22c55e",
            }}
          />
        </Box>
        <Box sx={{ flex: item.suspicious }}>
          <Box
            sx={{
              height: 10,
              borderRadius: 999,
              bgcolor: "#f59e0b",
            }}
          />
        </Box>
        <Box sx={{ flex: item.fake }}>
          <Box
            sx={{
              height: 10,
              borderRadius: 999,
              bgcolor: "#ef4444",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default function InsightsPage() {
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
      violet: "#a78bfa",
    }),
    []
  );

  const aggregate = useMemo(() => {
    const totalReal = trendData.reduce((sum, d) => sum + d.real, 0);
    const totalSuspicious = trendData.reduce((sum, d) => sum + d.suspicious, 0);
    const totalFake = trendData.reduce((sum, d) => sum + d.fake, 0);
    const total = totalReal + totalSuspicious + totalFake;

    return {
      total,
      realPct: Math.round((totalReal / total) * 100),
      suspiciousPct: Math.round((totalSuspicious / total) * 100),
      fakePct: Math.round((totalFake / total) * 100),
    };
  }, []);

  const maxSignalCount = Math.max(...signalClusters.map((s) => s.count));

  const toneMap = {
    success: { color: tokens.success, bg: "rgba(34,197,94,0.10)" },
    warning: { color: tokens.warning, bg: "rgba(245,158,11,0.10)" },
    danger: { color: tokens.danger, bg: "rgba(239,68,68,0.10)" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.bg,
        color: tokens.text,
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(56,189,248,0.05), transparent 22%),
          radial-gradient(circle at 100% 10%, rgba(167,139,250,0.04), transparent 18%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        <SectionTitle
          eyebrow="DEEP ANALYTICS"
          title="Insights and Explainability Surface"
          subtitle="Trend analysis, signal clustering, classification distribution, and model-facing interpretation views for content intelligence workflows."
          rightSlot={
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<InsightsRoundedIcon />}
                label="WEEKLY AGGREGATE"
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
                startIcon={<RestartAltRoundedIcon />}
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
                Recompute
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatTile
              label="Processed Corpus"
              value="12,277"
              hint="Window: last 7 days"
              icon={<QueryStatsRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.accent}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatTile
              label="Explainability Density"
              value="83.6%"
              hint="Average signal visibility"
              icon={<PsychologyRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.violet}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatTile
              label="High-Risk Share"
              value={`${aggregate.fakePct + aggregate.suspiciousPct}%`}
              hint="Suspicious + fake content"
              icon={<WarningAmberRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.warning}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatTile
              label="Verified Share"
              value={`${aggregate.realPct}%`}
              hint="Lower-risk classifications"
              icon={<VerifiedRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.success}
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
                    spacing={1}
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
                      CLASSIFICATION TREND MODEL
                    </Typography>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      <Chip
                        size="small"
                        label="REAL"
                        sx={{
                          bgcolor: "rgba(34,197,94,0.10)",
                          color: tokens.success,
                          border: "1px solid rgba(34,197,94,0.22)",
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        size="small"
                        label="SUSPICIOUS"
                        sx={{
                          bgcolor: "rgba(245,158,11,0.10)",
                          color: tokens.warning,
                          border: "1px solid rgba(245,158,11,0.22)",
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        size="small"
                        label="FAKE"
                        sx={{
                          bgcolor: "rgba(239,68,68,0.10)",
                          color: tokens.danger,
                          border: "1px solid rgba(239,68,68,0.22)",
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                  </Stack>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    {trendData.map((item) => (
                      <TrendRow key={item.label} item={item} />
                    ))}
                  </Stack>

                  <Divider sx={{ my: 2.5, borderColor: tokens.border }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <DistributionBar
                        label="Real"
                        value={aggregate.realPct}
                        color={tokens.success}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <DistributionBar
                        label="Suspicious"
                        value={aggregate.suspiciousPct}
                        color={tokens.warning}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <DistributionBar
                        label="Fake"
                        value={aggregate.fakePct}
                        color={tokens.danger}
                      />
                    </Grid>
                  </Grid>
                </Box>
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
                    EXPLANATION TRACE SAMPLES
                  </Typography>
                </Box>

                <Stack spacing={1.5} sx={{ p: 2.2 }}>
                  {explanationRows.map((row) => {
                    const tone =
                      row.verdict === "Real"
                        ? { color: tokens.success, bg: "rgba(34,197,94,0.10)" }
                        : row.verdict === "Fake"
                        ? { color: tokens.danger, bg: "rgba(239,68,68,0.10)" }
                        : { color: tokens.warning, bg: "rgba(245,158,11,0.10)" };

                    return (
                      <Box
                        key={row.headline}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: `1px solid ${tokens.border}`,
                          bgcolor: tokens.panelElevated,
                        }}
                      >
                        <Stack spacing={1.3}>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={1.2}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", md: "center" }}
                          >
                            <Typography
                              sx={{
                                color: "#f8fafc",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                lineHeight: 1.45,
                              }}
                            >
                              {row.headline}
                            </Typography>

                            <Chip
                              size="small"
                              label={`${row.verdict} / ${row.confidence}%`}
                              sx={{
                                bgcolor: tone.bg,
                                color: tone.color,
                                border: `1px solid ${tone.color}33`,
                                fontWeight: 700,
                              }}
                            />
                          </Stack>

                          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {row.topSignals.map((signal) => (
                              <Chip
                                key={signal}
                                size="small"
                                label={signal}
                                sx={{
                                  bgcolor: "rgba(56,189,248,0.08)",
                                  color: "#bae6fd",
                                  border: `1px solid ${tokens.border}`,
                                  "& .MuiChip-label": {
                                    fontWeight: 600,
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </GlassCard>
            </Stack>
          </Grid>

          <Grid item xs={12} xl={4}>
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
                    SIGNAL CLUSTERS
                  </Typography>
                </Box>

                <Stack spacing={1.4} sx={{ p: 2.2 }}>
                  {signalClusters.map((signal) => {
                    const tone = toneMap[signal.tone];
                    const width = (signal.count / maxSignalCount) * 100;

                    return (
                      <Box
                        key={signal.name}
                        sx={{
                          p: 1.6,
                          borderRadius: 2,
                          border: `1px solid ${tokens.border}`,
                          bgcolor: tokens.panelElevated,
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={0.9}
                        >
                          <Typography
                            sx={{
                              color: "#e2e8f0",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                            }}
                          >
                            {signal.name}
                          </Typography>

                          <Typography
                            sx={{
                              fontFamily: monoFont,
                              fontSize: "0.75rem",
                              color: tone.color,
                              fontWeight: 700,
                            }}
                          >
                            {signal.count}
                          </Typography>
                        </Stack>

                        <Box
                          sx={{
                            height: 7,
                            borderRadius: 999,
                            bgcolor: "rgba(255,255,255,0.06)",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${width}%`,
                              height: "100%",
                              borderRadius: 999,
                              bgcolor: tone.color,
                            }}
                          />
                        </Box>
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
                    SOURCE SEGMENT ANALYSIS
                  </Typography>
                </Box>

                <Stack spacing={1.4} sx={{ p: 2.2 }}>
                  {sourceGroups.map((group) => (
                    <Box
                      key={group.label}
                      sx={{
                        p: 1.8,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
                      }}
                    >
                      <Stack spacing={1.2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            sx={{
                              color: "#f8fafc",
                              fontWeight: 700,
                              fontSize: "0.92rem",
                            }}
                          >
                            {group.label}
                          </Typography>

                          <Typography
                            sx={{
                              fontFamily: monoFont,
                              fontSize: "0.74rem",
                              color: tokens.textMuted,
                            }}
                          >
                            VOL / {group.volume}
                          </Typography>
                        </Stack>

                        <DistributionBar
                          label="Average Confidence"
                          value={group.avgConfidence}
                          color={tokens.accent}
                        />

                        <DistributionBar
                          label="Risk Exposure"
                          value={group.risk}
                          color={
                            group.risk >= 55
                              ? tokens.danger
                              : group.risk >= 35
                              ? tokens.warning
                              : tokens.success
                          }
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
                  p: 3,
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center" mb={1.5}>
                  <TravelExploreRoundedIcon sx={{ color: tokens.accent }} />
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: tokens.textSoft,
                      fontWeight: 700,
                    }}
                  >
                    ANALYST INTERPRETATION
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: tokens.textSoft,
                    lineHeight: 1.8,
                    fontSize: "0.94rem",
                    mb: 2,
                  }}
                >
                  The current weekly pattern indicates a stable verified-content
                  baseline with elevated suspicious detections in social and
                  forum-originated inputs. Signal clustering suggests that
                  manipulative urgency and source ambiguity remain the strongest
                  escalation drivers.
                </Typography>

                <Divider sx={{ my: 2, borderColor: tokens.border }} />

                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <TimelineRoundedIcon sx={{ color: tokens.success, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Verified-content share remains operationally dominant.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <WarningAmberRoundedIcon
                      sx={{ color: tokens.warning, fontSize: 18 }}
                    />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Suspicious content is concentrated in fast-moving, low-context channels.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <HubRoundedIcon sx={{ color: tokens.danger, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Source ambiguity and urgency cues correlate most with escalation events.
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
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
                    Export Trends
                  </Button>

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
                    Open Raw Signals
                  </Button>
                </Stack>
              </GlassCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}