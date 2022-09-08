import DashboardHeader from "../../components/DashboardHeader";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import { useEffect, useState } from "react";

import Top3Games from "../../components/Top3Games";
import { sanityClient } from "../../sanity";
import { User } from "../../typings";

function Account() {
  const [data, setData] = useState<User | undefined>();
  const [myLoading, setMyLoading] = useState(true);
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const clearState = () => {
    setFirstName("");
    setLastName("");
  };

  async function getUser(name: string | undefined) {
    const params = { name: name };
    const query = `*[_type == "user" && email == $name]
  `;
    const sanUser = await sanityClient.fetch(query, params);
    if (sanUser) {
      return sanUser[0];
    } else {
      console.log("NO USER");
      return undefined;
    }
  }

  useEffect(() => {
    setMyLoading(true);
    if (user?.email) {
      getUser(user?.email).then((res) => {
        if (res) {
          setData(res);
          setMyLoading(false);
        } else {
          console.log(res);
          setMyLoading(false);
        }
      });
    }
  }, [user?.email]);
  useEffect(() => {
    return () => clearState();
  }, []);

  if (isLoading || myLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <PageNotFound />;
  }

  return (
    <>
      <div className="bg-neon-blue-50">
        <DashboardHeader />
        <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
              Account
            </h1>
          </div>
        </header>
      </div>
      <div className="flex-1 xl:overflow-y-auto">
        <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neon-blue-900">
            Profile
          </h1>
          <form className="divide-y-neon-blue-300 mt-6 space-y-8 divide-y">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-neon-blue-900">
                  Email
                </label>
                <div className="mt-1 flex rounded-md ">
                  <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                    {user?.email}
                  </h6>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  Username
                </label>
                <div className="mt-1 flex rounded-md ">
                  <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                    {user?.nickname}
                  </h6>
                </div>
              </div>
              {user?.given_name ? (
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-neon-blue-900">
                    First name
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                      {user?.given_name}
                    </h6>
                  </div>
                </div>
              ) : null}
              {user?.family_name ? (
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-neon-blue-900">
                    Last name
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <h6 className=" block w-full  text-neon-blue-900  sm:text-sm">
                      {user?.family_name}
                    </h6>
                  </div>
                </div>
              ) : null}

              <div className="sm:col-span-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center justify-between">
                  <img
                    className="inline-block h-12 w-12 rounded-full"
                    src={user?.picture}
                    alt=""
                  />
                  {/*<div className="ml-4 flex">*/}
                  {/*  <div*/}
                  {/*    onClick={() => alert("Functionality in progress")}*/}
                  {/*    className="border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"*/}
                  {/*  >*/}
                  {/*    <label*/}
                  {/*      htmlFor="user-photo"*/}
                  {/*      className="pointer-events-none relative text-sm font-medium text-neon-blue-900"*/}
                  {/*    >*/}
                  {/*      <span>Change</span>*/}
                  {/*      <span className="sr-only"> user photo</span>*/}
                  {/*    </label>*/}
                  {/*    <input*/}
                  {/*      id="user-photo"*/}
                  {/*      name="user-photo"*/}
                  {/*      type="file"*/}
                  {/*      className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-neon-blue-tone-300 opacity-0"*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="sm:col-span-3">
                <Top3Games gameArr={data?.gamesPlayed} top3User={data} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-neon-blue-900">
                  Personal Information
                </h2>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-neon-blue-900 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-neon-blue-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-neon-blue-900 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="mt-1 block w-full rounded-md border-neon-blue-900 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="text-blue-gray-900 block text-sm font-medium"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border-neon-blue-900 text-neon-blue-900 shadow-sm focus:ring-neon-blue-300  sm:text-sm"
                >
                  <option />
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="text-blue-gray-500 text-sm sm:col-span-6">
                This account was last updated on{" "}
                <p>
                  {`${user?.updated_at?.split("T")[0]} ${
                    user?.updated_at?.split("T")[1].split(".")[0]
                  }`}{" "}
                  GMT
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <button
                type="button"
                onClick={() => clearState()}
                className="text-blue-gray-900 hover:bg-blue-gray-50 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
