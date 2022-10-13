import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import { usePreferencesContext } from '../context/preferences-context';
import { ActionType } from '../context/reducer/types';

const PreferencesMenu: React.FC = () => {
  const { state, dispatch } = usePreferencesContext();
  const [accentColor, setAccentColor] = useState<string>('botanic');

  const handleCloseMenu = () => {
    dispatch({
      type: ActionType.SET_PREFERENCES_MENU_OPEN,
      payload: {
        open: false,
      },
    });
  };

  return (
    <Transition appear show={state.menuOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseMenu}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Edit your Preferences
                </Dialog.Title>
                <div className="mt-2">
                  {/* Accent Colors */}
                  <div>
                    <label htmlFor="accentColor" className="mb-2 block text-sm font-medium text-gray-900 ">
                      Select an Accent Color
                    </label>
                    <select
                      id="accentColor"
                      value={accentColor}
                      onChange={(e) => {
                        setAccentColor(e.target.value);
                        dispatch({
                          type: ActionType.SET_ACCENT_COLORS,
                          payload: {
                            accentColors: e.target.value,
                          },
                        });
                      }}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="botanic" selected>
                        Botanic
                      </option>
                      <option value="aether">Aether</option>
                      <option value="blueberry">Blueberry</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleCloseMenu}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferencesMenu;
