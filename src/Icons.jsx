import React from 'react';

export const PremiereProIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#00005C"/>
    <rect x="5" y="5" width="90" height="90" rx="15" fill="#00005C" stroke="#EA77FF" strokeWidth="4"/>
    <text x="50" y="65" fontFamily="Arial, sans-serif" fontSize="45" fontWeight="bold" fill="#EA77FF" textAnchor="middle">Pr</text>
  </svg>
);

export const AfterEffectsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#00005C"/>
    <rect x="5" y="5" width="90" height="90" rx="15" fill="#00005C" stroke="#9999FF" strokeWidth="4"/>
    <text x="50" y="65" fontFamily="Arial, sans-serif" fontSize="45" fontWeight="bold" fill="#9999FF" textAnchor="middle">Ae</text>
  </svg>
);

export const FinalCutProIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="url(#gradFCP)"/>
    <path d="M30 40 L45 25 L55 35 L40 50 Z" fill="#FF5E5E"/>
    <path d="M60 70 L75 55 L85 65 L70 80 Z" fill="#5EFF5E"/>
    <path d="M40 70 L55 55 L65 65 L50 80 Z" fill="#5E5EFF"/>
    <path d="M25 60 L75 60 L75 75 L25 75 Z" fill="#FFFFFF"/>
    <defs>
      <linearGradient id="gradFCP" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#303030" />
        <stop offset="1" stopColor="#000000" />
      </linearGradient>
    </defs>
  </svg>
);

export const MidjourneyIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="10" fill="#FFFFFF"/>
    <path d="M30 50 C30 30, 70 30, 70 50 C70 70, 30 70, 30 50 Z" stroke="#000000" strokeWidth="8"/>
    <circle cx="50" cy="50" r="10" fill="#000000"/>
  </svg>
);

export const RunwayIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#000000"/>
    <path d="M20 20 L40 20 L40 80 L20 80 Z" fill="#FFFFFF"/>
    <path d="M50 20 L70 20 L70 80 L50 80 Z" fill="#FFFFFF" opacity="0.6"/>
    <path d="M80 20 L100 20 L100 80 L80 80 Z" fill="#FFFFFF" opacity="0.3"/>
  </svg>
);

export const TopazLabsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#0D0D0D"/>
    <path d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z" fill="#207FFF"/>
    <path d="M50 30 L70 42 L70 65 L50 77 L30 65 L30 42 Z" fill="#FFFFFF"/>
  </svg>
);
