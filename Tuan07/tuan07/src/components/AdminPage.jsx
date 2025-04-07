import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";
// import { renderToStaticMarkup } from 'react-dom/server';
import "./AdminPage.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import $ from "jquery";
window.jQuery = window.$ = $;

export default function AdminPage() {
  DataTable.use(DT);
  const [crtBtn, setCrtBtn] = useState("dashboard");
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableRef = useRef(null);
  // const headerCheckboxRef = useRef(null);

  // Fetch table data from API
  useEffect(() => {
    fetch("https://67c7c860c19eb8753e7ab9c2.mockapi.io/customer")
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);

  const columns = [
    {
      title: `<input type="checkbox" id="header-checkbox" />`,
      data: null,
      className: "no-sort",
      orderable: false,
      render: (data, type, row) => {
        return `<input type="checkbox" class="row-checkbox" data-id="${
          row.id
        }" ${selectedRows.includes(row.id) ? "checked" : ""}>`;
      },
    },
    // { title: "CUSTOMER NAME", data: "name" },
    {
        title: "CUSTOMER NAME",
        data: null, // dùng render
        render: function (data, type, row) {
          return `
            <div class="user-cell">
              <img src="${row.avatar}" class="avatar" />
              <span class="user-name">${row.name}</span>
            </div>
          `;
        }
      },
    { title: "COMPANY", data: "company" },
    { title: "ORDER VALUE", data: "order_value" },
    { title: "ORDER DATE", data: "order_date" },
    { 
      title: "STATUS", 
      data: "status",
      render: function (data) {
        let colorClass = "";
    
        switch (data) {
          case "Completed":
            colorClass = "status-completed";
            break;
          case "In-progress":
            colorClass = "status-in-progress";
            break;
          case "New":
            colorClass = "status-new";
            break;
          default:
            colorClass = "status-default";
        }
    
        return `<span class="status-badge ${colorClass}">${data}</span>`;
      }
    },
    {
      title: "",
      data: null, // vì không lấy từ data source trực tiếp
      orderable: false,
      render: function (data, type, row, meta) {
        return `<button class="btn-edit" data-id="${row.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </button>`;
      }
    }
  ];

  useEffect(() => {
    // Thêm sự kiện cho các checkbox trong hàng
    const rowCheckboxes = document.querySelectorAll(".row-checkbox");
    rowCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        setSelectedRows((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
      });
    });

    return () => {
      rowCheckboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, [selectedRows, tableData]);

  const tableOptions = {
    dom: "rtp",
    paging: true,
    pageLength: 6,
    searching: false,
    info: true,
    pagingType: "simple_numbers", // Sử dụng simple_numbers để hiển thị số trang
    drawCallback: function () {

        const api = this.api();
        const pagination = $(api.table().container()).find(".dataTables_paginate");
        const pageInfo = api.page.info();
        const currentPage = pageInfo.page + 1;
        const totalPages = pageInfo.pages;

        // 👉 Gắn lại sự kiện cho checkbox hàng mỗi khi vẽ lại
        $(".row-checkbox").off("change").on("change", function () {
          const id = parseInt($(this).attr("data-id"));
          setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
        });
      
        // 👉 Cập nhật trạng thái checkbox header (nếu tất cả được chọn)
        const allCheckboxes = $(".row-checkbox");
        const allIds = allCheckboxes.map((_, el) => parseInt($(el).attr("data-id"))).get();
        const allChecked = allIds.every((id) => selectedRows.includes(id));
        $("#header-checkbox").prop("checked", allChecked);
      
        // 👇 Tuỳ chỉnh hiển thị phân trang (phần dấu ...)
        const pageButtons = pagination.find(".paginate_button").not(".previous, .next");
        pageButtons.each(function () {
          const pageNum = parseInt($(this).text());
          if (!isNaN(pageNum)) {
            if (
              (pageNum > 1 && pageNum < currentPage - 1 && pageNum !== 2) ||
              (pageNum < totalPages && pageNum > currentPage + 1 && pageNum !== totalPages - 1)
            ) {
              $(this).hide();
            } else {
              $(this).show();
            }
          }
        });
      
        if (currentPage > 3 && !pagination.find(".ellipsis-before").length) {
          pagination
            .find(".paginate_button:nth-child(3)")
            .after('<span class="paginate_button ellipsis-before">...</span>');
        }
        if (currentPage < totalPages - 2 && !pagination.find(".ellipsis-after").length) {
          pagination
            .find(".paginate_button:nth-last-child(2)")
            .before('<span class="paginate_button ellipsis-after">...</span>');
        }
      },
  };

  useEffect(() => {
    $(document).on("change", "#header-checkbox", function () {
      const checked = this.checked;
      $(".row-checkbox").each(function () {
        $(this).prop("checked", checked);
      });

      const allIds = checked ? tableData.map((row) => row.id) : [];
      setSelectedRows(allIds);
    });
  },);

  return (
    <>
      <div className="m-auto w-11/12  grid grid-cols-4 gap-0">
        <div className="border-2 border-gray-200 col-span-1">
          <div className="inline-flex mx-3 my-3">
            <img src="./slack.svg" alt="" />
            <h1 className="font-sans ml-2 font-bold text-2xl">Logo</h1>
          </div>
          <div id="navBtn" className="my-1">
            <ul>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("dashboard")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "dashboard"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "dashboard" ? "#ffffff" : "#000000"}
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
                  <span
                    className={`${
                      crtBtn == "dashboard"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Dashboard
                  </span>
                </button>
              </li>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("projects")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "projects"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "projects" ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-folder-icon lucide-folder"
                  >
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  </svg>
                  <span
                    className={`${
                      crtBtn === "projects"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Projects
                  </span>
                </button>
              </li>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("teams")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "teams"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "teams" ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-boxes-icon lucide-boxes"
                  >
                    <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
                    <path d="m7 16.5-4.74-2.85" />
                    <path d="m7 16.5 5-3" />
                    <path d="M7 16.5v5.17" />
                    <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
                    <path d="m17 16.5-5-3" />
                    <path d="m17 16.5 4.74-2.85" />
                    <path d="M17 16.5v5.17" />
                    <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
                    <path d="M12 8 7.26 5.15" />
                    <path d="m12 8 4.74-2.85" />
                    <path d="M12 13.5V8" />
                  </svg>
                  <span
                    className={`${
                      crtBtn == "teams"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Teams
                  </span>
                </button>
              </li>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("analytics")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "analytics"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "analytics" ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chart-pie-icon lucide-chart-pie"
                  >
                    <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  </svg>
                  <span
                    className={`${
                      crtBtn == "analytics"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Analytics
                  </span>
                </button>
              </li>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("messages")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "messages"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "messages" ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-square-text-icon lucide-message-square-text"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M13 8H7" />
                    <path d="M17 12H7" />
                  </svg>
                  <span
                    className={`${
                      crtBtn == "messages"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Messages
                  </span>
                </button>
              </li>
              <li className="my-2">
                <button
                  type="button"
                  onClick={() => setCrtBtn("integrations")}
                  className={`flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                    crtBtn == "integrations"
                      ? "bg-[#f44a85]"
                      : "bg-[#ffffff] hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <svg
                    style={{ marginInline: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={crtBtn == "integrations" ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-code-icon lucide-code"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span
                    className={`${
                      crtBtn == "integrations"
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    Integrations
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="bg-[#eff6ff] mt-13 mb-4 mx-5 rounded-md flex flex-col justify-center items-center">
            <img className="h-65" src="./image.png" alt="" />
            <h2 className="text-2xl font-bold my-2">V2.0 is available</h2>
            <button className="text-[#2980ff] border-2 border-[#2980ff] w-60 h-9 bg-[#ffffff] rounded-lg mb-4">
              Try now
            </button>
          </div>
        </div>
        <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
          <div className="flex border-b-2 border-b-gray-200 justify-center items-center">
            <h1
              className="mx-4 my-4 text-2xl font-sans font-bold"
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
              <button className="mt-1 mx-3">
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
              <button className="mt-1 mx-2">
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
            </div>
          </div>
          <div className="inline-flex justify-center items-center mx-2 my-5">
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
                <button className="flex col-span-1 ml-5 mt-1 border-2 border-[#f44b86] rounded-lg justify-center items-center w-9 h-9">
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
                <h2 className="pl-4 pb-4 text-4xl font-bold">$92,405</h2>
              </div>
              <div className="pl-4 mb-3 flex items-center">
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
                <span className="text-[#0f7c31] font-semibold">5.39%</span>
                <span className="pl-1 text-gray-600">period of change</span>
              </div>
            </div>
            <div className="bg-[#eff6ff] rounded-lg">
              <div className="grid grid-cols-4 pl-4 pt-3">
                <span className="col-span-3 font-bold">Profit</span>
                <button className="flex col-span-1 ml-5 mt-1 border-2 border-[#287ffe] rounded-lg justify-center items-center w-9 h-9">
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
                <h2 className="pl-4 pb-4 text-4xl font-bold">$32,218</h2>
              </div>
              <div className="pl-4 mb-3 flex items-center">
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
                <span className="text-[#0f7c31] font-semibold">5.39%</span>
                <span className="pl-1 text-gray-600">period of change</span>
              </div>
            </div>
            <div className="bg-[#f0f7fd] rounded-lg">
              <div className="grid grid-cols-4 pl-4 pt-3">
                <span className="col-span-3 font-bold">New customer</span>
                <button className="flex col-span-1 ml-5 mt-1 border-2 border-[#2780fd] rounded-lg justify-center items-center w-9 h-9">
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
                <h2 className="pl-4 pb-4 text-4xl font-bold">298</h2>
              </div>
              <div className="pl-4 mb-3 flex items-center">
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
                <span className="text-[#0f7c31] font-semibold">5.39%</span>
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
              <button className="flex items-center justify-center border-2 border-[#e35587] text-[#e35587] rounded-lg w-25 h-9 hover:text-[#ffffff] hover:bg-[#e35587] transition-colors duration-200">
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
              <button className="mx-2 flex items-center justify-center border-2 border-[#e35587] text-[#e35587] rounded-lg w-25 h-9 hover:text-[#ffffff] hover:bg-[#e35587] transition-colors duration-200">
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
            </div>
          </div>
          <div className="px-6 rounded-4xl">
            <DataTable
              ref={tableRef}
              data={tableData}
              columns={columns}
              options={tableOptions}
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
