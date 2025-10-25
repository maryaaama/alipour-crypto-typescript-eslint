import DashboardHeader from "@/components/DashboardHeader";
import DashboardMain from "@/components/DashboardMain";

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100">
      <DashboardHeader />
      <DashboardMain />
    </div>
  );
}