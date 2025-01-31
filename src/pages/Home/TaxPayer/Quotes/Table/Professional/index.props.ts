export interface IProfessional {
  img?: string;
  firstName: string;
  lastName: string;
  rating: number;
}

export interface IProfessionalProps {
  data: IProfessional;
  className?: string;
}
