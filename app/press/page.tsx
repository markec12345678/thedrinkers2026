import { Metadata } from "next";
import { PressKitContent } from "@/components/press/PressKitContent";

export const metadata: Metadata = {
  title: "Press Kit | The Drinkers",
  description:
    "Official press kit for The Drinkers band. High-res photos, bio, discography, and contact information for media inquiries.",
  openGraph: {
    title: "The Drinkers - Press Kit",
    description: "Official press kit for media inquiries",
    images: ["/images/og-press.jpg"],
  },
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <PressKitContent />
      </div>
    </div>
  );
}
