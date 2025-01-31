export interface IRecentBlogPostsSectionProps {
  blogs?: IRecentBlogPost[];
  onClick?: () => void;
}

interface IRecentBlogPost {
  id: number;
  image: string;
  title: string;
  shortDescription: string;
}
