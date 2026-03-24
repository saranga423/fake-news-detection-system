import { Card, CardContent } from "@mui/material";

export default function SectionCard({ children, sx = {}, contentSx = {}, ...props }) {
  return (
    <Card sx={{ borderRadius: 4, ...sx }} {...props}>
      <CardContent sx={{ p: 3, ...contentSx }}>{children}</CardContent>
    </Card>
  );
}