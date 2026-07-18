import { 
  mdiAlphaNCircle, 
  mdiReact, 
  mdiLaravel, 
  mdiTailwind, 
  mdiLightningBolt, 
  mdiLanguageTypescript, 
  mdiTriangle 
} from '@mdi/js';

const SvgIcon = ({ path, size = 24, color = "currentColor", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill={color} 
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
    {...props}
  >
    <path d={path} />
  </svg>
);

export const NextJsIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiAlphaNCircle} size={size} color={color} {...props} />
);

export const ReactIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiReact} size={size} color={color} {...props} />
);

export const LaravelIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiLaravel} size={size} color={color} {...props} />
);

export const TailwindIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiTailwind} size={size} color={color} {...props} />
);

export const ViteIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiLightningBolt} size={size} color={color} {...props} />
);

export const TypeScriptIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiLanguageTypescript} size={size} color={color} {...props} />
);

export const VercelIcon = ({ size, color, ...props }) => (
  <SvgIcon path={mdiTriangle} size={size} color={color} {...props} />
);
