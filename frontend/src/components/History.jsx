/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../css/data.css';
import '../css/history.css';
import '../css/datepicker.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from "react-icons/fa";
import { format } from 'date-fns';
import Pagination from './Pagination';

const History = () => {
  
  const [actionData, setActionData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('device');
  const [selectedDate, setSelectedDate] = useState(null);

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
  }, [page, searchKeyword]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/action/searchActions?option=${searchOption}&keyword=${searchKeyword}&page=${page}&limit=${limit}`);
      setActionData(response.data.actionData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchActionByDate();
    } else {
      fetchData();
    }
  }, [selectedDate, page]);

  const fetchActionByDate = async () => {
    if (!selectedDate) return;

    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await axios.get(`http://localhost:4000/action/searchActionByDate`, {
        params: { date: formattedDate, page: page, limit }
      });
      setActionData(response.data.actionData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching action data by date:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPage(1);
  };

  const calculateOrderNumber = (index) => {
    return (page - 1) * limit + index + 1;
  };

  return (
    <div className='mt-6'>
      <div className="top-button-area history-page">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          isClearable={true}
        />
        <div className="search-container">
          <input type="text"
            className="search-input"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} />
          <button className="top-button" id="search-button" onClick={handleSearch}>
            <FaSearch size={20} />
          </button>
          <select
            className="filter-area"
            id="filter-select"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="device">Device</option>
            <option value="action">Action</option>
          </select>
        </div>
      </div>
      <div className='table-area'>
        <table className='history-table'>
          <thead>
            <tr>
              <th>
                <div className='flex justify-center items-center gap-2'>
                  Order
                </div>
              </th>
              <th>
                Device
              </th>
              <th>
                Action
              </th>
              <th><div className='flex justify-center items-center '>
                Time
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

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default History;







// import React, { useState, useEffect } from 'react';
// import '../css/data.css'
// import '../css/history.css'
// import '../css/datepicker.css'
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { FaSearch, FaSort } from "react-icons/fa";
// import { format } from 'date-fns';
// import Pagination from './Pagination';

// const History = () => {

//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [searchOption, setSearchOption] = useState('device');
//   const [searching, setSearching] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [actionData, setActionData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/action/getAllActions?page=${page}&limit=${limit}`);
//       setActionData(response.data.actionData);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching action data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, searchOption, searchKeyword]);

//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/action/searchActions?option=${searchOption}&keyword=${searchKeyword}&page=${page}&limit=${limit}`);
//       setActionData(response.data.actionData);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching search data:', error);
//     }
//   };

//   useEffect(() => {
//     if (searching && actionData.length > 0) {
//       setSearching(false);
//     }
//   }, [actionData, searching]);

//   useEffect(() => {
//     fetchActionByDate();
//   }, [selectedDate, page]);

//   const fetchActionByDate = async () => {
//     try {
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       const response = await axios.get(`http://localhost:4000/action/searchActionByDate`, {
//         params: { date: formattedDate, page: page, limit }
//       });
//       setActionData(response.data.actionData);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching action data by date:', error);
//     }
//   };

//   const handleDateChange = (date) => {
//     const previousDate = selectedDate;
//     setSelectedDate(date);
//     if (!previousDate || date.getFullYear() !== previousDate.getFullYear() || date.getMonth() !== previousDate.getMonth() || date.getDate() !== previousDate.getDate()) {
//       fetchData();
//       setPage(1);
      
//     }
//   };

//   const calculateOrderNumber = (index) => {
//     return (page - 1) * limit + index + 1;
//   };

//   return (
//     <div className='mt-6'>
//       <div className="top-button-area history-page">
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="yyyy-MM-dd"
//           placeholderText="Select a date"
//           isClearable={true}
//           onSelect={fetchActionByDate}
//         />
//         <div className="search-container">
//           <input type="text"
//             className="search-input"
//             placeholder="Search..."
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)} />
//           <button className="top-button" id="search-button" onClick={handleSearch}>
//             <FaSearch size={20} />
//           </button>
//           <select
//             className="filter-area"
//             id="filter-select"
//             value={searchOption}
//             onChange={(e) => setSearchOption(e.target.value)}
//           >
//             <option value="device">Device</option>
//             <option value="action">Action</option>
//           </select>
//         </div>
//       </div>
//       <div className='table-area'>
//         <table className='history-table'>
//           <thead>
//             <tr>
//               <th>
//                 <div className='flex justify-center items-center gap-2'>
//                   Order
//                   {/* <button 
//                   className='bg-[#f2f2f2] border-none shadow-none'
//                   >
//                     <FaSort size={24} className='hover:text-gray-600' />
//                   </button> */}
//                 </div>
//               </th>
//               <th>
//                 Device
//               </th>
//               <th>
//                 Action
//               </th>
//               <th><div className='flex justify-center items-center '>
//                 Time
//               </div>
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {actionData && actionData.map((action, index) => (
//               <tr key={index}>
//                 <td>{calculateOrderNumber(index)}</td>
//                 <td>{action.device}</td>
//                 <td>{action.mode}</td>
//                 <td>{format(new Date(action.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* <ul className="pagination">
//         <li>
//           <button
//             className="table-navigate-button"
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page === 1}
//           >
//             Previous
//           </button>
//         </li>
//         {[...Array(totalPages).keys()].map((pageNumber) => (
//           <li key={pageNumber}>
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               key={pageNumber}
//               className={page === pageNumber + 1 ? 'active-page' : 'page-number'}
//             >
//               {pageNumber + 1}
//             </button>
//           </li>
//         ))}
//         <li>
//           <button
//             className="table-navigate-button"
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === totalPages}
//           >
//             Next
//           </button>
//         </li>
//       </ul> */}

//       <Pagination
//         totalPages={totalPages}
//         currentPage={page}
//         onPageChange={handlePageChange}
//       />

//     </div>
//   );
// };

// export default History;
