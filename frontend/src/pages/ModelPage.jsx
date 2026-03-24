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
import ModelTrainingRoundedIcon from "@mui/icons-material/ModelTrainingRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import SectionTitle from "../components/SectionTitle";
import GlassCard from "../components/GlassCard";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const registryRows = [
  {
    name: "Classifier Core",
    version: "v2.4.1",
    role: "Primary text classification",
    framework: "PyTorch",
    status: "Active",
    health: 96,
    latency: 184,
    icon: <PsychologyRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    name: "Risk Scoring Engine",
    version: "v1.8.3",
    role: "Risk calibration and weighting",
    framework: "FastAPI Service",
    status: "Online",
    health: 91,
    latency: 62,
    icon: <FactCheckRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    name: "Explainability Layer",
    version: "v1.2.7",
    role: "Signal extraction and rationale",
    framework: "Python Pipeline",
    status: "Ready",
    health: 88,
    latency: 47,
    icon: <HubRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    name: "Source Graph Resolver",
    version: "v3.0.0",
    role: "Source trust linkage",
    framework: "Graph Index",
    status: "Synced",
    health: 93,
    latency: 73,
    icon: <LanRoundedIcon sx={{ fontSize: 18 }} />,
  },
];

const deploymentRows = [
  {
    env: "Production",
    version: "v2.4.1",
    traffic: 72,
    rollout: "Stable",
    risk: "Low",
  },
  {
    env: "Staging",
    version: "v2.5.0-rc1",
    traffic: 18,
    rollout: "Validation",
    risk: "Medium",
  },
  {
    env: "Research",
    version: "exp-bert-7",
    traffic: 10,
    rollout: "Experimental",
    risk: "High",
  },
];

const performanceRows = [
  { label: "Classification Accuracy", value: 91, color: "#22c55e" },
  { label: "Confidence Calibration", value: 84, color: "#38bdf8" },
  { label: "Explainability Coverage", value: 87, color: "#a78bfa" },
  { label: "Risk Detection Recall", value: 79, color: "#f59e0b" },
];

const infraRows = [
  { label: "Inference API", value: 97, color: "#22c55e" },
  { label: "Vector Store", value: 89, color: "#38bdf8" },
  { label: "Feature Pipeline", value: 86, color: "#a78bfa" },
  { label: "Queue Processor", value: 68, color: "#f59e0b" },
];

function SummaryTile({ label, value, hint, icon, color = "#38bdf8" }) {
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

function MetricBar({ label, value, color }) {
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

function RegistryCard({ row }) {
  const statusTone =
    row.status === "Active" || row.status === "Online" || row.status === "Synced"
      ? { color: "#22c55e", bg: "rgba(34,197,94,0.10)" }
      : row.status === "Ready"
      ? { color: "#38bdf8", bg: "rgba(56,189,248,0.10)" }
      : { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid rgba(148,163,184,0.14)",
        bgcolor: "#111827",
      }}
    >
      <Stack spacing={1.4}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(56,189,248,0.10)",
                color: "#38bdf8",
                border: "1px solid rgba(148,163,184,0.16)",
              }}
            >
              {row.icon}
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#f8fafc",
                  fontWeight: 700,
                  fontSize: "0.96rem",
                }}
              >
                {row.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "#64748b",
                  mt: 0.3,
                }}
              >
                {row.version} / {row.framework.toUpperCase()}
              </Typography>
            </Box>
          </Stack>

          <Chip
            size="small"
            label={row.status}
            sx={{
              bgcolor: statusTone.bg,
              color: statusTone.color,
              border: `1px solid ${statusTone.color}33`,
              "& .MuiChip-label": {
                fontWeight: 700,
              },
            }}
          />
        </Stack>

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: "0.92rem",
            lineHeight: 1.7,
          }}
        >
          {row.role}
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6}>
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.7}>
                <Typography sx={{ color: "#94a3b8", fontSize: "0.86rem", fontWeight: 600 }}>
                  Health
                </Typography>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    color: "#f8fafc",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                  }}
                >
                  {row.health}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={row.health}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "rgba(255,255,255,0.06)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: row.health >= 90 ? "#22c55e" : "#f59e0b",
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 1.4,
                borderRadius: 2,
                border: "1px solid rgba(148,163,184,0.14)",
                bgcolor: "#0f172a",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "#64748b",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  mb: 0.6,
                }}
              >
                Latency
              </Typography>
              <Typography
                sx={{
                  color: "#f8fafc",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {row.latency}ms
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default function ModelPage() {
  const [selectedEnv, setSelectedEnv] = useState("Production");

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

  const selectedDeployment =
    deploymentRows.find((row) => row.env === selectedEnv) || deploymentRows[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.bg,
        color: tokens.text,
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(56,189,248,0.05), transparent 22%),
          radial-gradient(circle at 100% 12%, rgba(167,139,250,0.04), transparent 18%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        <SectionTitle
          eyebrow="MODEL REGISTRY"
          title="Inference Infrastructure and Versioned Components"
          subtitle="Track deployed models, supporting services, runtime health, rollout posture, and infrastructure-readiness across the detection stack."
          rightSlot={
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<ModelTrainingRoundedIcon />}
                label="ACTIVE MODEL STACK"
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
                Refresh Status
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Primary Model"
              value="v2.4.1"
              hint="Production classifier"
              icon={<PsychologyRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.accent}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Avg. Inference Latency"
              value="184ms"
              hint="Production rolling mean"
              icon={<SpeedRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Supporting Services"
              value="4 Online"
              hint="Registry-visible components"
              icon={<HubRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.violet}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Rollout State"
              value="Stable"
              hint="Production traffic dominant"
              icon={<PublishedWithChangesRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.warning}
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
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: tokens.textSoft,
                      fontWeight: 700,
                    }}
                  >
                    COMPONENT REGISTRY
                  </Typography>
                </Box>

                <Stack spacing={1.4} sx={{ p: 2.2 }}>
                  {registryRows.map((row) => (
                    <RegistryCard key={row.name} row={row} />
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
                    PERFORMANCE TELEMETRY
                  </Typography>
                </Box>

                <Grid container spacing={3} sx={{ p: 3 }}>
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
                      {performanceRows.map((item) => (
                        <MetricBar
                          key={item.label}
                          label={item.label}
                          value={item.value}
                          color={item.color}
                        />
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
                        height: "100%",
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center" mb={1.4}>
                        <ScienceRoundedIcon sx={{ color: tokens.accent }} />
                        <Typography
                          sx={{
                            color: "#f8fafc",
                            fontWeight: 700,
                            fontSize: "0.98rem",
                          }}
                        >
                          Evaluation Summary
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
                        The current production stack shows strong classification stability,
                        good explainability coverage, and acceptable latency for moderated
                        review workflows. Risk-detection recall remains the most important
                        candidate for next-cycle improvement.
                      </Typography>

                      <Divider sx={{ my: 2, borderColor: tokens.border }} />

                      <Stack spacing={1.4}>
                        <Stack direction="row" spacing={1.2} alignItems="center">
                          <VerifiedRoundedIcon sx={{ color: tokens.success, fontSize: 18 }} />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                            Production classifier is operating within expected thresholds.
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.2} alignItems="center">
                          <WarningAmberRoundedIcon
                            sx={{ color: tokens.warning, fontSize: 18 }}
                          />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                            Recall on borderline suspicious content should be improved.
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.2} alignItems="center">
                          <ShieldRoundedIcon sx={{ color: tokens.accent, fontSize: 18 }} />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                            Supporting services are healthy enough for staged expansion.
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
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
                    DEPLOYMENT TRACKS
                  </Typography>
                </Box>

                <Stack spacing={1.2} sx={{ p: 2.2 }}>
                  {deploymentRows.map((row) => {
                    const active = selectedEnv === row.env;
                    const riskTone =
                      row.risk === "Low"
                        ? { color: tokens.success, bg: "rgba(34,197,94,0.10)" }
                        : row.risk === "Medium"
                        ? { color: tokens.warning, bg: "rgba(245,158,11,0.10)" }
                        : { color: tokens.danger, bg: "rgba(239,68,68,0.10)" };

                    return (
                      <Box
                        key={row.env}
                        onClick={() => setSelectedEnv(row.env)}
                        sx={{
                          p: 1.8,
                          borderRadius: 2,
                          border: `1px solid ${
                            active ? "rgba(56,189,248,0.24)" : tokens.border
                          }`,
                          bgcolor: active ? "rgba(56,189,248,0.06)" : tokens.panelElevated,
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                        }}
                      >
                        <Stack spacing={1.1}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              sx={{
                                color: "#f8fafc",
                                fontWeight: 700,
                                fontSize: "0.93rem",
                              }}
                            >
                              {row.env}
                            </Typography>

                            <Chip
                              size="small"
                              label={row.risk}
                              sx={{
                                bgcolor: riskTone.bg,
                                color: riskTone.color,
                                border: `1px solid ${riskTone.color}33`,
                                "& .MuiChip-label": {
                                  fontWeight: 700,
                                },
                              }}
                            />
                          </Stack>

                          <Typography
                            sx={{
                              fontFamily: monoFont,
                              fontSize: "0.72rem",
                              color: tokens.textMuted,
                            }}
                          >
                            VERSION / {row.version}
                          </Typography>

                          <MetricBar
                            label="Traffic Share"
                            value={row.traffic}
                            color={active ? tokens.accent : "#64748b"}
                          />

                          <Typography
                            sx={{
                              color: tokens.textSoft,
                              fontSize: "0.87rem",
                            }}
                          >
                            Rollout: {row.rollout}
                          </Typography>
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
                    INFRASTRUCTURE HEALTH
                  </Typography>
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  {infraRows.map((item) => (
                    <MetricBar
                      key={item.label}
                      label={item.label}
                      value={item.value}
                      color={item.color}
                    />
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
                    GOVERNANCE NOTE
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
                  Model and infrastructure metrics are currently frontend-driven.
                  Back this page with registry, rollout, evaluation, and service-health
                  endpoints from your FastAPI backend for production visibility.
                </Alert>

                <Divider sx={{ my: 2, borderColor: tokens.border }} />

                <Stack spacing={1.4}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <MemoryRoundedIcon sx={{ color: tokens.success, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Maintain versioned metadata for every deployed component.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <PublishedWithChangesRoundedIcon
                      sx={{ color: tokens.warning, fontSize: 18 }}
                    />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Track rollout percentage and environment-specific behavior.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <AutoGraphRoundedIcon sx={{ color: tokens.accent, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Preserve evaluation snapshots for regression monitoring.
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
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
                    View Endpoints
                  </Button>

                  <Button
                    startIcon={<VerifiedRoundedIcon />}
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
                    Open Evaluations
                  </Button>
                </Stack>
              </GlassCard>

              <GlassCard
                sx={{
                  bgcolor: tokens.panel,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 3,
                  boxShadow: "none",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: "0.76rem",
                    color: tokens.textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  Selected Environment
                </Typography>

                <Typography
                  sx={{
                    color: "#f8fafc",
                    fontWeight: 700,
                    fontSize: "1rem",
                    mb: 0.7,
                  }}
                >
                  {selectedDeployment.env}
                </Typography>

                <Typography
                  sx={{
                    color: tokens.textSoft,
                    lineHeight: 1.7,
                    fontSize: "0.92rem",
                  }}
                >
                  Version {selectedDeployment.version} currently carries{" "}
                  {selectedDeployment.traffic}% of routed traffic with a{" "}
                  {selectedDeployment.rollout.toLowerCase()} rollout posture and{" "}
                  {selectedDeployment.risk.toLowerCase()} operational risk.
                </Typography>
              </GlassCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}