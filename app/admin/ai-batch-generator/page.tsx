import BatchGeneratorPage from "./BatchGeneratorPage";
import { requireAdminUser } from "@/lib/auth-utils";

export default async function Page() {
  await requireAdminUser("/admin/ai-batch-generator");
  return <BatchGeneratorPage />;
}
