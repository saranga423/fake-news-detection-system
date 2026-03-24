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
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import GlassCard from "../components/GlassCard";
import SectionTitle from "../components/SectionTitle";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const initialCases = [
  {
    id: "MD-3108",
    headline: "Government secrets exposed in shocking overnight leak",
    source: "Global Politics Wire",
    verdict: "Fake",
    confidence: 92.4,
    risk: 94,
    status: "Escalated",
    priority: "Critical",
    assignee: "Analyst 02",
    submittedAt: "2026-03-18 09:42",
    category: "Political Claim",
    summary:
      "Multiple deception markers detected including manipulative urgency, claim inflation, and weak source traceability.",
    signals: ["shocking", "claim inflation", "source ambiguity", "manipulative urgency"],
    evidence: [
      "Headline uses urgency-heavy framing.",
      "No verified primary source reference found.",
      "Confidence and risk scores exceed escalation threshold.",
    ],
  },
  {
    id: "MD-3107",
    headline: "Breaking footage may reveal hidden election plot",
    source: "Social Stream Capture",
    verdict: "Suspicious",
    confidence: 74.1,
    risk: 67,
    status: "Review",
    priority: "High",
    assignee: "Analyst 03",
    submittedAt: "2026-03-18 09:13",
    category: "Election Narrative",
    summary:
      "Borderline case requiring manual verification due to incomplete sourcing and suggestive narrative framing.",
    signals: ["breaking", "low-source clarity", "manipulative urgency"],
    evidence: [
      "Video origin remains unverified.",
      "Language suggests speculative interpretation rather than confirmed fact.",
      "Requires corroboration from reliable outlets.",
    ],
  },
  {
    id: "MD-3106",
    headline: "Regional transit tender enters procurement review phase",
    source: "Infrastructure Bulletin",
    verdict: "Suspicious",
    confidence: 68.8,
    risk: 54,
    status: "Queued",
    priority: "Medium",
    assignee: "Analyst 04",
    submittedAt: "2026-03-18 08:15",
    category: "Public Infrastructure",
    summary:
      "Moderate-risk item with partial supporting context but insufficient external validation.",
    signals: ["partial source clarity", "limited corroboration"],
    evidence: [
      "Structured tone but limited external references.",
      "Needs procurement source cross-check.",
    ],
  },
  {
    id: "MD-3105",
    headline: "Transport authority confirms phased route expansion plan",
    source: "City Monitor",
    verdict: "Real",
    confidence: 87.3,
    risk: 18,
    status: "Cleared",
    priority: "Low",
    assignee: "Analyst 01",
    submittedAt: "2026-03-18 09:28",
    category: "Transport Update",
    summary:
      "Low-risk content with neutral syntax and sufficient contextual grounding.",
    signals: ["verified context", "neutral syntax", "objective tone"],
    evidence: [
      "Matches official authority announcement format.",
      "No material deception indicators detected.",
    ],
  },
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

function getVerdictTone(verdict) {
  if (verdict === "Real") {
    return { color: "#22c55e", bg: "rgba(34,197,94,0.10)" };
  }
  if (verdict === "Fake") {
    return { color: "#ef4444", bg: "rgba(239,68,68,0.10)" };
  }
  return { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };
}

function getPriorityTone(priority) {
  if (priority === "Critical") {
    return { color: "#ef4444", bg: "rgba(239,68,68,0.10)" };
  }
  if (priority === "High") {
    return { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };
  }
  if (priority === "Medium") {
    return { color: "#38bdf8", bg: "rgba(56,189,248,0.10)" };
  }
  return { color: "#22c55e", bg: "rgba(34,197,94,0.10)" };
}

function getStatusTone(status) {
  if (status === "Cleared") {
    return { color: "#22c55e", bg: "rgba(34,197,94,0.10)" };
  }
  if (status === "Escalated") {
    return { color: "#ef4444", bg: "rgba(239,68,68,0.10)" };
  }
  if (status === "Review") {
    return { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };
  }
  return { color: "#38bdf8", bg: "rgba(56,189,248,0.10)" };
}

function QueueItem({ item, active, onClick }) {
  const verdictTone = getVerdictTone(item.verdict);
  const priorityTone = getPriorityTone(item.priority);

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.8,
        borderRadius: 2,
        border: `1px solid ${active ? "rgba(56,189,248,0.24)" : "rgba(148,163,184,0.14)"}`,
        bgcolor: active ? "rgba(56,189,248,0.06)" : "#111827",
        cursor: "pointer",
        transition: "all 0.18s ease",
      }}
    >
      <Stack spacing={1.1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Chip
            size="small"
            label={item.priority}
            sx={{
              bgcolor: priorityTone.bg,
              color: priorityTone.color,
              border: `1px solid ${priorityTone.color}33`,
              "& .MuiChip-label": { fontWeight: 700 },
            }}
          />
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "#64748b",
            }}
          >
            {item.id}
          </Typography>
        </Stack>

        <Typography
          sx={{
            color: "#f8fafc",
            fontWeight: 700,
            fontSize: "0.92rem",
            lineHeight: 1.45,
          }}
        >
          {item.headline}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            size="small"
            label={item.verdict}
            sx={{
              bgcolor: verdictTone.bg,
              color: verdictTone.color,
              border: `1px solid ${verdictTone.color}33`,
              "& .MuiChip-label": { fontWeight: 700 },
            }}
          />
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "#94a3b8",
              alignSelf: "center",
            }}
          >
            {item.confidence}%
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function ModerationPage() {
  const [cases] = useState(initialCases);
  const [selectedId, setSelectedId] = useState(initialCases[0].id);

  const tokens = useMemo(
    () => ({
      bg: "#020617",
      panel: "#0b1220",
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

  const selectedCase = cases.find((item) => item.id === selectedId) || cases[0];

  const summary = useMemo(() => {
    const total = cases.length;
    const escalated = cases.filter((c) => c.status === "Escalated").length;
    const review = cases.filter((c) => c.status === "Review").length;
    const queued = cases.filter((c) => c.status === "Queued").length;
    return { total, escalated, review, queued };
  }, [cases]);

  const selectedVerdictTone = getVerdictTone(selectedCase.verdict);
  const selectedStatusTone = getStatusTone(selectedCase.status);
  const selectedPriorityTone = getPriorityTone(selectedCase.priority);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.bg,
        color: tokens.text,
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(56,189,248,0.05), transparent 22%),
          radial-gradient(circle at 100% 10%, rgba(239,68,68,0.04), transparent 18%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        <SectionTitle
          eyebrow="CASE TRIAGE"
          title="Moderation Review Workspace"
          subtitle="Review flagged cases, inspect evidence signals, and route items through clearance or escalation decisions."
          rightSlot={
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<GavelRoundedIcon />}
                label="REVIEW MODE"
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
                Refresh Queue
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Open Cases"
              value={summary.total}
              hint="Visible moderation queue"
              icon={<DescriptionRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.accent}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Escalated"
              value={summary.escalated}
              hint="Critical interventions"
              icon={<FlagRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.danger}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="In Review"
              value={summary.review}
              hint="Analyst verification stage"
              icon={<FactCheckRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.warning}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Queued"
              value={summary.queued}
              hint="Awaiting assignment"
              icon={<AssignmentTurnedInRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.violet}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} xl={4.2}>
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
                  ACTIVE CASE QUEUE
                </Typography>
              </Box>

              <Stack spacing={1.3} sx={{ p: 2.2 }}>
                {cases.map((item) => (
                  <QueueItem
                    key={item.id}
                    item={item}
                    active={item.id === selectedCase.id}
                    onClick={() => setSelectedId(item.id)}
                  />
                ))}
              </Stack>
            </GlassCard>
          </Grid>

          <Grid item xs={12} xl={7.8}>
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
                    direction={{ xs: "column", lg: "row" }}
                    spacing={1.2}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", lg: "center" }}
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
                      CASE DETAIL
                    </Typography>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      <Chip
                        size="small"
                        label={selectedCase.priority}
                        sx={{
                          bgcolor: selectedPriorityTone.bg,
                          color: selectedPriorityTone.color,
                          border: `1px solid ${selectedPriorityTone.color}33`,
                          "& .MuiChip-label": { fontWeight: 700 },
                        }}
                      />
                      <Chip
                        size="small"
                        label={selectedCase.status}
                        sx={{
                          bgcolor: selectedStatusTone.bg,
                          color: selectedStatusTone.color,
                          border: `1px solid ${selectedStatusTone.color}33`,
                          "& .MuiChip-label": { fontWeight: 700 },
                        }}
                      />
                      <Chip
                        size="small"
                        label={`${selectedCase.verdict} / ${selectedCase.confidence}%`}
                        sx={{
                          bgcolor: selectedVerdictTone.bg,
                          color: selectedVerdictTone.color,
                          border: `1px solid ${selectedVerdictTone.color}33`,
                          "& .MuiChip-label": { fontWeight: 700 },
                        }}
                      />
                    </Stack>
                  </Stack>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Stack spacing={2.2}>
                    <Box>
                      <Typography
                        sx={{
                          color: "#f8fafc",
                          fontWeight: 800,
                          fontSize: "1.15rem",
                          lineHeight: 1.4,
                          mb: 0.8,
                        }}
                      >
                        {selectedCase.headline}
                      </Typography>

                      <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            fontSize: "0.74rem",
                            color: tokens.textMuted,
                          }}
                        >
                          ID / {selectedCase.id}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            fontSize: "0.74rem",
                            color: tokens.textMuted,
                          }}
                        >
                          SOURCE / {selectedCase.source.toUpperCase()}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            fontSize: "0.74rem",
                            color: tokens.textMuted,
                          }}
                        >
                          CATEGORY / {selectedCase.category.toUpperCase()}
                        </Typography>
                      </Stack>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PersonRoundedIcon sx={{ color: tokens.textSoft, fontSize: 17 }} />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                            {selectedCase.assignee}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTimeRoundedIcon sx={{ color: tokens.textSoft, fontSize: 17 }} />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                            {selectedCase.submittedAt}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ShieldRoundedIcon sx={{ color: tokens.textSoft, fontSize: 17 }} />
                          <Typography sx={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                            Risk {selectedCase.risk}%
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
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
                        Case Summary
                      </Typography>
                      <Typography
                        sx={{
                          color: tokens.textSoft,
                          lineHeight: 1.8,
                          fontSize: "0.94rem",
                        }}
                      >
                        {selectedCase.summary}
                      </Typography>
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={0.8}
                      >
                        <Typography
                          sx={{
                            color: tokens.textSoft,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                          }}
                        >
                          Moderation Risk Index
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            fontSize: "0.78rem",
                            color: "#f8fafc",
                            fontWeight: 700,
                          }}
                        >
                          {selectedCase.risk}%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={selectedCase.risk}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          bgcolor: "rgba(255,255,255,0.06)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              selectedCase.risk >= 80
                                ? tokens.danger
                                : selectedCase.risk >= 50
                                ? tokens.warning
                                : tokens.success,
                          },
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${tokens.border}`,
                            bgcolor: tokens.panelElevated,
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: monoFont,
                              fontSize: "0.76rem",
                              color: tokens.textMuted,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              mb: 1.2,
                            }}
                          >
                            Evidence Signals
                          </Typography>

                          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {selectedCase.signals.map((signal) => (
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
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${tokens.border}`,
                            bgcolor: tokens.panelElevated,
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: monoFont,
                              fontSize: "0.76rem",
                              color: tokens.textMuted,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              mb: 1.2,
                            }}
                          >
                            Evidence Notes
                          </Typography>

                          <Stack spacing={1}>
                            {selectedCase.evidence.map((entry) => (
                              <Typography
                                key={entry}
                                sx={{
                                  color: tokens.textSoft,
                                  fontSize: "0.92rem",
                                  lineHeight: 1.7,
                                }}
                              >
                                • {entry}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
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
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center" mb={1.5}>
                      <GavelRoundedIcon sx={{ color: tokens.accent }} />
                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: "0.82rem",
                          letterSpacing: "0.08em",
                          color: tokens.textSoft,
                          fontWeight: 700,
                        }}
                      >
                        REVIEWER ACTIONS
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        color: tokens.textSoft,
                        lineHeight: 1.8,
                        fontSize: "0.94rem",
                        mb: 2.2,
                      }}
                    >
                      Route the selected case through moderation outcomes after verifying
                      evidence, confidence stability, and source trust posture.
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.2}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        startIcon={<VerifiedRoundedIcon />}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: 2,
                          bgcolor: "#e2e8f0",
                          color: "#0f172a",
                          "&:hover": {
                            bgcolor: "#cbd5e1",
                          },
                        }}
                      >
                        Mark Cleared
                      </Button>

                      <Button
                        startIcon={<WarningAmberRoundedIcon />}
                        sx={{
                          textTransform: "none",
                          color: "#fcd34d",
                          border: "1px solid rgba(245,158,11,0.22)",
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: "rgba(245,158,11,0.06)",
                          },
                        }}
                      >
                        Hold for Review
                      </Button>

                      <Button
                        startIcon={<ReportProblemRoundedIcon />}
                        sx={{
                          textTransform: "none",
                          color: "#fca5a5",
                          border: "1px solid rgba(239,68,68,0.22)",
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: "rgba(239,68,68,0.06)",
                          },
                        }}
                      >
                        Escalate Case
                      </Button>
                    </Stack>
                  </GlassCard>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <GlassCard
                    sx={{
                      bgcolor: tokens.panel,
                      border: `1px solid ${tokens.border}`,
                      borderRadius: 3,
                      boxShadow: "none",
                      p: 3,
                      height: "100%",
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center" mb={1.5}>
                      <PsychologyRoundedIcon sx={{ color: tokens.accent }} />
                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: "0.82rem",
                          letterSpacing: "0.08em",
                          color: tokens.textSoft,
                          fontWeight: 700,
                        }}
                      >
                        TRIAGE NOTE
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
                      These actions are currently UI-only. Connect them to FastAPI moderation
                      endpoints to persist reviewer decisions, notes, and escalation flow.
                    </Alert>

                    <Divider sx={{ my: 2, borderColor: tokens.border }} />

                    <Stack spacing={1.4}>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <ShieldRoundedIcon sx={{ color: tokens.success, fontSize: 18 }} />
                        <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                          Preserve reviewer identity and timestamps.
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <FlagRoundedIcon sx={{ color: tokens.danger, fontSize: 18 }} />
                        <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                          Escalated cases should create immutable audit entries.
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <LanRoundedIcon sx={{ color: tokens.accent, fontSize: 18 }} />
                        <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                          Reviewer actions should sync with dashboard and history views.
                        </Typography>
                      </Stack>
                    </Stack>
                  </GlassCard>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}