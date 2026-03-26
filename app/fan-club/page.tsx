import { Metadata } from "next";
import { FanClubContent } from "@/components/fan-club/FanClubContent";

export const metadata: Metadata = {
  title: "Fan Club | The Drinkers",
  description:
    "Join The Drinkers official fan club. Exclusive content, early access, community events, and connect with other fans.",
  openGraph: {
    title: "The Drinkers Fan Club",
    description: "Join the ultimate fan community",
    images: ["/images/og-fanclub.jpg"],
  },
};

export default function FanClubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FanClubContent />
      </div>
    </div>
  );
}
