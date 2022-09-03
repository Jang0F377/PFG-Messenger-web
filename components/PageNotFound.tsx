import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { DashboardPageFooter, ProductPageFooter } from "./Footers";

const PageNotFound = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <div className="flex h-[100vh] flex-col bg-neon-blue-100 lg:relative">
        <div className="flex flex-grow flex-col bg-neon-blue-100 lg:mt-20 lg:pt-6">
          <div>
            <img
              className="mx-auto flex h-[40vh] w-[50vw] px-1.5   2xl:px-0"
              src="/MicrosoftTeams-image-removebg-preview.png"
              alt="ERR"
            />
          </div>
          <main className="flex flex-grow flex-col items-center  bg-neon-blue-100">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
              <div className=" flex-shrink-0 justify-center pb-16 text-center sm:pb-32">
                <p className="text-base font-semibold text-neon-blue-600 lg:text-lg">
                  401 or 404
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-neon-blue-900 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-2 text-base text-neon-blue-tone-300">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <p className="text-base text-neon-blue-tone-200">
                  You may have to sign in to be able to access this page.
                </p>
                <div className="mt-6">
                  <Link href={isAuthenticated ? "/dashboard" : "/"}>
                    <button className="text-base font-medium text-neon-blue-700 hover:text-indigo-500">
                      Go back home
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
          {isAuthenticated ? <DashboardPageFooter /> : <ProductPageFooter />}
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
