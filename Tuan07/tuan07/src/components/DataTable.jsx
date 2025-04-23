import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";
import "./AdminPage.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import $ from "jquery";
window.jQuery = window.$ = $;

export default function Table() {
  DataTable.use(DT);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSaving, setSaving] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

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
      width: "5%",
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
      },
    },
    { title: "COMPANY", data: "company" },
    { title: "ORDER VALUE", data: "order_value", width: "16%" },
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
      },
    },
    {
      title: "",
      data: null, // vì không lấy từ data source trực tiếp
      width: "10%",
      orderable: false,
      render: function (data, type, row) {
        return `<button class="btn-edit" data-id="${row.customer_id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </button>`;
      },
    },
  ];

  function setBadge(data) {
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

    return <span class={`status-badge ${colorClass} ml-5 w-25`}>{data}</span>;
  }

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
    dom: "rtip",
    paging: true,
    pageLength: 5,
    searching: false,
    info: true,
    pagingType: "simple_numbers", // Sử dụng simple_numbers để hiển thị số trang
    drawCallback: function () {
      const api = this.api();
      const pagination = $(api.table().container()).find(
        ".dataTables_paginate"
      );

      const pageInfo = api.page.info();
      const currentPage = pageInfo.page + 1;
      const totalPages = pageInfo.pages;

      $(".btn-edit")
        .off("click")
        .on("click", function () {
          const id = parseInt($(this).attr("data-id"));
          console.log("Button clicked, id:", id);
          const customer = tableDataRef.current.find(
            (item) => item.customer_id == id
          ); // So sánh chuỗi với chuỗi
          console.log("Customer found:", customer);
          setCustomerInfo(customer);
          setSelectedCustomer(customer);
        });

      // 👉 Gắn lại sự kiện cho checkbox hàng mỗi khi vẽ lại
      $(".row-checkbox")
        .off("change")
        .on("change", function () {
          const id = parseInt($(this).attr("data-id"));
          setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
        });

      // 👉 Cập nhật trạng thái checkbox header (nếu tất cả được chọn)
      const allCheckboxes = $(".row-checkbox");
      const allIds = allCheckboxes
        .map((_, el) => parseInt($(el).attr("data-id")))
        .get();
      const allChecked = allIds.every((id) => selectedRows.includes(id));
      $("#header-checkbox").prop("checked", allChecked);

      // 👇 Tuỳ chỉnh hiển thị phân trang (phần dấu ...)
      const pageButtons = pagination
        .find(".paginate_button")
        .not(".previous, .next");
      pageButtons.each(function () {
        const pageNum = parseInt($(this).text());
        if (!isNaN(pageNum)) {
          if (
            (pageNum > 1 && pageNum < currentPage - 1 && pageNum !== 2) ||
            (pageNum < totalPages &&
              pageNum > currentPage + 1 &&
              pageNum !== totalPages - 1)
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
      if (
        currentPage < totalPages - 2 &&
        !pagination.find(".ellipsis-after").length
      ) {
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
  });

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `https://67c7c860c19eb8753e7ab9c2.mockapi.io/customer/${selectedCustomer.customer_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedCustomer),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setTableData(null);
      fetch("https://67c7c860c19eb8753e7ab9c2.mockapi.io/customer")
        .then((response) => response.json())
        .then((data) => setTableData(data));

      alert("Update successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("There is an error while updating...");
    }
    setSaving(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      {selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSelectedCustomer(null)}
          ></div>
          <div className="bg-white flex flex-col rounded-2xl shadow-xl p-6 w-200 relative z-50">
            <div>
              <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
            </div>
            <div className="info grid grid-cols-2 gap-2 relative border-2 border-gray-300 rounded-lg my-5">
              <span className="absolute  -top-3 left-2 bg-white px-2 text-sm text-gray-600">
                Infomation
              </span>
              <div className="col-span-1">
                <p className="mb-4 mt-3 mx-3">
                  <strong>Name:</strong> {customerInfo.name}
                </p>
                <p className="mb-4 mx-3">
                  <strong>Company:</strong> {customerInfo.company}
                </p>
              </div>
              <div className="col-span-1">
                <p className="mb-4 mt-3 mx-3">
                  <strong>Order value:</strong> {customerInfo.order_value}
                </p>
                <p className="mb-4 mx-3">
                  <strong>Order Date:</strong> {customerInfo.order_date}
                </p>
                <div className="mb-4 mx-3 flex">
                  <p>
                    <strong>Status:</strong>
                  </p>
                  {setBadge(customerInfo.status)}
                </div>
              </div>
            </div>

            <div className="info grid grid-cols-2 gap-2 relative border-2 border-gray-300 rounded-lg mt-2 mb-5">
              <span className="absolute -top-3 left-2 bg-white px-2 text-sm text-gray-600">
                Edit form
              </span>
              <div className="col-span-1 my-5 mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  value={selectedCustomer.company}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      company: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="col-span-1 my-5 mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Order Value
                </label>
                <input
                  type="number"
                  value={selectedCustomer.order_value}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      order_value: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Order Date
                </label>
                <input
                  type="date"
                  value={selectedCustomer.order_date.split(" ")[0]} // lấy ngày
                  onChange={(e) => {
                    const date = e.target.value; // yyyy-mm-dd
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, "0");
                    const minutes = String(now.getMinutes()).padStart(2, "0");
                    const seconds = String(now.getSeconds()).padStart(2, "0");
                    const time = `${hours}:${minutes}:${seconds}`;

                    setSelectedCustomer({
                      ...selectedCustomer,
                      order_date: `${date} ${time}`, // yyyy-mm-dd HH:mm:ss
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={selectedCustomer.status}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      status: e.target.value,
                    })
                  }
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
                className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
                onClick={() => setSelectedCustomer(null)}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg ${
                  isSaving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <DataTable
        data={tableData}
        columns={columns}
        options={tableOptions}
      ></DataTable>
    </>
  );
}
