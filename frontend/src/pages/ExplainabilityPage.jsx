import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SectionCard from "../components/SectionCard";

const words = [
  "shocking",
  "guaranteed",
  "unverified",
  "viral claim",
  "secret source",
];

export default function ExplainabilityPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4">Explainability</Typography>
            <Typography color="text.secondary" mt={1}>
              Transparent reasoning behind fake news prediction outputs.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <SectionCard>
                <Stack spacing={2}>
                  <Typography variant="h6">How the Model Reasons</Typography>
                  <Typography color="text.secondary">
                    The prediction pipeline evaluates suspicious word choice,
                    unsupported certainty, exaggerated tone, semantic patterns,
                    and structural cues from article text.
                  </Typography>

                  <Divider />

                  <Typography fontWeight={700}>Influential Terms</Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {words.map((word) => (
                      <Chip key={word} label={word} variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={5}>
              <SectionCard>
                <Stack spacing={2}>
                  <Typography variant="h6">Confidence Meaning</Typography>
                  <Typography color="text.secondary">
                    Confidence reflects how strongly the model associates the
                    content with known misinformation patterns from training
                    data. It is a risk estimate, not a final human verdict.
                  </Typography>
                </Stack>
              </SectionCard>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}