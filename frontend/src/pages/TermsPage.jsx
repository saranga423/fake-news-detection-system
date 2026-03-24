import { Box, Container, Typography, Stack } from "@mui/material";
import SectionTitle from "../components/SectionTitle";

export default function TermsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", color: "#e5e7eb", py: 6 }}>
      <Container maxWidth="md">
        <SectionTitle
          eyebrow="LEGAL"
          title="Terms of Service"
          subtitle="Rules governing the use of the misinformation detection system."
        />

        <Stack spacing={3}>
          <Typography>
            This platform provides AI-generated analysis for informational purposes only.
          </Typography>

          <Typography>
            Users are responsible for verifying results before making decisions.
          </Typography>

          <Typography>
            Misuse of the system, including manipulation or abuse, is prohibited.
          </Typography>

          <Typography>
            The system may evolve and outputs may change as models improve.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}