import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import SectionCard from "../SectionCard";

export default function AnalysisForm({ onSubmit }) {
  const [text, setText] = useState("");

  return (
    <SectionCard>
      <Stack spacing={2}>
        <TextField
          label="Paste article text"
          multiline
          minRows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={() => onSubmit?.(text)}>
          Analyze
        </Button>
      </Stack>
    </SectionCard>
  );
}