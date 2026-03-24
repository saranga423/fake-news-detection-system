import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

export default function NewsInputCard({ onAnalyze, isLoading = false }) {
  const [headline, setHeadline] = useState("");
  const [text, setText] = useState("");
  const [touched, setTouched] = useState({
    headline: false,
    text: false,
  });

  const tokens = useMemo(
    () => ({
      bg: "#0b1220",
      inputBg: "#020617",
      border: "rgba(148,163,184,0.16)",
      borderStrong: "rgba(148,163,184,0.26)",
      text: "#e5e7eb",
      textSoft: "#94a3b8",
      textMuted: "#64748b",
      accent: "#38bdf8",
      accentSoft: "rgba(56,189,248,0.10)",
      danger: "#f87171",
      dangerSoft: "rgba(248,113,113,0.08)",
      success: "#22c55e",
      warning: "#f59e0b",
    }),
    []
  );

  const normalizedHeadline = headline.trim();
  const normalizedText = text.trim();

  const headlineError =
    touched.headline && normalizedHeadline.length > 0 && normalizedHeadline.length < 12
      ? "Headline should be at least 12 characters."
      : "";

  const textError =
    touched.text && normalizedText.length > 0 && normalizedText.length < 40
      ? "Article content should be at least 40 characters."
      : "";

  const hasEmptyRequired = normalizedHeadline.length === 0 || normalizedText.length === 0;
  const hasValidationError = Boolean(headlineError || textError);
  const canAnalyze = !isLoading && !hasEmptyRequired && !hasValidationError;

  const signalSummary = useMemo(() => {
    const totalLength = normalizedHeadline.length + normalizedText.length;

    if (!normalizedHeadline && !normalizedText) {
      return "Awaiting input payload";
    }
    if (totalLength < 80) {
      return "Low context payload";
    }
    if (totalLength < 220) {
      return "Moderate context payload";
    }
    return "High context payload";
  }, [normalizedHeadline, normalizedText]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      headline: true,
      text: true,
    });

    if (!canAnalyze) return;

    onAnalyze?.({
      headline: normalizedHeadline,
      text: normalizedText,
    });
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: tokens.inputBg,
      color: tokens.text,
      borderRadius: 2,
      fontSize: "0.98rem",
      alignItems: "flex-start",
      transition: "border-color 0.2s ease, background-color 0.2s ease",
      "& fieldset": {
        borderColor: tokens.border,
      },
      "&:hover fieldset": {
        borderColor: tokens.borderStrong,
      },
      "&.Mui-focused fieldset": {
        borderColor: tokens.accent,
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      color: tokens.text,
    },
    "& .MuiInputBase-input::placeholder": {
      color: tokens.textMuted,
      opacity: 1,
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginTop: 1,
      fontSize: "0.78rem",
      color: tokens.textMuted,
    },
  };

  const FieldHeader = ({ icon, title, hint }) => (
    <Stack spacing={0.7} sx={{ mb: 1.1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            display: "grid",
            placeItems: "center",
            bgcolor: tokens.accentSoft,
            color: tokens.accent,
            border: `1px solid ${tokens.border}`,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            color: "#f8fafc",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: "0.76rem",
          color: tokens.textMuted,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          pl: 0.2,
        }}
      >
        {hint}
      </Typography>
    </Stack>
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.25,
      }}
    >
      <Box>
        <FieldHeader
          icon={<NewspaperRoundedIcon sx={{ fontSize: 18 }} />}
          title="Headline"
          hint="Primary claim or article heading"
        />

        <TextField
          fullWidth
          placeholder="Enter headline for linguistic and credibility analysis..."
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, headline: true }))}
          error={Boolean(headlineError)}
          helperText={
            headlineError || `${normalizedHeadline.length} chars · short, clear, and specific input preferred`
          }
          sx={inputSx}
        />
      </Box>

      <Box>
        <FieldHeader
          icon={<ArticleRoundedIcon sx={{ fontSize: 18 }} />}
          title="Article Body"
          hint="Context block for pattern and risk extraction"
        />

        <TextField
          fullWidth
          multiline
          minRows={8}
          maxRows={16}
          placeholder="Paste article content, social post text, or summary for deeper analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, text: true }))}
          error={Boolean(textError)}
          helperText={
            textError ||
            `${normalizedText.length} chars · more context improves confidence and explainability`
          }
          sx={inputSx}
        />
      </Box>

      <Divider sx={{ borderColor: tokens.border }} />

      <Box
        sx={{
          border: `1px solid ${tokens.border}`,
          bgcolor: "rgba(255,255,255,0.01)",
          borderRadius: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack spacing={0.7}>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.76rem",
                color: tokens.textMuted,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Input Status
            </Typography>

            <Typography
              sx={{
                color: tokens.textSoft,
                fontSize: "0.92rem",
              }}
            >
              {signalSummary}
            </Typography>

            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.75rem",
                color: canAnalyze ? tokens.success : tokens.warning,
              }}
            >
              {canAnalyze
                ? "READY / ANALYSIS EXECUTION AVAILABLE"
                : "PENDING / COMPLETE REQUIRED INPUTS"}
            </Typography>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={!canAnalyze}
            startIcon={
              isLoading ? (
                <CircularProgress size={16} sx={{ color: "#0f172a" }} />
              ) : (
                <PlayArrowRoundedIcon />
              )
            }
            endIcon={!isLoading ? <AutoAwesomeRoundedIcon /> : null}
            sx={{
              alignSelf: { xs: "stretch", md: "center" },
              minWidth: 210,
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
            {isLoading ? "Analyzing..." : "Run Analysis"}
          </Button>
        </Stack>
      </Box>

      {(headlineError || textError || hasEmptyRequired) && (
        <Alert
          severity={hasValidationError ? "error" : "info"}
          variant="outlined"
          sx={{
            borderRadius: 2,
            bgcolor: hasValidationError ? tokens.dangerSoft : "rgba(56,189,248,0.08)",
            borderColor: hasValidationError
              ? "rgba(248,113,113,0.22)"
              : "rgba(56,189,248,0.18)",
            color: hasValidationError ? "#fecaca" : "#bae6fd",
            "& .MuiAlert-icon": {
              color: hasValidationError ? tokens.danger : tokens.accent,
            },
          }}
        >
          {hasValidationError
            ? "Input validation failed. Expand the content and correct the highlighted fields before running analysis."
            : "Provide both a headline and article body to initialize the inference pipeline."}
        </Alert>
      )}
    </Box>
  );
}