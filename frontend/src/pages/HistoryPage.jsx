import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import GlassCard from "../components/GlassCard";
import SectionTitle from "../components/SectionTitle";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const initialRows = [
  {
    id: "EV-24091",
    title: "Government secrets exposed in shocking overnight leak",
    source: "Global Politics Wire",
    verdict: "Fake",
    confidence: 92.4,
    risk: 94,
    analyst: "Analyst 02",
    status: "Escalated",
    createdAt: "2026-03-18 09:42",
    reviewedAt: "2026-03-18 09:49",
    signals: ["shocking", "claim inflation", "source ambiguity"],
  },
  {
    id: "EV-24090",
    title: "Transport authority confirms phased route expansion plan",
    source: "City Monitor",
    verdict: "Real",
    confidence: 87.3,
    risk: 18,
    analyst: "Analyst 01",
    status: "Cleared",
    createdAt: "2026-03-18 09:28",
    reviewedAt: "2026-03-18 09:31",
    signals: ["verified context", "neutral syntax", "objective tone"],
  },
  {
    id: "EV-24089",
    title: "Breaking footage may reveal hidden election plot",
    source: "Social Stream Capture",
    verdict: "Suspicious",
    confidence: 74.1,
    risk: 67,
    analyst: "Analyst 03",
    status: "Review",
    createdAt: "2026-03-18 09:13",
    reviewedAt: "2026-03-18 09:20",
    signals: ["breaking", "manipulative urgency", "low-source clarity"],
  },
  {
    id: "EV-24088",
    title: "Local council budget proposal enters public review period",
    source: "Civic Desk",
    verdict: "Real",
    confidence: 84.9,
    risk: 21,
    analyst: "Analyst 01",
    status: "Cleared",
    createdAt: "2026-03-18 08:56",
    reviewedAt: "2026-03-18 09:02",
    signals: ["objective tone", "verified context", "neutral syntax"],
  },
  {
    id: "EV-24087",
    title: "They don't want you to know this miracle health trick",
    source: "TrendBurst Daily",
    verdict: "Fake",
    confidence: 94.1,
    risk: 96,
    analyst: "Analyst 05",
    status: "Escalated",
    createdAt: "2026-03-18 08:31",
    reviewedAt: "2026-03-18 08:39",
    signals: ["clickbait phrasing", "manipulative urgency", "claim inflation"],
  },
  {
    id: "EV-24086",
    title: "Regional transit tender enters procurement review phase",
    source: "Infrastructure Bulletin",
    verdict: "Suspicious",
    confidence: 68.8,
    risk: 54,
    analyst: "Analyst 04",
    status: "Queued",
    createdAt: "2026-03-18 08:15",
    reviewedAt: "Pending",
    signals: ["partial source clarity", "limited corroboration"],
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
    return { color: "#22c55e", bg: "rgba(34,197,94,0.10)", icon: <VerifiedRoundedIcon sx={{ fontSize: 18 }} /> };
  }
  if (verdict === "Fake") {
    return { color: "#ef4444", bg: "rgba(239,68,68,0.10)", icon: <ReportProblemRoundedIcon sx={{ fontSize: 18 }} /> };
  }
  return { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", icon: <WarningAmberRoundedIcon sx={{ fontSize: 18 }} /> };
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

function AuditRow({ row }) {
  const verdictTone = getVerdictTone(row.verdict);
  const statusTone = getStatusTone(row.status);

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
          direction={{ xs: "column", lg: "row" }}
          spacing={1.2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: "0.96rem",
                lineHeight: 1.45,
                mb: 0.5,
              }}
            >
              {row.title}
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "#64748b",
                }}
              >
                ID / {row.id}
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "#64748b",
                }}
              >
                SOURCE / {row.source.toUpperCase()}
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
              size="small"
              icon={verdictTone.icon}
              label={`${row.verdict} / ${row.confidence}%`}
              sx={{
                bgcolor: verdictTone.bg,
                color: verdictTone.color,
                border: `1px solid ${verdictTone.color}33`,
                "& .MuiChip-label": {
                  fontWeight: 700,
                },
              }}
            />
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
        </Stack>

        <Grid container spacing={1.5}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonRoundedIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
              <Typography sx={{ color: "#cbd5e1", fontSize: "0.88rem" }}>
                {row.analyst}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeRoundedIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
              <Typography sx={{ color: "#cbd5e1", fontSize: "0.88rem" }}>
                Created: {row.createdAt}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AssignmentTurnedInRoundedIcon sx={{ color: "#94a3b8", fontSize: 17 }} />
              <Typography sx={{ color: "#cbd5e1", fontSize: "0.88rem" }}>
                Reviewed: {row.reviewedAt}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.7}>
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "0.86rem",
                fontWeight: 600,
              }}
            >
              Risk Score
            </Typography>
            <Typography
              sx={{
                fontFamily: monoFont,
                color: "#f8fafc",
                fontSize: "0.76rem",
                fontWeight: 700,
              }}
            >
              {row.risk}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={row.risk}
            sx={{
              height: 8,
              borderRadius: 999,
              bgcolor: "rgba(255,255,255,0.06)",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  row.risk >= 80 ? "#ef4444" : row.risk >= 50 ? "#f59e0b" : "#22c55e",
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {row.signals.map((signal) => (
            <Chip
              key={`${row.id}-${signal}`}
              size="small"
              label={signal}
              sx={{
                bgcolor: "rgba(56,189,248,0.08)",
                color: "#bae6fd",
                border: "1px solid rgba(148,163,184,0.16)",
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
}

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const rows = initialRows;

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

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesFilter =
        activeFilter === "All" ||
        row.status === activeFilter ||
        row.verdict === activeFilter;

      const matchesQuery =
        !normalized ||
        row.title.toLowerCase().includes(normalized) ||
        row.source.toLowerCase().includes(normalized) ||
        row.id.toLowerCase().includes(normalized) ||
        row.analyst.toLowerCase().includes(normalized);

      return matchesFilter && matchesQuery;
    });
  }, [rows, query, activeFilter]);

  const summary = useMemo(() => {
    const total = rows.length;
    const cleared = rows.filter((r) => r.status === "Cleared").length;
    const escalated = rows.filter((r) => r.status === "Escalated").length;
    const pending = rows.filter((r) => r.status === "Queued" || r.status === "Review").length;
    const avgRisk = Math.round(rows.reduce((sum, r) => sum + r.risk, 0) / rows.length);

    return { total, cleared, escalated, pending, avgRisk };
  }, [rows]);

  const filters = ["All", "Cleared", "Escalated", "Review", "Queued", "Real", "Fake", "Suspicious"];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.bg,
        color: tokens.text,
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(56,189,248,0.05), transparent 22%),
          radial-gradient(circle at 100% 12%, rgba(239,68,68,0.04), transparent 18%)
        `,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 } }}>
        <SectionTitle
          eyebrow="AUDIT TRAIL"
          title="Review History and Decision Log"
          subtitle="Trace classification events, analyst decisions, escalation outcomes, and signal-level evidence across the moderation workflow."
          rightSlot={
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                icon={<HistoryRoundedIcon />}
                label="EVENT LOG ACTIVE"
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
                Refresh
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Total Events"
              value={summary.total}
              hint="Captured review records"
              icon={<HistoryRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.accent}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Escalated Cases"
              value={summary.escalated}
              hint="High-risk routed items"
              icon={<GavelRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.danger}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Pending Review"
              value={summary.pending}
              hint="Queued + active checks"
              icon={<ShieldRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.warning}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryTile
              label="Average Risk"
              value={`${summary.avgRisk}%`}
              hint="Across visible audit set"
              icon={<PsychologyRoundedIcon sx={{ fontSize: 18 }} />}
              color={tokens.violet}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} xl={8.5}>
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
                  spacing={1.5}
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
                    REVIEW EVENT STREAM
                  </Typography>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={1.2} sx={{ width: { xs: "100%", lg: "auto" } }}>
                    <TextField
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by title, source, analyst, or event ID..."
                      size="small"
                      InputProps={{
                        startAdornment: <SearchRoundedIcon sx={{ color: "#64748b", fontSize: 18, mr: 1 }} />,
                      }}
                      sx={{
                        minWidth: { xs: "100%", md: 320 },
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#020617",
                          color: "#e5e7eb",
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: tokens.border,
                          },
                          "&:hover fieldset": {
                            borderColor: tokens.borderStrong,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: tokens.accent,
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#64748b",
                          opacity: 1,
                        },
                      }}
                    />

                    <Button
                      startIcon={<DownloadRoundedIcon />}
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
                      Export Log
                    </Button>
                  </Stack>
                </Stack>
              </Box>

              <Box sx={{ p: 2.2 }}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                  {filters.map((filter) => {
                    const active = activeFilter === filter;
                    return (
                      <Chip
                        key={filter}
                        label={filter}
                        onClick={() => setActiveFilter(filter)}
                        icon={<FilterListRoundedIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          bgcolor: active ? "rgba(56,189,248,0.10)" : "#111827",
                          color: active ? tokens.accent : "#94a3b8",
                          border: `1px solid ${active ? "rgba(56,189,248,0.22)" : tokens.border}`,
                          "& .MuiChip-label": {
                            fontWeight: 700,
                          },
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </Stack>

                <Stack spacing={1.4}>
                  {filteredRows.map((row) => (
                    <AuditRow key={row.id} row={row} />
                  ))}

                  {filteredRows.length === 0 && (
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
                      }}
                    >
                      <Typography sx={{ color: "#f8fafc", fontWeight: 700, mb: 0.8 }}>
                        No matching audit records
                      </Typography>
                      <Typography sx={{ color: tokens.textSoft, lineHeight: 1.7 }}>
                        Adjust the active filter or broaden the search query to view additional history records.
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </GlassCard>
          </Grid>

          <Grid item xs={12} xl={3.5}>
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
                    WORKFLOW DISTRIBUTION
                  </Typography>
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  {[
                    { label: "Cleared", value: Math.round((summary.cleared / summary.total) * 100), color: tokens.success },
                    { label: "Escalated", value: Math.round((summary.escalated / summary.total) * 100), color: tokens.danger },
                    { label: "Pending", value: Math.round((summary.pending / summary.total) * 100), color: tokens.warning },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.8}>
                        <Typography sx={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            color: "#f8fafc",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.value}%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          bgcolor: "rgba(255,255,255,0.06)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: item.color,
                          },
                        }}
                      />
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
                    ANALYST OWNERSHIP
                  </Typography>
                </Box>

                <Stack spacing={1.3} sx={{ p: 2.2 }}>
                  {[
                    { name: "Analyst 01", count: 2, color: tokens.success },
                    { name: "Analyst 02", count: 1, color: tokens.accent },
                    { name: "Analyst 03", count: 1, color: tokens.warning },
                    { name: "Analyst 04", count: 1, color: tokens.violet },
                    { name: "Analyst 05", count: 1, color: tokens.danger },
                  ].map((item) => (
                    <Box
                      key={item.name}
                      sx={{
                        p: 1.6,
                        borderRadius: 2,
                        border: `1px solid ${tokens.border}`,
                        bgcolor: tokens.panelElevated,
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1.1} alignItems="center">
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              bgcolor: item.color,
                            }}
                          />
                          <Typography sx={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>
                            {item.name}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            color: "#f8fafc",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.count} items
                        </Typography>
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
                  <ShieldRoundedIcon sx={{ color: tokens.accent }} />
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      letterSpacing: "0.08em",
                      color: tokens.textSoft,
                      fontWeight: 700,
                    }}
                  >
                    COMPLIANCE NOTE
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
                  This view should ultimately be backed by persisted audit records from your
                  FastAPI service, including timestamps, verdict deltas, analyst actions,
                  and source-level evidence for each moderation decision.
                </Typography>

                <Divider sx={{ my: 2, borderColor: tokens.border }} />

                <Stack spacing={1.4}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <VerifiedRoundedIcon sx={{ color: tokens.success, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Maintain immutable event IDs for traceability.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <AccessTimeRoundedIcon sx={{ color: tokens.warning, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Store both creation and review timestamps.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <GavelRoundedIcon sx={{ color: tokens.danger, fontSize: 18 }} />
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                      Preserve escalation decisions and reviewer identity.
                    </Typography>
                  </Stack>
                </Stack>
              </GlassCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}