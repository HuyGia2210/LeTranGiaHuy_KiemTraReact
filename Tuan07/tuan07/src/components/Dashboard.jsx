import "./AdminPage.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Table from "./DataTable";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isNeedUpdate, setUpdate] = useState(false);

  const name = useRef("");
  const company = useRef("");
  const order_value = useRef("");
  const order_date = useRef("");
  const po_status = useRef("");

  useEffect(() => {
    fetch("https://67c7c860c19eb8753e7ab9c2.mockapi.io/analyst")
      .then((respone) => respone.json())
      .then((data) => setData(data));
  }, []);

  const [tableKey, setTableKey] = useState(0);

  // Gọi hàm này sau khi thực hiện một hành động nào đó ở Dashboard
  const reloadTable = () => {
    setTableKey((prev) => prev + 1); // đổi key => Table remount
  };

  const handleAdd = async () => {
    try {
      setSaving(true);

      const customerInfo = {
        name: name.current.value,
        company: company.current.value,
        order_value: order_value.current.value,
        order_date: order_date.current,
        status: po_status.current.value,
      };

      console.log(customerInfo);

      const response = await fetch(
        `https://67c7c860c19eb8753e7ab9c2.mockapi.io/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Update successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("There is an error while updating...");
    }
    setSaving(false);
    setUpdate(!isNeedUpdate);
    reloadTable();
  };

  return (
    <>
      {status && (
        <div className="fixed inset-0 flex items-center justify-center z-49">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setStatus(null)}
          ></div>
          <div className="bg-white flex flex-col rounded-2xl shadow-xl p-6 w-200 relative z-50">
            <div>
              <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
            </div>
            <div className="info grid grid-cols-2 gap-2 relative border-2 border-gray-300 rounded-lg mt-2 mb-5">
              <span className="absolute -top-3 left-2 bg-white px-2 text-sm text-gray-600">
                Add Customer Form
              </span>
              <div className="col-span-1 my-5 mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  ref={name}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  ref={company}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="col-span-1 my-5 mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Order Value
                </label>
                <input
                  type="number"
                  ref={order_value}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Order Date
                </label>
                <input
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value; // yyyy-mm-dd
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, "0");
                    const minutes = String(now.getMinutes()).padStart(2, "0");
                    const seconds = String(now.getSeconds()).padStart(2, "0");
                    const time = `${hours}:${minutes}:${seconds}`;
                    order_date.current = `${date} ${time}`;
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  ref={po_status} // 👈 không cần onChange
                  defaultValue="New"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="New">New</option>
                  <option value="In-progress">In-progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="cursor-pointer px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
                onClick={() => setStatus(null)}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAdd();
                }}
                disabled={isSaving}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  isSaving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex border-b-2 border-b-gray-200 justify-center items-center">
        <h1
          className="mx-4 my-3 text-2xl font-sans font-bold"
          style={{ color: "#f44a85" }}
        >
          Dashboard
        </h1>
        <div className="ml-auto relative flex w-full max-w-sm">
          <img
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            width={15}
            src="./search.svg"
            alt=""
          />
          <input
            className="pl-10 pr-3 py-1 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            style={{ backgroundColor: "#f3f4f6" }}
            placeholder="Search..."
            type="text"
            name=""
            id=""
          />
          <button className="cursor-pointer mt-1 mx-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bell-icon lucide-bell"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
          </button>
          <button className="cursor-pointer mt-1 mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-help-icon lucide-circle-help"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
          <img className="h-10 w-10 ml-2 rounded-4xl" src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/13.jpg" alt="" />
        </div>
      </div>
      <div className="inline-flex justify-center items-center mx-2 my-3.5">
        <svg
          style={{ marginInline: "10px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="#f44a85"
          stroke="#f44a85"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        <h3 className="text-start text-xl font-bold">Overview</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 px-5">
        <div className="bg-[#fff0f5] rounded-lg">
          <div className="grid grid-cols-4 pl-4 pt-3">
            <span className="col-span-3 font-bold">Turnover</span>
            <button className="cursor-pointer flex col-span-1 ml-5 mt-1 border-2 border-[#f44b86] rounded-lg justify-center items-center w-9 h-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f44b86"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </button>
          </div>
          <div>
            <h2 className="pl-4 pb-4 text-4xl font-bold">
              ${data[0]?.value.toLocaleString()}
            </h2>
          </div>
          <div className="pl-4 mb-3 flex items-center">
            {data[0]?.status === "up" && (
              <svg
                className="mt-1"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#0f7c31"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            )}
            {data[0]?.status === "down" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            )}
            <span
              className={`${
                data[0]?.status === "up" ? "text-[#0f7c31]" : "text-[#EA3323]"
              } font-semibold`}
            >
              {data[1]?.percentage.toLocaleString()}%
            </span>
            <span className="pl-1 text-gray-600">period of change</span>
          </div>
        </div>
        <div className="bg-[#eff6ff] rounded-lg">
          <div className="grid grid-cols-4 pl-4 pt-3">
            <span className="col-span-3 font-bold">Profit</span>
            <button className="cursor-pointer flex col-span-1 ml-5 mt-1 border-2 border-[#287ffe] rounded-lg justify-center items-center w-9 h-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#287ffe"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dollar-sign-icon lucide-dollar-sign"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </button>
          </div>
          <div>
            <h2 className="pl-4 pb-4 text-4xl font-bold">
              ${data[1]?.value.toLocaleString()}
            </h2>
          </div>
          <div className="pl-4 mb-3 flex items-center">
            {data[1]?.status === "up" && (
              <svg
                className="mt-1"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#0f7c31"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            )}
            {data[1]?.status === "down" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            )}
            <span
              className={`${
                data[1]?.status === "up" ? "text-[#0f7c31]" : "text-[#EA3323]"
              } font-semibold`}
            >
              {data[1]?.percentage.toLocaleString()}%
            </span>
            <span className="pl-1 text-gray-600">period of change</span>
          </div>
        </div>
        <div className="bg-[#f0f7fd] rounded-lg">
          <div className="grid grid-cols-4 pl-4 pt-3">
            <span className="col-span-3 font-bold">New customer</span>
            <button className="cursor-pointer flex col-span-1 ml-5 mt-1 border-2 border-[#2780fd] rounded-lg justify-center items-center w-9 h-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2780fd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
          </div>
          <div>
            <h2 className="pl-4 pb-4 text-4xl font-bold">
              {data[2]?.value.toLocaleString()}
            </h2>
          </div>
          <div className="pl-4 mb-3 flex items-center">
            {data[2]?.status === "up" && (
              <svg
                className="mt-1"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#0f7c31"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            )}
            {data[2]?.status === "down" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            )}
            <span
              className={`${
                data[2]?.status === "up" ? "text-[#0f7c31]" : "text-[#EA3323]"
              } font-semibold`}
            >
              {data[2]?.percentage.toLocaleString()}%
            </span>
            <span className="pl-1 text-gray-600">period of change</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between mx-4 py-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="#f44b86"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-receipt-text-icon lucide-receipt-text"
          >
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
            <path d="M14 8H8" />
            <path d="M16 12H8" />
            <path d="M13 16H8" />
          </svg>
          <h3 className="text-xl font-bold">Detailed report</h3>
        </div>
        <div className="flex items-center">
          <button className="cursor-pointer flex items-center justify-center border-2 border-[#e35587] text-[#e35587] rounded-lg w-25 h-9 hover:text-[#ffffff] hover:bg-[#e35587] transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-import-icon lucide-import"
            >
              <path d="M12 3v12" />
              <path d="m8 11 4 4 4-4" />
              <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
            </svg>
            <span className="pl-2">Import</span>
          </button>
          <button className="cursor-pointer mx-2 flex items-center justify-center border-2 border-[#e35587] text-[#e35587] rounded-lg w-25 h-9 hover:text-[#ffffff] hover:bg-[#e35587] transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M280-160v-80h400v80H280Zm160-160v-327L336-544l-56-56 200-200 200 200-56 56-104-103v327h-80Z" />
            </svg>
            <span className="pl-2">Export</span>
          </button>
          <button
            onClick={() => setStatus(true)}
            className="cursor-pointer flex items-center justify-center border-2 border-[#e35587] text-[#e35587] rounded-lg w-25 h-9 hover:text-[#ffffff] hover:bg-[#e35587] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            <span className="pl-2">Add</span>
          </button>
        </div>
      </div>
      <div className="px-6 rounded-4xl">
        <Table key={tableKey}></Table>
      </div>
    </>
  );
}
