// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../components/Header'
import Sensor from '../components/sensor'
import Dashboard from '../components/Dashboard'

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className='dashboard-container'>
        <Sensor />
        <Dashboard />
      </div>
    </>
  )
}

export default DashboardPage
