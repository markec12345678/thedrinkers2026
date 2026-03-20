import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Koncerti',
  description: 'Preveri vse prihajajoče koncerte skupine The Drinkers in si zagotovi vstopnice.',
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return children;
}
