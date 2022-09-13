import { useAuth0 } from "@auth0/auth0-react";
import { EmptyState, InviteEmptyState } from "../../components/EmptyState";
import { DashboardPageFooter } from "../../components/Footers";
import PageNotFound from "../../components/PageNotFound";
import Loading from "../../components/Loading";
import DashboardHeader from "../../components/DashboardHeader";
import Friends from "../../components/Friends";
import { GeneralNotification } from "../../components/Notifications";
import { useEffect, useState } from "react";
import { sanityClient } from "../../../sanity";
import { useRouter } from "next/router";
import IncomingSeshInviteItems from "../../components/IncomingSeshInviteItems";
import { GeneralReference } from "../../../typings";
import UpcomingSeshItems from "../../components/UpcomingSeshItems";

function Dashboard() {
  const router = useRouter();
  const { sent } = router.query;
  const [name, setName] = useState<string | undefined>();
  const [passUserId, setPassUserId] = useState("");
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [incomingSeshInvites, setIncomingSeshInvites] =
    useState<Array<GeneralReference>>();
  const [upcomingSeshes, setUpcomingSeshes] =
    useState<Array<GeneralReference>>();
  const loggedInUser = {
    email: user?.email,
    image: user?.picture,
  };
  const showSuccessNotification = () => {
    setError(false);
    setSuccess(true);
    setShowNotification(true);
  };
  const showErrorNotification = () => {
    setSuccess(false);
    setError(true);
    setShowNotification(true);
  };
  const resetNotificationState = () => {
    setSuccess(false);
    setShowNotification(false);
    setError(false);
  };

  const handleNewUser = async () => {
    await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(loggedInUser),
    })
      .then(() => console.log("Sent to Sanity"))
      .catch((err) => console.log(err));
  };

  const fetchIncomingInvites = async () => {
    await fetch("/api/getInvitedSeshes", {
      method: "POST",
      body: JSON.stringify({ _id: passUserId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 500) {
          alert("STATUS CODE 500");
        }
      })
      .then((data) => {
        setIncomingSeshInvites(data.incomingInvites[0].seshInvites);
        setUpcomingSeshes(data.incomingInvites[0].upcomingSeshes);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setName(user?.email);
    if (name) {
      firstVisit(name)
        .then((res) => {
          if (res === true) {
            handleNewUser().catch((e) => console.warn(e));
          } else if (typeof res === "string") {
            setPassUserId(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [name, user?.email]);
  useEffect(() => {
    if (passUserId) {
      fetchIncomingInvites().catch((e) => console.log(e));
    }
  }, [passUserId]);

  useEffect(() => {
    if (sent === "true") {
      showSuccessNotification();
      setTimeout(() => resetNotificationState(), 3000);
    } else if (sent === "false") {
      showErrorNotification();
      setTimeout(() => resetNotificationState(), 3000);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <PageNotFound />;
  }

  return (
    <>
      {isAuthenticated && (
        <div id={"dashboard"} className="min-h-full">
          <div className="bg-neon-blue-50 pb-32">
            <DashboardHeader />
            <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                  Dashboard
                </h1>
              </div>
            </header>
          </div>

          <main className="-mt-32 space-y-3 bg-neon-blue-50 pt-3 ">
            <section className="mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 lg:max-w-4xl lg:px-4 lg:px-8 xl:max-w-7xl xl:pb-8">
              {/* Replace with your content */}
              <div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center  sm:px-6">
                <h1 className="-mt-5  text-left text-xl font-medium">
                  Upcoming Seshes
                </h1>
                <div className="flex max-h-fit min-h-[24rem] flex-row flex-nowrap overflow-x-auto rounded-lg border-4 border border-neon-blue-800/50 py-2 md:justify-center">
                  {upcomingSeshes?.length ? (
                    upcomingSeshes.map((sesh) => (
                      <UpcomingSeshItems
                        key={sesh?._key}
                        sesh={sesh}
                        myId={passUserId}
                      />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </div>
              {/* /End replace */}
            </section>

            <section className="mx-1.5 items-center justify-center rounded-lg bg-neon-blue-200 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
              {/* Replace with your content */}
              <div className="mx-auto  items-center justify-center rounded-lg  px-5 py-3 text-center  sm:px-6">
                <h1 className="-mt-2  text-left text-xl font-medium">
                  Pending Sesh invites
                </h1>
                <div className="flex max-h-fit min-h-[24rem] flex-row flex-nowrap overflow-x-auto rounded-lg border-4 border border-neon-blue-800/50 py-2 md:justify-center">
                  {incomingSeshInvites?.length ? (
                    incomingSeshInvites.map((sesh, idx) => (
                      <IncomingSeshInviteItems
                        key={idx}
                        sesh={sesh}
                        myId={passUserId}
                      />
                    ))
                  ) : (
                    <InviteEmptyState />
                  )}
                </div>
              </div>
              {/* /End replace */}
            </section>
            <section className="mx-1.5 rounded-lg bg-neon-blue-50 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
              <Friends />
            </section>
          </main>
          <DashboardPageFooter />
          {/*Notification insert here!!*/}
          <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
          >
            {success && showNotification && (
              <GeneralNotification
                success={success}
                outShow={showNotification}
              />
            )}
            {error && showNotification && (
              <GeneralNotification
                success={!error}
                outShow={showNotification}
              />
            )}
          </div>
          {/*MODAL*/}
        </div>
      )}
    </>
  );
}

export default Dashboard;

async function firstVisit(name: string | undefined) {
  const params = { name: name };
  const query = `*[_type == "user" && email == $name]{
  _id,
  }
  `;
  const user = await sanityClient.fetch(query, params);
  if (!user[0]?._id) {
    console.log("First Visit");
    return true;
  } else if (user[0]?._id) {
    return user[0]?._id;
  }
}
