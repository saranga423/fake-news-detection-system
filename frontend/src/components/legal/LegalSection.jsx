import { Stack, Typography } from "@mui/material";
import SectionCard from "../SectionCard";

export default function LegalSection({ title, children }) {
  return (
    <SectionCard>
      <Stack spacing={1.2}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{children}</Typography>
      </Stack>
    </SectionCard>
  );
}