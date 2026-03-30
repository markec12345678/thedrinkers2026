import AIGeneratorPage from "./AIGeneratorPage";
import { requireAdminUser } from "@/lib/auth-utils";

export default async function Page() {
  await requireAdminUser("/admin/ai-generator");
  return <AIGeneratorPage />;
}
