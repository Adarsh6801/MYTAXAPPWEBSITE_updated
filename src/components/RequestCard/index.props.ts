export interface IRequestCardProps {
  title: string;
  data: IRequestCardData;
  date: string;
  onViewDetails?: () => void;
  className?: string;
}

export interface IRequestCardData {
  icon: JSX.Element;
  text: string;
}
