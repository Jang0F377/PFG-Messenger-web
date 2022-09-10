import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../../typings";

interface Top3GamesProps {
  top3User: User | undefined;
  gameArr: Array<string> | undefined;
}
const Top3Games = ({ top3User, gameArr }: Top3GamesProps) => {
  const router = useRouter();
  const data = gameArr;
  const uid = top3User?._id;
  const [editing, setEditing] = useState(false);
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [game3, setGame3] = useState("");

  const submitTop3 = async () => {
    await fetch("/api/myTop3", {
      method: "POST",
      body: JSON.stringify({
        game1: game1,
        game2: game2,
        game3: game3,
        _id: uid,
      }),
    })
      .then((res) => {
        setEditing(false);
        if (res.ok) {
          router.replace("/dashboard");
        } else {
          alert("Unsuccessful please try again");
          router.replace("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-between space-x-1 ">
      <div className="flex flex-col">
        <label className="ml-1 block  text-sm font-medium text-neon-blue-900">
          My Top 3:
        </label>
        {editing &&
          (data?.length ? (
            <p className="text-xs font-medium text-red-600">
              Please input all 3 fields.
            </p>
          ) : null)}
        {!editing &&
          (data?.length ? (
            <ul className="">
              {data.map((game) => (
                <li key={game} className="text-sm text-neon-blue-900">
                  {game}
                </li>
              ))}
            </ul>
          ) : (
            <div className="">
              <p className="text-sm text-neon-blue-900">
                I need to add this still!
              </p>
            </div>
          ))}
        {editing &&
          (data?.length ? (
            <div className="flex flex-col">
              <input
                type={"text"}
                value={game1}
                autoComplete="text"
                placeholder={data[0]}
                onChange={(e) => setGame1(e.target.value)}
                className="my-0.5 rounded placeholder:text-gray-300"
              />
              <input
                type={"text"}
                value={game2}
                autoComplete="text"
                placeholder={data[1]}
                onChange={(e) => setGame2(e.target.value)}
                className="my-0.5 rounded placeholder:text-gray-300"
              />
              <input
                type={"text"}
                value={game3}
                autoComplete="text"
                placeholder={data[2]}
                onChange={(e) => setGame3(e.target.value)}
                className="my-0.5 rounded placeholder:text-gray-300"
              />
              {game1 && game2 && game3 && (
                <button
                  type={"button"}
                  onClick={submitTop3}
                  className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-1.5 py-2 text-sm font-medium text-neon-blue-50 hover:bg-neon-blue-800"
                >
                  Set
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              <input
                type={"text"}
                value={game1}
                autoComplete="text"
                onChange={(e) => setGame1(e.target.value)}
                className="my-0.5 rounded"
              />
              <input
                type={"text"}
                autoComplete="text"
                value={game2}
                onChange={(e) => setGame2(e.target.value)}
                className="my-0.5 rounded"
              />
              <input
                type={"text"}
                value={game3}
                autoComplete="text"
                onChange={(e) => setGame3(e.target.value)}
                className="my-0.5 rounded"
              />
              <button
                type={"button"}
                disabled={!game1 || !game2 || !game3}
                onClick={submitTop3}
                className="my-0.5 inline-block rounded-lg bg-neon-blue-600 px-1.5 py-2 text-sm font-medium text-neon-blue-50 hover:bg-neon-blue-800 disabled:bg-gray-400"
              >
                Set
              </button>
            </div>
          ))}
      </div>
      <div
        onClick={() => setEditing(!editing)}
        className="border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm "
      >
        <label
          htmlFor="top3"
          className="pointer-events-none relative text-sm font-medium text-neon-blue-900"
        >
          <span>{editing ? "Cancel" : "Update"}</span>
          <span className="sr-only">Top 3 games</span>
        </label>
      </div>
    </div>
  );
};

export default Top3Games;
