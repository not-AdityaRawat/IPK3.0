import React, { useEffect, useState } from "react";
import Courses from "../Components/Course";
// import { IoIosNotifications } from "react-icons/io"; Notification old icon
import LeaderBoard from "../Components/LeaderBoard";
import { MdNotificationsActive } from "react-icons/md";

const Home = () => {
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      let res = await fetch("/Notification.json");
      if (!res.ok) {
        throw error(`HTTP Error! Status`, res.status);
      }
      const Data = await res.json();
      setdata(Data);
    } catch (err) {
      console.error("Error Fetching ",err)
      throw new err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="min-h-screen p-8">
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="mb-10 w-full">
          <Courses />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-center mt-5">
              Welcome to IP Survivor's Kit
            </h1>
            <p>A Note & Lecture Sharing Platform </p>
          </div>
        </div>

        <div className="mt-10  rounded-2xl overflow-hidden">
          <div className=" bg-green-100 w-full h-auto max-w-3xl mx-auto border border-gray-300 rounded-2xl p-6 flex gap-3 flex-col sm:flex-row sm:gap-4">
            {/* Contribute Section */}

            <LeaderBoard />

            {/* Notifications Section */}
            <div className="sm:w-1/2 h-max md:  bg-teal-700 rounded-xl  shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
              <h1 className="font-semibold text-lg py-3 text-center text-white">
                Notifications <MdNotificationsActive color="gold" className="inline-block" />
              </h1>
              <div className="max-h-52 overflow-y-scroll py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thumb-rounded-full ">
                <ul className=" text-white text-start pl-2 space-y-2">
                  {data.length > 0 ? (
                    data.map((notification, index) => ( //index should come after notification
                      <li key={index} className=" text-sm hover:bg-yellow-500 hover:text-black cursor-pointer">
                      <span className="font-bold ">{notification.title}</span>{"  "}
                      {notification.message}
                    </li>
                      
                    ))
                  ) : (
                    <li>No Notification</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
