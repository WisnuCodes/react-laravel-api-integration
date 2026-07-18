import { Typography, Box } from '@mui/material';

export default function StatItem({ value, label }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
