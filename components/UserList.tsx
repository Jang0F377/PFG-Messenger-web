import { User } from "../typings";
import CustomAvatar from "./CustomAvatar";
import CustomDivider from "./CustomDivider";

interface UserListProps {
  user: User;
}

const UserList = ({ user }: UserListProps) => {
  const gamesPlayed = user?.gamesPlayed?.slice(0, 3);

  return (
    <div className="mx-auto w-[18rem] justify-center rounded-lg bg-neon-blue-300 shadow md:mx-0">
      <div className="px-3 py-4 sm:px-5">
        <header className="mx-auto flex flex-col  space-y-1 text-center">
          <CustomAvatar image={user?.image} size={"md"} />
          <h1 className="text-neon-blue-900 ">{user?.email}</h1>
        </header>
      </div>
      <CustomDivider text={"Info"} />

      <div className="px-2 py-2.5 sm:p-3">
        <label className="ml-1 block text-left text-sm font-medium text-neon-blue-900">
          My Top 3:
        </label>
        {gamesPlayed?.length ? (
          <ul className="text-center">
            {gamesPlayed.map((game) => (
              <li key={game} className="text-sm text-neon-blue-900">
                {game}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p className="text-sm text-neon-blue-900">
              I need to add this still!
            </p>
          </div>
        )}
      </div>
      <CustomDivider text={"Send me"} />
      <div className="flex justify-evenly py-3">
        <button
          className="rounded-lg bg-neon-blue-700 px-1.5 py-2.5 text-xs font-medium text-neon-blue-50 lg:text-sm"
          type={"button"}
        >
          A friend request
        </button>
        <button
          className="rounded-lg bg-neon-blue-700 px-1.5 py-2.5 text-xs font-medium text-neon-blue-50 lg:text-sm"
          type={"button"}
        >
          A Sesh invite
        </button>
      </div>
    </div>
  );
};

export default UserList;
