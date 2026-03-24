import { Paper } from "@mui/material";

const variants = {
  default: {
    backgroundColor: "#0b1220",
    border: "1px solid rgba(148,163,184,0.16)",
  },
  soft: {
    backgroundColor: "#0f172a",
    border: "1px solid rgba(148,163,184,0.14)",
  },
  elevated: {
    backgroundColor: "#111827",
    border: "1px solid rgba(148,163,184,0.18)",
  },
};

export default function GlassCard({
  children,
  sx = {},
  variant = "default",
  ...props
}) {
  return (
    <Paper
      elevation={0}
      {...props}
      sx={{
        position: "relative",
        borderRadius: 3,
        boxShadow: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        backgroundImage: "none",
        overflow: "hidden",
        ...(variants[variant] || variants.default),
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}