import { Activity, Users, FileText, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "کۆی سەردانکەران", value: "٢,٤٥٠", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "داواکارییە نوێیەکان", value: "١٤", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "بابەتە بڵاوکراوەکان", value: "٣٢", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "دۆخی سیستەم", value: "چالاكە", icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2540] dark:text-white mb-2">بەخێربێیت، بەڕێوەبەر 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">لێرەوە دەتوانیت سەرجەم بەشەکانی ماڵپەڕەکە بەڕێوەبەریت.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-[#0A2540] dark:text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-6">دوایین چالاکییەکان</h3>
        <div className="text-center py-10 text-slate-500">
          هێشتا هیچ چالاکییەک تۆمار نەکراوە بۆ پیشاندان. داتابەیسەکە بەستراوەتەوە بە Google Sheets.
        </div>
      </div>
    </div>
  );
}