import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { TbUsers } from "react-icons/tb";

const stats = [
  {
    icon: <FaHandHoldingDollar size={28} />,
    label: "Total Earnings",
    value: "$5,000",
  },
  {
    icon: <TbUsers size={28} />,
    label: "Total Users",
    value: "1,204",
  },
  {
    icon: <MdWorkHistory size={28} />,
    label: "Workouts Completed",
    value: "687",
  },
];

const HomeTop = () => {
  return (
    <div className="w-full px-4 py-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 bg-brand-primary text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="p-3 bg-white text-brand-primary rounded-full shadow-md flex items-center justify-center">
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium text-white/80">{item.label}</p>
              <h1 className="text-3xl font-semibold tracking-wide">
                {item.value}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTop;
