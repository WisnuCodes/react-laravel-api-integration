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
          <linearGradient id="pinkOrange" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF1B6B" />
            <stop offset="100%" stopColor="#FF930F" />
          </linearGradient>
          <linearGradient id="blueCyan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A00E0" />
            <stop offset="100%" stopColor="#00E1D9" />
          </linearGradient>
        </defs>
        <path d="M9 9 L17 3 L17 13 L13 16 L13 22 L9 25 Z" fill="url(#pinkOrange)" />
        <path d="M19 7 L23 4 L23 22 L15 28 L15 16 L19 13 Z" fill="url(#blueCyan)" />
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
