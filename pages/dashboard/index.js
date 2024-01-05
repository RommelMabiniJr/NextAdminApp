import DashboardContent from "@/components/dashboard/DashboardContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DashboardContent />
    </div>
  );
};

export default DashboardPage;
