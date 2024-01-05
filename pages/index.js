import Dashboard from "@/components/dashboard/DashboardContent";
import LoginDialog from "@/components/LoginDialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MainPage = () => {
  // Conditionally show the login ui or the dashboard
  const { data: session, status } = useSession();
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div>
      <LoginDialog />
    </div>
  );
};

export default MainPage;
