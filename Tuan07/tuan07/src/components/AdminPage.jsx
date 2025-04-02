import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { useState } from 'react';

DataTable.use(DT);

export default function AdminPage(){
    const [tableData, setTableData] = useState([
        ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011-04-25', '$320,800'],
        ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011-07-25', '$170,750'],
        ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009-01-12', '$86,000'],
        ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012-03-29', '$433,060'],
    ]);
    return (
        <>
            <div className="m-auto w-11/12 border-2 border-blue-500 grid grid-cols-4 gap-1">
                <div className="border-2 border-blue-400 col-span-1">
                    <div>
                        {/* <img src="" alt="" /> */}
                        <h1>LOGO</h1>
                    </div>
                    <div id="navBtn">
                        <ul>
                            <li>
                                <button type="button" className="border-2 border-pink-500 rounded-lg w-35 text-start">Dashboard</button>
                            </li>
                            <li>
                                <button type="button"className="border-2 border-pink-500 rounded-lg w-35 text-start">Project</button>
                            </li>
                            <li>
                                <button type="button"className="border-2 border-pink-500 rounded-lg w-35 text-start">Teams</button>
                            </li>
                            <li>
                                <button type="button"className="border-2 border-pink-500 rounded-lg w-35 text-start">Analytics</button>
                            </li>
                            <li>
                                <button type="button"className="border-2 border-pink-500 rounded-lg w-35 text-start">Messages</button>
                            </li>
                            <li>
                                <button type="button"className="border-2 border-pink-500 rounded-lg w-35 text-start">Integrations</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {/* <img src="" alt="" /> */}
                        <button>Try now</button>
                    </div>
                </div>
                <div className="border-2 border-blue-400 col-span-3 ml-2 mr-2">
                    <div className="border-2 border-blue-400">
                        Header
                    </div>
                    <div>
                        <h3 className="text-start mt-4">Overview</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        <div className="bg-pink-200">
                            <div className="grid grid-cols-3">
                                <span className="col-span-2">Turnover</span>
                                <button className="col-span-1">Shop</button>
                            </div>
                            <div>
                                <h2>$92,405</h2>
                            </div>
                            <div>
                            <span>Priod of Charge</span>
                            </div>
                        </div>
                        <div className="bg-blue-200">
                            <div className="grid grid-cols-3">
                                <span className="col-span-2">Profit</span>
                                <button className="col-span-1">Money</button>
                            </div>
                            <div>
                                <h2>$32,218</h2>
                            </div>
                            <div>
                                <span>Priod of Charge</span>
                            </div>
                        </div>
                        <div className="bg-cyan-200">
                            <div className="grid grid-cols-3">
                                <span className="col-span-2">New customer</span>
                                <button className="col-span-1">User</button>
                            </div>
                            <div>
                                <h2>298</h2>
                            </div>
                            <div>
                            <span>Priod of Charge</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3>
                            Detailed report
                        </h3>
                    </div>
                    <DataTable data={tableData} className="display">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Extn.</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                    </DataTable>
                </div>

            </div>
        </>
    )
}