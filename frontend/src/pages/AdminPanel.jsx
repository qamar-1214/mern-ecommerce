import React from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer flex justify-center">
            {user?.data?.profile_pic ? (
              <img
                src={user?.data?.profile_pic}
                className="w-20 h-20 rounded-full"
                alt={user.data.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.data?.name}</p>
        </div>
      </aside>
      <main>main</main>
    </div>
  );
};

export default AdminPanel;
