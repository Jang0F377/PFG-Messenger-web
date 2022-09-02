import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CalendarIcon,
  CommandLineIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

function EmptyState() {
  return (
    <div className="mx-auto max-w-xs rounded-xl border-2 border-neon-blue-800 bg-neon-blue-700 py-2 transition duration-200 ease-in-out hover:translate-y-1 hover:scale-105 lg:hover:scale-110 xl:max-w-sm ">
      <h2 className="px-0.5 text-lg font-medium text-neon-blue-50 lg:px-1">
        Create your first Sesh!
      </h2>
      <p className="mt-1 px-0.5 text-sm text-neon-blue-50 lg:px-1">
        Get started by adding friends in the friends tab.
      </p>
      <p className="mt-1 px-0.5 text-sm text-neon-blue-50 lg:px-1">
        Then come back here to start setting up Seshes.
      </p>
      <div className="mx-auto mt-6 flex justify-center">
        <div className="mx-auto justify-center text-center">
          <svg
            className="mx-auto h-12 w-12 text-neon-blue-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-neon-blue-50">
            Add friends
          </h2>
        </div>
      </div>
    </div>
  );
}
export default EmptyState;
