function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Upcoming appointments">
        <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 12h16M4 6h16M4 18h16"
            />
          </svg>
          <p className="font-semibold">Your schedule is empty</p>
          <p className="text-sm">
            Make some appointments for schedule data to appear
          </p>
        </div>
      </Card>
    </div>
  );
}
