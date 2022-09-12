import { Sesh, SeshReference } from "../../typings";
import MyDivider from "./CustomDivider";
import { sanityClient } from "../../sanity";
import { useEffect, useState } from "react";
import CustomAvatar from "./CustomAvatar";
import { AtSymbolIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import Loading from "./Loading";

interface IncomingSeshInviteItemsProps {
  sesh: SeshReference | undefined;
  myId: string;
}

const IncomingSeshInviteItems = ({
  sesh,
  myId,
}: IncomingSeshInviteItemsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sendersDetails, setSendersDetails] = useState({
    email: "",
    image: "",
  });
  const [fullSeshDeets, setFullSeshDeets] = useState<Sesh>();
  const [senderReference, setSenderReference] = useState<string>("");
  const confirm = "Confirm";
  const decline = "Decline";
  const [selected, setSelected] = useState("");
  const handleConfirmClick = () => {
    if (selected !== confirm) {
      setSelected(confirm);
    } else {
      return;
    }
  };
  const handleDeclineClick = () => {
    if (selected !== decline) {
      setSelected(decline);
    } else {
      return;
    }
  };
  const handleSubmitDecision = async () => {
    await fetch("/api/postDecision", {
      method: "POST",
      body: JSON.stringify({
        decision: selected,
        seshId: sesh?._ref,
        _id: myId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          router.reload();
        }
      })
      .catch((e) => console.log(e));
  };
  const fetchSeshInfo = async () => {
    await fetch("/api/getSeshInfo", {
      method: "POST",
      body: JSON.stringify({
        id: sesh?._ref,
      }),
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
        setFullSeshDeets(data.seshInfo[0]);
        setSenderReference(data.seshInfo[0]?.sentFrom._ref);
      })
      .catch((e) => console.log(e));
  };
  const fetchSenderInfo = async () => {
    await fetch("/api/getSender", {
      method: "POST",
      body: JSON.stringify({
        ref: senderReference,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setSendersDetails({
          email: data.senderInfo[0]?.email,
          image: data.senderInfo[0]?.image,
        });
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (!loading) {
      setLoading(true);

      if (sesh) {
        fetchSeshInfo().then(() => {
          if (senderReference) {
            fetchSenderInfo().catch((e) => console.log(e));
          }
        });
        setLoading(false);
      }
    }
  }, [sesh, senderReference]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {sesh && (
        <div className="mx-2.5 flex h-[90%]  flex-col rounded-lg bg-neon-blue-50   p-2  md:w-[35%] ">
          <header className="py-1">
            <p className="top-2 right-2 text-right text-xs ">
              {fullSeshDeets?._createdAt?.split("T")[0]}
            </p>
            <h1 className="text-center text-3xl font-medium text-neon-blue-900">
              Sesh Invite
            </h1>
            <MyDivider text={"From"} />
          </header>
          <div className="mx-auto mt-1  flex flex-col space-y-1">
            <CustomAvatar image={sendersDetails?.image} size={"md"} />
            <p className="text-sm font-medium text-neon-blue-900">
              {sendersDetails.email
                ? sendersDetails.email.split("@")[0]
                : "Loading"}
            </p>
          </div>
          <div className="my-1 ">
            <h3 className="text-center text-xs  text-neon-blue-900 md:text-sm ">
              Lets play some:
            </h3>
            <h2 className="text-center text-sm font-medium text-neon-blue-900 md:text-base">
              {fullSeshDeets?.game}
            </h2>
            <MyDivider text={"When"} />
          </div>
          <div className="z-20 mx-auto flex flex-col text-center">
            <p className="text-base font-medium text-neon-blue-900">
              {sendersDetails.email
                ? sendersDetails.email.split("@")[0]
                : "Loading"}
            </p>
            <p className="text-sm text-neon-blue-900">proposes</p>
            <div className="mx-auto flex flex-col items-center justify-center space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-3">
              <h1 className="flex text-lg  font-medium text-neon-blue-900">
                {fullSeshDeets?.proposedDay}
              </h1>
              <AtSymbolIcon className="flex w-6  fill-neon-blue-600 " />
              <h2 className=" text-lg font-medium tracking-wide text-neon-blue-900">
                {fullSeshDeets?.proposedTime}
              </h2>
            </div>
            <div className="flex flex-col">
              <span className="mx-auto my-2 mb-4 flex rounded-md shadow-sm">
                <button
                  onClick={handleConfirmClick}
                  id={confirm}
                  className={clsx(
                    "relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium ",
                    selected === confirm
                      ? "border border-white bg-green-700 text-green-50 "
                      : "border border-gray-300 bg-white text-green-700 hover:border-green-50 hover:bg-green-700 hover:text-green-50 hover:ring-1 hover:ring-green-500"
                  )}
                >
                  {confirm}
                </button>
                <button
                  onClick={handleDeclineClick}
                  id={decline}
                  className={clsx(
                    "relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
                    selected === decline
                      ? "border border-white bg-red-700 text-red-50 "
                      : "border border-gray-300 bg-white text-red-700 hover:border-red-50 hover:bg-red-700 hover:text-red-50  hover:ring-1 hover:ring-red-500"
                  )}
                >
                  {decline}
                </button>
              </span>
            </div>
            {selected === confirm || selected === decline ? (
              <button
                disabled={selected !== confirm && selected !== decline}
                onClick={handleSubmitDecision}
                className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-1.5 py-2 text-sm font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400"
              >
                Make Decision
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default IncomingSeshInviteItems;
