import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";
// import { renderToStaticMarkup } from 'react-dom/server';
import "./AdminPage.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import $ from "jquery";
window.jQuery = window.$ = $;

export default function Dashboard(){
    DataTable.use(DT);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableRef = useRef(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // const headerCheckboxRef = useRef(null);

  // Fetch table data from API
  useEffect(() => {
    fetch("https://67c7c860c19eb8753e7ab9c2.mockapi.io/customer")
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);

  const tableDataRef = useRef(tableData);
  useEffect(() => {
    tableDataRef.current = tableData; // Cập nhật giá trị mới nhất của tableData
  }, [tableData]);

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
      render: function (data, type, row,) {
        return `<button class="btn-edit" data-id="${row.customer_id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </button>`;
      }
    }
  ];

  // onclick="window.handleEditButtonClick(${row.customer_id})"

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
    pageLength: 5,
    searching: false,
    info: true,
    pagingType: "simple_numbers", // Sử dụng simple_numbers để hiển thị số trang
    drawCallback: function () {

        const api = this.api();
        const pagination = $(api.table().container()).find(".dataTables_paginate");
        const pageInfo = api.page.info();
        const currentPage = pageInfo.page + 1;
        const totalPages = pageInfo.pages;
        
        $(".btn-edit").off("click").on("click", function () {
          const id = parseInt($(this).attr("data-id"));
          console.log("Button clicked, id:", id);
          console.log(tableDataRef)
          const customer = tableDataRef.current.find((item) => item.customer_id == id); // So sánh chuỗi với chuỗi
          console.log("Customer found:", customer);
          setSelectedCustomer(customer);
        });

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


  return(
    <>
        {selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
            <p className="mb-2"><strong>Name:</strong> {selectedCustomer.name}</p>
            <p className="mb-4"><strong>Company:</strong> {selectedCustomer.company}</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
                onClick={() => setSelectedCustomer(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
                onClick={() => alert("Save logic here")}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  )

}