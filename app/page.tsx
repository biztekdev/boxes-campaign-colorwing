import type { Metadata } from "next";
import CustomBagsCom from "../components/campaign/customBags";
import { customBagsData } from "../data/campaignData/customBagsData";

export const metadata: Metadata = {
  title: "Custom Boxes & Wholesale Packaging Solutions",
  description: "Custom boxes and wholesale packaging for retail, eCommerce, and product brands. Available in custom sizes, styles, and premium printing options.",
};

export default function Home() {
  return (
    <main className="min-h-screen  text-slate-900">
      <CustomBagsCom data={customBagsData} />
    </main>
  );
}