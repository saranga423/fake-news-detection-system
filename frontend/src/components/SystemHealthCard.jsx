import { LinearProgress, Stack, Typography } from "@mui/material";
import SectionCard from "./SectionCard";

export default function SystemHealthCard({ health = 91 }) {
  return (
    <SectionCard>
      <Stack spacing={2}>
        <Typography variant="h6">System Health</Typography>
        <Typography variant="h3" fontWeight={800}>
          {health}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={health}
          sx={{ height: 10, borderRadius: 999 }}
        />
        <Typography color="text.secondary">
          Based on service responsiveness, model stability, and prediction
          confidence consistency.
        </Typography>
      </Stack>
    </SectionCard>
  );
}