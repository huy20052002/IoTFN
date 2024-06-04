/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/data.css';
import { FaSearch, FaSort } from 'react-icons/fa';
import { format } from 'date-fns';
import Pagination from './Pagination';

const Data = (totalSearchRecords, totalSearchPages) => {

    const [sensorData, setSensorData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('temperature');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchData();
    }, [page, searchType, searchKeyword]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/sensor/getAllSensors?page=${page}&limit=${limit}`);
            setSensorData(response.data.sensorData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    const fetchSensorData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/sensor/searchSensors?type=${searchType}&keyword=${searchKeyword}&page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const data = await fetchSensorData();
            if (data && data.totalSearchPages >= 0) {
                setSensorData(data.sensorData);
                setTotalPages(Math.ceil(data.totalSearchPages / limit));
                console.log('total search page:', Math.ceil(data.totalSearchPages / limit))
                setPage(1); 
            } else {
                setSensorData([]);
                setTotalPages(0);
                console.error('Error fetching sensor data:', data);
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        sortSensors();
    }, [page, sortField, sortOrder]);

    const sortSensors = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/sensor/sortSensors?page=${page}&limit=${limit}&field=${sortField}&order=${sortOrder}`);
            setSensorData(response.data.sensorData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error sorting sensor data:', error);
        }
    };
    const handleSort = (field) => {
        
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
           
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const calculateOrderNumber = (index) => {
        return (page - 1) * limit + index + 1;
    };

    const handlePageChange = (pageNumber) => {
        const newPage = pageNumber;
        setPage(newPage);
    };

    return (
        <div className='mt-6'>
            <div className="top-button-area data-page">
                <div className="search-container">
                    <input type="text" className="search-input"
                        placeholder="Search..." value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button className="search-button" id="search-button" onClick={handleSearch}>
                        <FaSearch size={20} />
                    </button>
                </div>
                <select className="filter-area data-filter" id="filter-select" value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="brightness">Light</option>
                </select>
            </div>
            <div className="table-area">
                <table className="sensor-table">
                    <thead>
                        <tr>
                            <th>
                                <div className='flex justify-center items-center gap-2'>
                                    Order
                                </div>
                            </th>
                            <th>
                                <div className='flex justify-center items-center gap-3'>
                                    Temperature
                                    <button
                                        className='bg-[#f2f2f2] border-none shadow-none'
                                        onClick={() => handleSort('temperature')}
                                    >
                                        <FaSort size={24} className={sortField === 'temperature' ?
                                            'text-gray-600' : 'hover:text-gray-600'} />
                                    </button>
                                </div>
                            </th>
                            <th><div className='flex justify-center items-center gap-3'>
                                Humidity
                                <button
                                    className='bg-[#f2f2f2] border-none shadow-none'
                                    onClick={() => handleSort('humidity')}
                                >
                                    <FaSort size={24} className={sortField === 'humidity' ?
                                        'text-gray-600' : 'hover:text-gray-600'} />
                                </button>
                            </div>
                            </th>
                            <th>
                                <div className='flex justify-center items-center gap-3'>
                                    Light
                                    <button
                                        className='bg-[#f2f2f2] border-none shadow-none'
                                        onClick={() => handleSort('brightness')}
                                    >
                                        <FaSort size={24} className={sortField === 'brightness' ?
                                            'text-gray-600' : 'hover:text-gray-600'} />
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className='flex justify-center items-center gap-3'>
                                    Time
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData.map((sensor, index) => (
                            <tr key={index}>
                                <td>{calculateOrderNumber(index)}</td>
                                <td>{sensor.temperature}°C</td>
                                <td>{sensor.humidity}%</td>
                                <td>{sensor.brightness} Lux</td>
                                <td>{format(new Date(sensor.datetime), 'yyyy-MM-dd HH:mm:ss')}</td>
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

export default Data;
