import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await signup(form);
      setSuccess("Account created successfully. You can sign in now.");
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail || "Registration failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#020617",
      color: "#e5e7eb",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "rgba(148,163,184,0.16)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(148,163,184,0.24)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38bdf8",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#94a3b8",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <GlassCard sx={{ p: 4 }}>
          <Stack component="form" spacing={3} onSubmit={handleSubmit}>
            <Box>
              <Typography
                sx={{
                  color: "#f8fafc",
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  mb: 0.8,
                }}
              >
                Create Account
              </Typography>
              <Typography sx={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                Register for access to the moderation workstation.
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{
                  bgcolor: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.22)",
                  color: "#fecaca",
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                variant="outlined"
                sx={{
                  bgcolor: "rgba(34,197,94,0.08)",
                  borderColor: "rgba(34,197,94,0.22)",
                  color: "#bbf7d0",
                }}
              >
                {success}
              </Alert>
            )}

            <TextField
              label="Full Name"
              fullWidth
              value={form.full_name}
              onChange={handleChange("full_name")}
              sx={inputSx}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange("email")}
              sx={inputSx}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange("password")}
              sx={inputSx}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                bgcolor: "#e2e8f0",
                color: "#0f172a",
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { bgcolor: "#cbd5e1" },
              }}
            >
              {isSubmitting ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} sx={{ color: "#0f172a" }} />
                  <span>Registering...</span>
                </Stack>
              ) : (
                "Register"
              )}
            </Button>

            <Typography
              sx={{ color: "#64748b", fontSize: "0.85rem", cursor: "pointer" }}
              onClick={() => navigate("/signin")}
            >
              Already have an account →
            </Typography>
          </Stack>
        </GlassCard>
      </Container>
    </Box>
  );
}