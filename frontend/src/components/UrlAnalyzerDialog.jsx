import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function UrlAnalyzerDialog({ open, onClose, onAnalyze }) {
  const [url, setUrl] = useState("");

  const handleAnalyze = () => {
    onAnalyze?.(url);
    onClose?.();
    setUrl("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Analyze Article URL</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1 }}>
          <TextField
            label="Article URL"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAnalyze}>
          Analyze
        </Button>
      </DialogActions>
    </Dialog>
  );
}