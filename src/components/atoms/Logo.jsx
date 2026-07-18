import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'h6', color = 'inherit', sx = {} }) {
  return (
    <Typography
      variant={variant}
      component={Link}
      to="/"
      sx={{
        textDecoration: 'none',
        color,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        ...sx,
      }}
    >
      Dibitech
    </Typography>
  );
}
