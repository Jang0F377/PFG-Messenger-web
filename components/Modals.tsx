import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  specificRecipient: string | undefined;
}

export const SeshSendInviteModal = ({
  open,
  handleClose,
  specificRecipient,
}: ModalProps) => {
  const [recipients, setRecipients] = useState<Array<string>>();
  const [recipient, setRecipient] = useState(
    specificRecipient ? specificRecipient : ""
  );
  const [hour, setHour] = useState(8);
  const AM = "AM";
  const PM = "PM";
  const [morningOrEvening, setMorningOrEvening] = useState(AM);
  const [selected, setSelected] = useState("00");
  const selectTime = (event: {
    currentTarget: { id: SetStateAction<string> };
  }) => {
    if (selected !== event.currentTarget.id) {
      setSelected(event.currentTarget.id);
    }
  };

  const handleAmOrPm = () => {
    if (morningOrEvening === AM) {
      setMorningOrEvening(PM);
    } else {
      setMorningOrEvening(AM);
    }
  };
  const onClickAddHour = () => {
    if (hour === 12) {
      setHour(1);
    } else {
      setHour(hour + 1);
    }
  };
  const onClickSubHour = () => {
    if (hour === 1) {
      setHour(12);
    } else {
      setHour(hour - 1);
    }
  };
  const handleAddRecipient = (email: string) => {
    setRecipients([...(recipients ?? []), email]);
    setRecipient("");
  };
  const handleResetState = () => {
    handleClose();
    setRecipients(undefined);
    setRecipient(specificRecipient ? specificRecipient : "");
  };
  const handleSend = () => {
    alert(
      "Invite sent to " +
        recipients +
        "at" +
        `${hour} ${selected} ${morningOrEvening}`
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => handleResetState()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div className="z-20   mx-1 flex-col rounded-lg md:mx-auto  lg:relative lg:w-[490px] ">
                  <section className="space-y-6 rounded-t-lg bg-neon-blue-100 py-7 px-4 sm:px-6  lg:py-6">
                    <div>
                      <h3 className="text-base font-medium leading-6 text-neon-blue-900">
                        Send a Sesh Invite.
                      </h3>
                      <p className="mt-0.5 text-xs text-neon-blue-tone-200">
                        Add recipient/s and choose the proposed game and time.
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="recipient"
                        className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
                      >
                        Recipient/s
                      </label>
                      {recipients?.length ? (
                        <ul className="text-center md:text-left">
                          {recipients.map((game) => (
                            <li
                              key={game}
                              className="p-0.5 text-xs text-neon-blue-900"
                            >
                              {game}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div />
                      )}
                      <div className="flex flex-row items-center space-x-3">
                        <input
                          type="text"
                          name="recipient"
                          id="recipient"
                          autoComplete="email"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {recipient ? (
                          <PlusCircleIcon
                            onClick={() => {
                              handleAddRecipient(recipient);
                            }}
                            className="flex h-7 w-7 cursor-pointer justify-end text-right"
                          />
                        ) : null}
                      </div>
                    </div>
                  </section>
                  <section className="space-y-6 bg-neon-blue-100 px-4 pb-5 sm:px-6">
                    <div>
                      <label
                        htmlFor="game"
                        className="block text-xs  font-medium text-neon-blue-900 md:text-sm"
                      >
                        What game do you want to suggest?
                      </label>
                      <input
                        type="text"
                        name="game"
                        id="game"
                        autoComplete="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="recipient"
                        className="block text-sm font-medium text-neon-blue-900"
                      >
                        What time for the Sesh?
                      </label>
                      <div className="flex flex-col items-center justify-evenly space-y-3 pt-1 md:flex-row md:space-y-0">
                        <div className="mt-1 flex flex-row items-center rounded-md bg-white px-4 py-2 md:mt-0 ">
                          <ChevronLeftIcon
                            className="w-6 cursor-pointer pr-1"
                            onClick={onClickSubHour}
                          />
                          <h1 className=" mx-1 text-center">{hour}</h1>
                          <ChevronRightIcon
                            className="w-6 cursor-pointer pl-1"
                            onClick={onClickAddHour}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <div className="flex flex-row  rounded-md bg-white shadow-sm">
                            <button
                              onClick={selectTime}
                              id="00"
                              className={clsx(
                                "relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium",
                                selected === "00"
                                  ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                  : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
                              )}
                            >
                              00
                            </button>
                            <button
                              onClick={selectTime}
                              id="15"
                              className={clsx(
                                "relative inline-flex items-center  px-4 py-2 text-sm font-medium",
                                selected === "15"
                                  ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                  : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
                              )}
                            >
                              15
                            </button>
                            <button
                              onClick={selectTime}
                              id="30"
                              className={clsx(
                                "relative inline-flex items-center  px-4 py-2 text-sm font-medium",
                                selected === "30"
                                  ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                  : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
                              )}
                            >
                              30
                            </button>
                            <button
                              onClick={selectTime}
                              id="45"
                              className={clsx(
                                "relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
                                selected === "45"
                                  ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                  : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
                              )}
                            >
                              45
                            </button>
                          </div>
                        </div>
                        <span className="flex  rounded-md shadow-sm">
                          <button
                            onClick={handleAmOrPm}
                            id={AM}
                            className={clsx(
                              "relative inline-flex items-center rounded-l-md   px-4 py-2 text-sm font-medium ",
                              morningOrEvening === AM
                                ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50 hover:ring-1 hover:ring-neon-blue-500"
                            )}
                          >
                            {AM}
                          </button>
                          <button
                            onClick={handleAmOrPm}
                            id={PM}
                            className={clsx(
                              "relative inline-flex items-center rounded-r-md   px-4 py-2 text-sm font-medium",
                              morningOrEvening === PM
                                ? "border border-white bg-neon-blue-700 text-neon-blue-50 "
                                : "border border-gray-300 bg-white text-blue-700 hover:border-blue-50 hover:bg-neon-blue-700 hover:text-neon-blue-50  hover:ring-1 hover:ring-neon-blue-500"
                            )}
                          >
                            {PM}
                          </button>
                        </span>
                      </div>
                    </div>
                  </section>
                  <hr className="w-full border-neon-blue-700" />
                  <section className="flex items-center justify-end space-x-6 rounded-b-md bg-neon-blue-100 px-4 py-7 sm:px-6 lg:py-6">
                    <button
                      onClick={() => handleResetState()}
                      className="inline-block rounded-md bg-red-600 px-2 py-2.5 text-neon-blue-50 hover:bg-red-800 "
                    >
                      Cancel
                    </button>
                    <button
                      disabled={
                        recipients?.length === undefined ||
                        recipients?.length <= 0
                      }
                      onClick={handleSend}
                      className="inline-block items-center rounded-md bg-neon-blue-600 px-2 py-2.5 text-neon-blue-50 hover:bg-neon-blue-800 disabled:pointer-events-none disabled:bg-gray-400 "
                    >
                      Send Sesh Invite
                    </button>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const SeshReceiveInviteModal = ({ open }: ModalProps) => {};
