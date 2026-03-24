import { useMemo, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ModelTrainingRoundedIcon from "@mui/icons-material/ModelTrainingRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PolicyRoundedIcon from "@mui/icons-material/PolicyRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const monoFont =
  '"JetBrains Mono","Fira Code","SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace';

const primaryLinks = [
  { label: "Dashboard", to: "/dashboard", icon: <DashboardRoundedIcon sx={{ fontSize: 18 }} /> },
  { label: "Model", to: "/model", icon: <ModelTrainingRoundedIcon sx={{ fontSize: 18 }} /> },
  { label: "Insights", to: "/insights", icon: <InsightsRoundedIcon sx={{ fontSize: 18 }} /> },
  { label: "History", to: "/history", icon: <HistoryRoundedIcon sx={{ fontSize: 18 }} /> },
];

const secondaryLinks = [
  { label: "Privacy", to: "/privacy", icon: <PolicyRoundedIcon sx={{ fontSize: 18 }} /> },
  { label: "Terms", to: "/terms", icon: <ShieldRoundedIcon sx={{ fontSize: 18 }} /> },
];

function NavItem({ to, label, icon, compact = false, onClick }) {
  return (
    <Button
      component={NavLink}
      to={to}
      onClick={onClick}
      variant="text"
      startIcon={icon}
      sx={{
        justifyContent: "flex-start",
        minWidth: compact ? "100%" : "auto",
        px: compact ? 1.2 : 1.4,
        py: compact ? 1 : 0.9,
        borderRadius: 2,
        textTransform: "none",
        color: "#94a3b8",
        fontWeight: 600,
        fontSize: "0.92rem",
        border: "1px solid transparent",
        "&:hover": {
          color: "#e2e8f0",
          bgcolor: "rgba(255,255,255,0.03)",
          borderColor: "rgba(148,163,184,0.14)",
        },
        "&.active": {
          color: "#f8fafc",
          bgcolor: "rgba(56,189,248,0.10)",
          borderColor: "rgba(56,189,248,0.22)",
        },
        "& .MuiButton-startIcon": {
          marginRight: 0.9,
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tokens = useMemo(
    () => ({
      bg: "rgba(2,6,23,0.82)",
      panel: "#0b1220",
      panelSoft: "#0f172a",
      border: "rgba(148,163,184,0.16)",
      borderStrong: "rgba(148,163,184,0.24)",
      text: "#e5e7eb",
      textSoft: "#94a3b8",
      textMuted: "#64748b",
      accent: "#38bdf8",
      accentSoft: "rgba(56,189,248,0.10)",
      success: "#22c55e",
    }),
    []
  );

  const pageLabel = useMemo(() => {
    const routeMap = {
      "/": "Home",
      "/dashboard": "Dashboard",
      "/model": "Model Registry",
      "/insights": "Insights",
      "/history": "History",
      "/privacy": "Privacy Policy",
      "/terms": "Terms of Service",
      "/signin": "Sign In",
      "/signup": "Create Account",
    };

    return routeMap[location.pathname] || "Workspace";
  }, [location.pathname]);

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#020617",
        color: tokens.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: tokens.accentSoft,
              color: tokens.accent,
              border: `1px solid ${tokens.borderStrong}`,
            }}
          >
            <RadarRoundedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Veritas AI
            </Typography>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: tokens.textMuted,
                letterSpacing: "0.08em",
              }}
            >
              MISINFORMATION WORKSTATION
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ px: 1.5, py: 1.5 }}>
        <Typography
          sx={{
            px: 1,
            mb: 1,
            fontFamily: monoFont,
            fontSize: "0.72rem",
            color: tokens.textMuted,
            letterSpacing: "0.08em",
          }}
        >
          PRIMARY NAVIGATION
        </Typography>

        <Stack spacing={0.8}>
          {primaryLinks.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              compact
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: tokens.border }} />

      <Box sx={{ px: 1.5, py: 1.5 }}>
        <Typography
          sx={{
            px: 1,
            mb: 1,
            fontFamily: monoFont,
            fontSize: "0.72rem",
            color: tokens.textMuted,
            letterSpacing: "0.08em",
          }}
        >
          GOVERNANCE
        </Typography>

        <Stack spacing={0.8}>
          {secondaryLinks.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              compact
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: "auto", p: 1.5 }}>
        <Stack spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LoginRoundedIcon />}
            onClick={() => {
              setMobileOpen(false);
              navigate("/signin");
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: tokens.borderStrong,
              color: tokens.text,
              "&:hover": {
                borderColor: "rgba(226,232,240,0.35)",
                bgcolor: "rgba(255,255,255,0.02)",
              },
            }}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            startIcon={<PersonAddAltRoundedIcon />}
            onClick={() => {
              setMobileOpen(false);
              navigate("/signup");
            }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#e2e8f0",
              color: "#0f172a",
              "&:hover": {
                bgcolor: "#cbd5e1",
              },
            }}
          >
            Create Account
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: tokens.bg,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${tokens.border}`,
          backgroundImage: "none",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={1.6}
              alignItems="center"
              sx={{ minWidth: 0 }}
            >
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  display: { xs: "inline-flex", lg: "none" },
                  color: tokens.textSoft,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 2,
                }}
              >
                <MenuRoundedIcon />
              </IconButton>

              <Box
                onClick={() => navigate("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  cursor: "pointer",
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: tokens.accentSoft,
                    color: tokens.accent,
                    border: `1px solid ${tokens.borderStrong}`,
                    flexShrink: 0,
                  }}
                >
                  <RadarRoundedIcon sx={{ fontSize: 21 }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: "#f8fafc",
                      fontWeight: 800,
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Veritas AI
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ minWidth: 0 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: monoFont,
                        fontSize: "0.7rem",
                        color: tokens.textMuted,
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      MISINFORMATION WORKSTATION
                    </Typography>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderColor: tokens.border,
                        display: { xs: "none", md: "block" },
                      }}
                    />

                    <Typography
                      sx={{
                        fontFamily: monoFont,
                        fontSize: "0.7rem",
                        color: tokens.textSoft,
                        letterSpacing: "0.08em",
                        display: { xs: "none", md: "block" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      PAGE / {pageLabel.toUpperCase()}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={0.7}
              alignItems="center"
              sx={{ display: { xs: "none", lg: "flex" }, flex: 1, ml: 3 }}
            >
              {primaryLinks.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                label="SYSTEM ONLINE"
                icon={
                  <Badge
                    variant="dot"
                    overlap="circular"
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: tokens.success,
                        boxShadow: `0 0 0 2px ${tokens.bg}`,
                      },
                    }}
                  >
                    <Box sx={{ width: 8, height: 8 }} />
                  </Badge>
                }
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  fontFamily: monoFont,
                  bgcolor: "rgba(34,197,94,0.10)",
                  color: tokens.success,
                  border: `1px solid rgba(34,197,94,0.18)`,
                  height: 30,
                  "& .MuiChip-label": {
                    px: 1.2,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<LoginRoundedIcon />}
                onClick={() => navigate("/signin")}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: tokens.borderStrong,
                  color: tokens.text,
                  "&:hover": {
                    borderColor: "rgba(226,232,240,0.35)",
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                disableElevation
                startIcon={<PersonAddAltRoundedIcon />}
                onClick={() => navigate("/signup")}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#e2e8f0",
                  color: "#0f172a",
                  "&:hover": {
                    bgcolor: "#cbd5e1",
                  },
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: "#020617",
            backgroundImage: "none",
            borderRight: `1px solid ${tokens.border}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}