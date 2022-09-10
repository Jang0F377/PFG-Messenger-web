import PageNotFound from "../../components/PageNotFound";
import Support from "../../components/Support";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardHeader from "../../components/DashboardHeader";
import Loading from "../../components/Loading";

const SupportPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <PageNotFound />;
  }

  return (
    isAuthenticated && (
      <>
        <div className="bg-neon-blue-50">
          <DashboardHeader />
          <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                Support Sesh
              </h1>
            </div>
          </header>
        </div>
        <Support />
      </>
    )
  );
};

export default SupportPage;
