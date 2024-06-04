import React, { useState, useEffect } from 'react';
import '../css/data.css'
import '../css/history.css'
import '../css/datepicker.css'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch, FaSort } from "react-icons/fa";
import { format } from 'date-fns';

const HistoryTable = () => {

    const [actionData, setActionData] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [page, setPage] = useState(1);

    const limit = 10;

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/action/getAllActions?page=${page}&limit=${limit}`);
            setActionData(response.data.actionData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching action data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const calculateOrderNumber = (index) => {
        return (page - 1) * limit + index + 1;
    };

    return (

        <div className='table-area'>
            <table className='history-table'>
                <thead>
                    <tr>
                        <th>
                            <div className='flex justify-center items-center gap-2'>
                                Order
                                {/* <button 
                  className='bg-[#f2f2f2] border-none shadow-none'
                  >
                    <FaSort size={24} className='hover:text-gray-600' />
                  </button> */}
                            </div>
                        </th>
                        <th>
                            Device
                        </th>
                        <th>
                            Action
                        </th>
                        <th><div className='flex justify-center items-center gap-3'>
                            Time
                            <button
                                className='bg-[#f2f2f2] border-none shadow-none'
                            >
                                <FaSort size={24} className='hover:text-gray-600' />
                            </button>
                        </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {actionData && actionData.map((action, index) => (
                        <tr key={index}>
                            <td>{calculateOrderNumber(index)}</td>
                            <td>{action.device}</td>
                            <td>{action.mode}</td>
                            <td>{format(new Date(action.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default HistoryTable;
