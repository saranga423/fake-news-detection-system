import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GlassCard from "../components/GlassCard";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function UrlAnalyzerCard() {
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

  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState(null);

  const trimmedUrl = url.trim();

  const urlError =
    touched && trimmedUrl.length > 0
      ? (() => {
          try {
            const parsed = new URL(trimmedUrl);
            if (!["http:", "https:"].includes(parsed.protocol)) {
              return "Only HTTP and HTTPS URLs are supported.";
            }
            return "";
          } catch {
            return "Enter a valid URL including https://";
          }
        })()
      : "";

  const canCheck = trimmedUrl.length > 0 && !urlError && !isChecking;

  const analyzeUrl = () => {
    setTouched(true);
    if (!canCheck) return;

    setIsChecking(true);

    setTimeout(() => {
      const domain = getDomain(trimmedUrl).toLowerCase();

      const suspiciousPatterns = [
        "breaking-news",
        "viral",
        "truth-now",
        "real-story",
        "alert-news",
        "dailybuzz",
      ];

      const trustedDomains = [
        "bbc.com",
        "reuters.com",
        "apnews.com",
        "nytimes.com",
        "theguardian.com",
      ];

      const isTrusted = trustedDomains.some((item) => domain.includes(item));
      const looksSuspicious = suspiciousPatterns.some((item) =>
        domain.includes(item)
      );

      let status = "Review";
      let risk = 48;
      let score = 55;

      if (isTrusted) {
        status = "Trusted";
        risk = 14;
        score = 88;
      } else if (looksSuspicious) {
        status = "High Risk";
        risk = 82;
        score = 26;
      }

      setResult({
        domain,
        status,
        risk,
        credibility: score,
        protocol: trimmedUrl.startsWith("https://") ? "HTTPS" : "HTTP",
      });

      setIsChecking(false);
    }, 850);
  };

  const statusConfig = useMemo(() => {
    if (!result) return null;

    if (result.status === "Trusted") {
      return {
        color: tokens.success,
        soft: tokens.successSoft,
        icon: <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />,
      };
    }

    if (result.status === "High Risk") {
      return {
        color: tokens.danger,
        soft: tokens.dangerSoft,
        icon: <WarningAmberRoundedIcon sx={{ fontSize: 18 }} />,
      };
    }

    return {
      color: tokens.warning,
      soft: tokens.warningSoft,
      icon: <ShieldRoundedIcon sx={{ fontSize: 18 }} />,
    };
  }, [result, tokens]);

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#020617",
      color: tokens.text,
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
      color: tokens.textMuted,
      opacity: 1,
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginTop: 1,
      color: tokens.textMuted,
      fontSize: "0.78rem",
    },
  };

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
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <LinkRoundedIcon sx={{ color: tokens.accent, fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              color: tokens.textSoft,
              fontWeight: 700,
            }}
          >
            URL REPUTATION ANALYZER
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: "0.76rem",
            color: tokens.textMuted,
          }}
        >
          DOMAIN / PROTOCOL / RISK SCREEN
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack spacing={2.2}>
          <Box>
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: "1rem",
                mb: 0.7,
              }}
            >
              Check source URL trust posture
            </Typography>

            <Typography
              sx={{
                color: tokens.textSoft,
                lineHeight: 1.75,
                fontSize: "0.94rem",
                mb: 1.5,
              }}
            >
              Evaluate the submitted domain for basic trust cues, protocol
              integrity, and suspicious naming patterns.
            </Typography>

            <TextField
              fullWidth
              placeholder="https://example.com/article/breaking-update"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => setTouched(true)}
              error={Boolean(urlError)}
              helperText={
                urlError ||
                `${trimmedUrl.length} chars · include full URL with protocol`
              }
              sx={inputSx}
            />
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  color: tokens.textMuted,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Check State
              </Typography>

              <Typography sx={{ color: tokens.textSoft, fontSize: "0.92rem" }}>
                {trimmedUrl
                  ? canCheck
                    ? "Ready for URL screening"
                    : isChecking
                    ? "Running reputation pass"
                    : "Validation required"
                  : "Awaiting URL payload"}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              disableElevation
              onClick={analyzeUrl}
              disabled={!canCheck}
              startIcon={
                isChecking ? (
                  <CircularProgress size={16} sx={{ color: "#0f172a" }} />
                ) : (
                  <TravelExploreRoundedIcon />
                )
              }
              sx={{
                minWidth: 200,
                height: 44,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                bgcolor: "#e2e8f0",
                color: "#0f172a",
                "&:hover": {
                  bgcolor: "#cbd5e1",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(148,163,184,0.16)",
                  color: "rgba(226,232,240,0.40)",
                },
              }}
            >
              {isChecking ? "Checking..." : "Analyze URL"}
            </Button>
          </Stack>

          {(urlError || (!trimmedUrl && touched)) && (
            <Alert
              severity={urlError ? "error" : "info"}
              variant="outlined"
              sx={{
                borderRadius: 2,
                bgcolor: urlError
                  ? "rgba(239,68,68,0.08)"
                  : "rgba(56,189,248,0.08)",
                borderColor: urlError
                  ? "rgba(239,68,68,0.22)"
                  : "rgba(56,189,248,0.18)",
                color: urlError ? "#fecaca" : "#bae6fd",
                "& .MuiAlert-icon": {
                  color: urlError ? tokens.danger : tokens.accent,
                },
              }}
            >
              {urlError
                ? "URL validation failed. Submit a well-formed HTTP or HTTPS link."
                : "Paste a URL to perform a basic domain reputation check."}
            </Alert>
          )}

          {result && statusConfig && (
            <>
              <Divider sx={{ borderColor: tokens.border }} />

              <Box
                sx={{
                  p: 2.2,
                  borderRadius: 2,
                  border: `1px solid ${tokens.border}`,
                  bgcolor: tokens.panelSoft,
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  mb={2}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: statusConfig.soft,
                        color: statusConfig.color,
                        border: `1px solid ${tokens.border}`,
                      }}
                    >
                      {statusConfig.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: "#f8fafc",
                          fontWeight: 700,
                          fontSize: "1rem",
                        }}
                      >
                        {result.status}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: "0.75rem",
                          color: tokens.textMuted,
                          mt: 0.3,
                        }}
                      >
                        DOMAIN: {result.domain || "UNKNOWN"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    size="small"
                    label={`${result.protocol} / SCORE ${result.credibility}%`}
                    sx={{
                      fontFamily: monoFont,
                      bgcolor: statusConfig.soft,
                      color: statusConfig.color,
                      border: `1px solid ${statusConfig.color}33`,
                      "& .MuiChip-label": {
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      },
                    }}
                  />
                </Stack>

                <Stack spacing={2}>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.8}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <ShieldRoundedIcon
                          sx={{ fontSize: 17, color: statusConfig.color }}
                        />
                        <Typography
                          sx={{
                            color: tokens.textSoft,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                          }}
                        >
                          Risk Index
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: "0.8rem",
                          color: "#f8fafc",
                          fontWeight: 700,
                        }}
                      >
                        {result.risk}%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={result.risk}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.06)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: statusConfig.color,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.8}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LanguageRoundedIcon
                          sx={{ fontSize: 17, color: tokens.accent }}
                        />
                        <Typography
                          sx={{
                            color: tokens.textSoft,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                          }}
                        >
                          Credibility Score
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: "0.8rem",
                          color: "#f8fafc",
                          fontWeight: 700,
                        }}
                      >
                        {result.credibility}%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={result.credibility}
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.06)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: tokens.accent,
                        },
                      }}
                    />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  sx={{ mt: 2 }}
                >
                  <Chip
                    size="small"
                    icon={<PublicRoundedIcon sx={{ fontSize: 16 }} />}
                    label={result.domain || "unknown-domain"}
                    sx={{
                      bgcolor: tokens.panelElevated,
                      color: tokens.textSoft,
                      border: `1px solid ${tokens.border}`,
                    }}
                  />
                  <Chip
                    size="small"
                    label={`Protocol: ${result.protocol}`}
                    sx={{
                      bgcolor: tokens.panelElevated,
                      color: tokens.textSoft,
                      border: `1px solid ${tokens.border}`,
                    }}
                  />
                  <Chip
                    size="small"
                    label={`Status: ${result.status}`}
                    sx={{
                      bgcolor: statusConfig.soft,
                      color: statusConfig.color,
                      border: `1px solid ${statusConfig.color}33`,
                    }}
                  />
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </GlassCard>
  );
}