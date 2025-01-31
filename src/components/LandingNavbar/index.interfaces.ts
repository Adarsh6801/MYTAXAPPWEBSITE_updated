export interface INavItem {
  text: string;
  url: string;
  onClick?: () => void;
}

export interface ILandingNavbarProps {
  userType?: "expert" | "taxpayer";
  className?: string;
  light?: boolean;
}
