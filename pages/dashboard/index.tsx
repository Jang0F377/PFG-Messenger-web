import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import DashboardNavLinks from "../../components/DashboardNavLinks";
import EmptyState from "../../components/EmptyState";

function Dashboard() {
  const { isAuthenticated, error, user, logout } = useAuth0();
  const router = useRouter();
  const loggedInUser = {
    name: user?.nickname || user?.email,
    email: user?.email,
    imageUrl: user?.picture,
  };
  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Friends", href: "/friends" },
    { name: "Support Sesh", href: "/support" },
    { name: "Account", href: "/account" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/").catch((err) => alert(err));
    }
  }, []);

  return (
    <>
      <div className="min-h-full">
        <div className="bg-neon-blue-700 pb-32">
          <Disclosure as="nav" className="bg-neon-blue-50">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={"/MicrosoftTeams-image-removebg-preview.png"}
                            alt="ERR"
                            className="w-[7.5rem] py-1 lg:w-32 "
                          />
                        </div>
                        <div className="hidden md:mx-auto md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            <div className="hidden items-center md:flex md:gap-x-14 ">
                              <DashboardNavLinks />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={loggedInUser.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href={"#"}
                                      className={clsx(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Settings
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      onClick={() => logout()}
                                      className={clsx(
                                        active ? "bg-gray-100" : "",
                                        "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      Sign out
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={clsx(
                          "block rounded-md px-3 py-2 text-base font-medium text-neon-blue-900 hover:bg-neon-blue-800 hover:text-white hover:ring-1 hover:ring-neon-blue-50"
                        )}
                        aria-current={item ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={loggedInUser.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 space-y-1">
                        <div className="text-xs font-medium leading-none text-neon-blue-tone-300">
                          {loggedInUser.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-neon-blue-tone-100">
                          {loggedInUser.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        href={"#"}
                        className="block rounded-md px-3 py-2 text-base font-medium text-neon-blue-900 hover:bg-neon-blue-800 hover:text-white hover:ring-1 hover:ring-neon-blue-50"
                      >
                        Settings
                      </Disclosure.Button>
                      <Disclosure.Button
                        onClick={() => logout()}
                        as="a"
                        className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-neon-blue-900 hover:bg-neon-blue-800 hover:text-white hover:ring-1 hover:ring-neon-blue-50"
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-semibold text-neon-blue-50">
                Dashboard
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32 bg-neon-blue-700">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-50 px-5 py-6 text-center  sm:px-6">
              <div className="flex h-96 items-center rounded-lg border-4 border border-gray-200">
                <EmptyState />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;

/*
Returned auth0 User Object
{
email:"mjgarrett7092@gmail.com"
email_verified:false
name:"mjgarrett7092@gmail.com"
nickname:"mjgarrett7092"
picture:"https://s.gravatar.com/avatar/3735ef897655065107792a056095e01d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmj.png"
sub:"auth0|630eec87de80d89f77770086"
updated_at:"2022-09-02T18:22:45.140Z"}
* */
