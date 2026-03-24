import { Box, Container, Stack, Typography } from "@mui/material";

export default function LegalPageShell({ title, subtitle, children }) {
  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">{title}</Typography>
            {subtitle ? (
              <Typography color="text.secondary" mt={1}>
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          {children}
        </Stack>
      </Container>
    </Box>
  );
}