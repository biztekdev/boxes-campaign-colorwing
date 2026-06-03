import CustomBagsCom from "@/components/campaign/customBags";
import { customBagsData } from "@/data/campaignData/customBagsData";
export default function Home() {


  return (
    <main className="min-h-screen  text-slate-900">
      <CustomBagsCom data={customBagsData} />
    </main>
  );
}