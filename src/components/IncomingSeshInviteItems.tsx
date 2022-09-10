import { Sesh } from "../../typings";
import MyDivider from "./CustomDivider";

interface IncomingSeshInviteItemsProps {
  sesh: Sesh | undefined;
}

const IncomingSeshInviteItems = ({ sesh }: IncomingSeshInviteItemsProps) => {
  return (
    <>
      <div className="relative mx-1 flex   flex-col  rounded-lg ">
        <header className="py-1">
          <p className="absolute top-2 right-2 text-xs">
            Received {new Date().toLocaleDateString()}
          </p>
          <h1 className="text-center text-3xl font-medium text-neon-blue-900">
            Sesh Invite
          </h1>
          <MyDivider text={"From"} />
        </header>
      </div>
    </>
  );
};

export default IncomingSeshInviteItems;
