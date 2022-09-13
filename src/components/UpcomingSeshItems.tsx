import { Sesh, GeneralReference } from "../../typings";
import MyDivider from "./CustomDivider";
import CustomAvatar from "./CustomAvatar";
import { AtSymbolIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { green } from "@sanity/color";

interface UpcomingSeshItemsProps {
  sesh: GeneralReference | undefined;
  myId: string;
}

const UpcomingSeshItems = ({ sesh, myId }: UpcomingSeshItemsProps) => {
  const [loading, setLoading] = useState(false);
  const [sendersDetails, setSendersDetails] = useState({
    email: "",
    image: "",
  });
  const [fullSeshDeets, setFullSeshDeets] = useState<Sesh>();
  const [senderReference, setSenderReference] = useState<string>("");

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

  return (
    <>
      {sesh && (
        <div className="mx-auto my-auto flex h-[90%] flex-col rounded-lg bg-neon-blue-50 py-1 px-4 md:w-[30%] md:px-2  ">
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
              We&apos;re playing some:
            </h3>
            <h2 className="text-center text-sm font-medium text-neon-blue-900 md:text-base">
              {fullSeshDeets?.game}
            </h2>
            <MyDivider text={"When"} />
          </div>
          <div className="z-20 mx-auto flex flex-col text-center">
            <div className="mx-auto flex flex-col items-center justify-center space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-3">
              <h1 className="flex text-lg  font-medium text-neon-blue-900">
                {fullSeshDeets?.proposedDay}
              </h1>
              <AtSymbolIcon className="flex w-6  fill-neon-blue-600 " />
              <h2 className=" text-lg font-medium tracking-wide text-neon-blue-900">
                {fullSeshDeets?.proposedTime}
              </h2>
            </div>
          </div>
          <div className="my-0.5">
            <MyDivider text={"Confirmed"} />
          </div>
          <div className="mx-auto my-1 flex w-full flex-row justify-evenly ">
            {fullSeshDeets?.usersConfirmed?.length
              ? fullSeshDeets?.usersConfirmed.map((_x, idx) => (
                  <div key={idx} className="flex flex-row space-x-2">
                    <p className="font-medium text-neon-blue-900">
                      {fullSeshDeets?.usersConfirmed?.length}
                    </p>
                    <HandThumbUpIcon className="h-6 w-6 fill-green-500 text-green-800" />
                  </div>
                ))
              : null}
            {fullSeshDeets?.usersDeclined?.length
              ? fullSeshDeets?.usersDeclined.map((_x, idx) => (
                  <div key={idx} className="flex flex-row space-x-2">
                    <p className="font-medium text-neon-blue-900">
                      {fullSeshDeets?.usersConfirmed?.length}
                    </p>
                    <HandThumbDownIcon className="h-6 w-6 fill-red-500 text-red-800" />
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingSeshItems;
