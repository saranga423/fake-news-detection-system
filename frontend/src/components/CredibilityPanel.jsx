import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import SectionCard from "./SectionCard";

export default function CredibilityPanel({
  credibility = 84,
  risk = "Moderate",
  summary = "The article shows mixed credibility signals with uncertain sourcing.",
}) {
  return (
    <SectionCard>
      <Stack spacing={2}>
        <Typography variant="h6">Credibility Panel</Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="text.secondary">Credibility Score</Typography>
          <Chip label={`${credibility}%`} color="primary" />
        </Stack>

        <LinearProgress
          variant="determinate"
          value={credibility}
          sx={{ height: 10, borderRadius: 999 }}
        />

        <Box>
          <Typography fontWeight={700}>Risk Level</Typography>
          <Typography color="text.secondary">{risk}</Typography>
        </Box>

        <Box>
          <Typography fontWeight={700}>Summary</Typography>
          <Typography color="text.secondary">{summary}</Typography>
        </Box>
      </Stack>
    </SectionCard>
  );
}