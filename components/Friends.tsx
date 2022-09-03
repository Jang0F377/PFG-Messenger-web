import React from "react";
import { FriendInviteEmptyState, FriendListEmptyState } from "./EmptyState";

const Friends: React.FC = () => {
  return (
    <div id="friends">
      <main className="bg-neon-blue-50 pt-3  ">
        <section className="mx-1.5 px-4 pb-3 sm:px-6 md:mx-auto  md:max-w-2xl md:pb-6 lg:max-w-4xl lg:px-4 lg:px-8 xl:max-w-7xl xl:pb-8">
          {/* Replace with your content */}
          <div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-6 text-center  sm:px-6">
            <h1 className="-mt-5  text-left text-xl font-medium">
              Friends list
            </h1>
            <div className="flex h-96 items-center rounded-lg border-4 border border-neon-blue-800/50">
              <FriendListEmptyState />
            </div>
          </div>
          {/* /End replace */}
        </section>
        <section className="mx-1.5 rounded-lg bg-neon-blue-50 px-2 pb-6 sm:px-3 md:mx-auto md:max-w-2xl lg:max-w-4xl lg:px-4  xl:max-w-7xl">
          {/* Replace with your content */}
          <div className="mx-auto  items-center justify-center rounded-lg bg-neon-blue-200 px-5 py-3 text-center  sm:px-6">
            <h1 className="-mt-2  text-left text-xl font-medium">
              Pending friend requests
            </h1>
            <div className="flex h-96 items-center rounded-lg border-4 border border-neon-blue-800/50">
              <FriendInviteEmptyState />
            </div>
          </div>
          {/* /End replace */}
        </section>
      </main>
    </div>
  );
};

export default Friends;
