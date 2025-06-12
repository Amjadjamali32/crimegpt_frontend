export const FileIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-10 h-10 text-yellow-400 mx-auto"
    strokeWidth={1}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
  </svg>
);

export const PendingIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 50 50"
    stroke="currentColor"
    className="w-10 h-10 text-white mx-auto"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M25,1c-2.872,0-5.68,0.502-8.348,1.492l0.696,1.875C19.792,3.46,22.367,3,25,3c12.131,0,22,9.869,22,22s-9.869,22-22,22
       S3,37.131,3,25c0-6.595,2.963-12.795,8-16.958V15h2V5H3v2h6.126C3.993,11.53,1,18.068,1,25c0,13.233,10.767,24,24,24
       s24-10.767,24-24S38.233,1,25,1z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19,33h-2v2h16v-2h-2v-3.414L26.414,25L31,20.414V17h2v-2H17v2h2v3.414L23.586,25L19,29.586V33z 
       M21,19.586V17h8v2.586l-4,4L21,19.586z 
       M25,26.414l4,4V33h-8v-2.586L25,26.414z"
    />
    <rect x="19" y="39" width="2" height="2" />
    <rect x="24" y="39" width="2" height="2" />
    <rect x="29" y="39" width="2" height="2" />
  </svg>
);

export const SolvedIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 100 100"
    stroke="currentColor"
    className="w-10 h-10 text-green-500 mx-auto"
    strokeWidth={2}
  >
    <path
      d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z 
       M44.401,65.572L29.564,50.735l5.109-5.109l9.728,9.728l20.926-20.926l5.109,5.109L44.401,65.572z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InvestigationIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="currentColor"
    stroke="none"
    className="w-10 h-10 text-blue-500 mx-auto"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M41.16,42.57l1.41-1.41L39.11,37.7A19.94234,19.94234,0,0,0,10.22,10.22C-2.34022,22.71509,6.80512,44.37038,24.32028,44.24985A19.87773,19.87773,0,0,0,37.7,39.11ZM9.97,21.08c7.45687-8.06881,21.23731-8.06678,28.7.00023a4.6361,4.6361,0,0,1,0,6.47981,19.95171,19.95171,0,0,1-28.7,0A4.6365,4.6365,0,0,1,9.97,21.08Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M59.04,51.81,48.31,41.08a2.00387,2.00387,0,0,0-2.83,0l-4.4,4.4a2.00377,2.00377,0,0,0,0,2.83L51.81,59.04a4.892,4.892,0,0,0,3.46,1.43C59.54205,60.48423,62.28574,54.95784,59.04,51.81Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M37.23,26.17a2.63781,2.63781,0,0,0,0-3.7,17.947,17.947,0,0,0-25.82,0,2.63792,2.63792,0,0,0,0,3.7C18.10827,33.43094,30.5263,33.43149,37.23,26.17ZM18.31,24.32c.28765-7.95319,11.73357-7.95114,12.02.0001C30.04239,32.27311,18.59642,32.27107,18.31,24.32Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M28.33,24.32a4.01017,4.01017,0,0,0-8.02.00009A4.01017,4.01017,0,0,0,28.33,24.32Z"
    />
  </svg>
);

export const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    className="w-10 h-10 text-purple-500 mx-auto"
    strokeWidth={2}
  >
    <circle cx="16" cy="16" r="14" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="13" r="5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5.4,25.1c1.8-4.1,5.8-7,10.6-7c4.8,0,8.9,2.9,10.6,7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FeedbackIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="currentColor"
    className="w-10 h-10 text-pink-500 mx-auto"
  >
    <g>
      <path d="M38.01 23.68H14.23c-.8 0-1.45-.65-1.45-1.45s.65-1.45 1.45-1.45h23.78c.8 0 1.45.65 1.45 1.45s-.65 1.45-1.45 1.45z" />
      <path d="M32.07 35.35H14.23c-.8 0-1.45.65-1.45 1.45s.65 1.45 1.45 1.45h16.6v-2.9z" />
      <path d="M35.1 28.19H14.23c-.8 0-1.45.65-1.45 1.45s.65 1.45 1.45 1.45h19.64v-2.9z" />
      <rect
        x="36.47"
        y="20.72"
        width="22.08"
        height="5.51"
        transform="rotate(-45 47.51 23.48)"
      />
      <polygon points="40.47 34.02 34.05 36.74 36.77 30.33" />
      <path d="M59.21 14l-2.22-2.22a1.18 1.18 0 0 0-1.67 0l-.95.95 3.9 3.9.95-.95a1.18 1.18 0 0 0 0-1.68z" />
    </g>
    <path
      d="M44.34 41.14c0 .95-.77 1.71-1.71 1.71H25.43L7.9 50.1V18.68a2.51 2.51 0 0 1 2.5-2.5h31.43a2.51 2.51 0 0 1 2.5 2.5v.71l2.9-2.9v-3.25A2.97 2.97 0 0 0 44.4 10.27H7.97A2.97 2.97 0 0 0 5 13.23v39.05c0 .49.24.94.65 1.21.24.16.52.24.8.24.19 0 .38-.04.56-.11l18.71-7.87h16.91a4.62 4.62 0 0 0 4.62-4.62v-10.14l-2.9 2.9v6.14z"
    />
  </svg>
);

export const NotificationIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    className="w-10 h-10 text-red-500 mx-auto"
    strokeWidth={2}
  >
    <path
      d="M27.8 23.2l-1.1-1.7c-1.9-2.8-2.9-6.1-2.9-9.5 0-3.6-2.4-6.5-5.6-7.5C17.9 3.6 17 3 16 3s-1.9.6-2.2 1.5c-3.2 1-5.6 3.9-5.6 7.5 0 3.4-1 6.7-2.9 9.5l-1.1 1.7c-.5.8 0 1.8 1 1.8h21.6c1 0 1.5-1 .9-1.8z"
    />
    <path d="M20 25a4 4 0 1 1-8 0" />
  </svg>
);

export const EvidenceIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 460 512"
    fill="currentColor"
    className="w-10 h-10 text-orange-500 mx-auto"
  >
    <path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z" />
  </svg>
);