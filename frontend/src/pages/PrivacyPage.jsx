import { Box, Container, Typography, Stack } from "@mui/material";
import SectionTitle from "../components/SectionTitle";

export default function PrivacyPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", color: "#e5e7eb", py: 6 }}>
      <Container maxWidth="md">
        <SectionTitle
          eyebrow="DATA POLICY"
          title="Privacy Policy"
          subtitle="How user data is handled within the analysis system."
        />

        <Stack spacing={3}>
          <Typography>
            Submitted content may be processed for analysis and improvement of the system.
          </Typography>

          <Typography>
            We do not sell user data to third parties.
          </Typography>

          <Typography>
            Minimal metadata may be stored for system monitoring and performance tracking.
          </Typography>

          <Typography>
            Users should avoid submitting sensitive or confidential information.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}