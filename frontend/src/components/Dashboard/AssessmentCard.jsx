import { Chip, Stack, Typography } from "@mui/material";
import SectionCard from "../SectionCard";

export default function AssessmentCard({
  title,
  value,
  description,
  chip = "Live",
  chipColor = "success",
}) {
  return (
    <SectionCard>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <Chip label={chip} color={chipColor} size="small" />
        </Stack>
        <Typography variant="h4" fontWeight={800}>
          {value}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
    </SectionCard>
  );
}