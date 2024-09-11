import { cn } from '@/lib/utils';

type DecorationProps = {
  className: string;
  color?: 'green' | 'yellow' | 'red';
};

const colorMap = {
  green: '#00832D',
  yellow: '#F5C451',
  red: '#FF4538',
};

export default function Decoration({
  className,
  color = 'green',
}: DecorationProps) {
  return (
    <svg
      className={cn('absolute z-[-1]', className)}
      width="200"
      height="200"
      viewBox="0 0 185 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.25" filter="url(#filter0_f_1271_629)">
        <ellipse
          cx="57.3038"
          cy="57.4275"
          rx="57.3038"
          ry="57.4275"
          transform="matrix(1 0 0 -1 35 149.7)"
          fill={colorMap[color]}
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter0_f_1271_629"
          x="0.297958"
          y="0.142685"
          width="184.012"
          height="184.26"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="17.351"
            result="effect1_foregroundBlur_1271_629"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
}
