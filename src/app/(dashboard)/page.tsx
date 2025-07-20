import EarningChart from "../_components/Home/EarningChart";
import HomeTop from "../_components/Home/HomeTop";
import RecentUser from "../_components/Home/RecentUser";

export default function DashboardPage() {
  return (
    <div className="bg-red-60">
      <HomeTop />
      <EarningChart />
      <RecentUser />
    </div>
  );
}
