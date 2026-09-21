type P = { className?: string };

export const ArrowRight = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GitHub = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const LinkedIn = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M13.63 13.63h-2.37V9.92c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95v3.78H6.24V6h2.27v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.4 0 2.85 1.58 2.85 3.63v4.19zM3.56 4.96a1.37 1.37 0 110-2.75 1.37 1.37 0 010 2.75zm1.19 8.67H2.37V6h2.38v7.63zM14.81 0H1.18C.53 0 0 .52 0 1.15v13.7C0 15.48.53 16 1.18 16h13.63c.65 0 1.19-.52 1.19-1.15V1.15C16 .52 15.46 0 14.81 0z" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 4.5L8 8.75l5.5-4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Copy = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5.25" y="5.25" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.75 5.25V3.75a1.5 1.5 0 00-1.5-1.5h-5.5a1.5 1.5 0 00-1.5 1.5v5.5a1.5 1.5 0 001.5 1.5h1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 6h12M3 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
