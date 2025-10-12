import { BarChart3, FileText, PieChart } from "lucide-react";

// Survey Card Interface
export interface SurveyCard {
  id: number;
  icon: React.ReactNode;
  image: string;
}

// Survey Cards Data
export const surveyCards: SurveyCard[] = [
  {
    id: 1,
    icon: <BarChart3 className="h-4 w-4 text-white" />,
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    icon: <BarChart3 className="h-4 w-4 text-white" />,
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    icon: <BarChart3 className="h-4 w-4 text-white" />,
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop",
  },
];
