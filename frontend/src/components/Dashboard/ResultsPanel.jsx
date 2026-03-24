import { Chip, Divider, Stack, Typography } from "@mui/material";
import SectionCard from "../SectionCard";

export default function ResultsPanel({
  prediction = "Fake",
  confidence = 93,
  risk = "High",
}) {
  const color =
    prediction === "Real"
      ? "success"
      : prediction === "Fake"
      ? "error"
      : "warning";

  return (
    <SectionCard>
      <Stack spacing={2}>
        <Typography variant="h6">Latest Result</Typography>
        <Chip label={prediction} color={color} sx={{ width: "fit-content" }} />
        <Typography color="text.secondary">Confidence: {confidence}%</Typography>
        <Divider />
        <Typography color="text.secondary">Risk Level: {risk}</Typography>
      </Stack>
    </SectionCard>
  );
}