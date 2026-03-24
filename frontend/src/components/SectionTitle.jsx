import { Box, Stack, Typography } from "@mui/material";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  rightSlot,
  sx = {},
}) {
  return (
    <Box
      sx={{
        mb: 2.5,
        px: { xs: 0.5, md: 0 },
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Stack spacing={0.8}>
          {eyebrow && (
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "#64748b",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </Typography>
          )}

          {title && (
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.4rem" },
                fontWeight: 700,
                color: "#f8fafc",
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
              }}
            >
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                maxWidth: 720,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>

        {rightSlot && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {rightSlot}
          </Box>
        )}
      </Stack>
    </Box>
  );
}