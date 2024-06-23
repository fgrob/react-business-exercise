import React, { useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "./Settings";

const NavBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsButtonRef = useRef();

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="flex h-full items-center justify-between bg-gradient-to-r from-gray-400 to-gray-200 p-5 align-middle">
      <div className="h-fit text-xl font-bold">FERNANDO GROB CONEJEROS</div>
      <button
        className="h-fit text-3xl"
        onClick={toggleSettings}
        ref={settingsButtonRef}
      >
        <IoSettingsOutline className="hover hover:animate-spin" />
      </button>
      {isSettingsOpen && (
        <Settings
          setIsSettingsOpen={setIsSettingsOpen}
          settingsButtonRef={settingsButtonRef}
        />
      )}
    </div>
  );
};

export default NavBar;
