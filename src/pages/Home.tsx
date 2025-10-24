import { UserCog } from "lucide-react";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-2 text-2xl font-semibold">
      <UserCog size={100} className="text-blue-900" strokeWidth={1} />
    </div>
  );
}

export default Home;
