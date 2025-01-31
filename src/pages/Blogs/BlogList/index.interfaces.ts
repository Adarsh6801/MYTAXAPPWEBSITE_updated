export interface IBlogListProps {
  blogs?: Array<{
    id: number;
    image: string;
    title: string;
    shortDescription: string;
    tags: string[];
  }>;
}
