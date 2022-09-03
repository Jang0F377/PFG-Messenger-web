import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import DashboardHeader from "../../components/DashboardHeader";
import { EmptyState } from "../../components/EmptyState";

const Friends: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <PageNotFound />;
  }

  return (
    isAuthenticated && (
      <>
        <div className="bg-neon-blue-50 ">
          <DashboardHeader />
          <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                Friends
              </h1>
            </div>
          </header>
        </div>
        <main className="bg-neon-blue-50 pt-3  ">
          <section className="mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 lg:max-w-4xl lg:px-4 lg:px-8 xl:max-w-7xl xl:pb-8">
            {/* Replace with your content */}
            <div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center  sm:px-6">
              <h1 className="-mt-5  text-left text-xl font-medium">
                Upcoming Seshes
              </h1>
              <div className="flex h-96 items-center rounded-lg border-4 border border-neon-blue-800/50">
                <EmptyState />
              </div>
            </div>
            {/* /End replace */}
          </section>
        </main>
      </>
    )
  );
};

export default Friends;
