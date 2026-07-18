import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'h6', color = 'inherit', sx = {} }) {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
        textDecoration: 'none',
        color,
        ...sx,
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M12 2H26L18 12H28L12 30L16 18H6L12 2Z" fill="url(#gradLogo)" />
      </svg>
      <Typography
        variant={variant}
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.03em',
          fontSize: '1.4rem'
        }}
      >
        Dibitech
      </Typography>
    </Box>
  );
}
