"use client";

import { Logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    Logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <form>
        <button onClick={onClick} type="submit">
          SignOut
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
