import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { FaBook } from 'react-icons/fa6'
import { ResponsiveContainer } from 'recharts'
import { generateMockData, RechartsDevtools } from '@recharts/devtools';
import { Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = generateMockData(6, 823);
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap'>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4  p-9 mx-6'>
          <div className='grid md:grid-cols-3 gap-9'>
            <div className='col-span-1 bg-blue-800 rounded-lg flex p-3 gap-4 items-center text-white py-6'>
              <FaBook className='text-white text-4xl' />
              <div>
                <h3 className='text-sm text-gray-300'>Total number of Books</h3>
                <h1 className='text-2xl font-bold'>100 +</h1>
              </div>
            </div>
            <div className='col-span-1 bg-green-600 rounded-lg flex p-3 gap-4 items-center text-white py-6'>
              <FaBook className='text-white text-4xl' />
              <div>
                <h3 className='text-sm text-gray-300'>Total number of Users</h3>
                <h1 className='text-2xl font-bold'>100 +</h1>
              </div>
            </div>
            <div className='col-span-1 bg-yellow-600 rounded-lg flex p-3 gap-4 items-center text-white py-6'>
              <FaBook className='text-white text-4xl' />
              <div>
                <h3 className='text-sm text-gray-300'>Total number of Employee</h3>
                <h1 className='text-2xl font-bold'>100 +</h1>
              </div>
            </div>
          </div>
          {/* grid chart title */}
          <div className='md:grid grid-cols-2 gap-2 mt-7 h-full w-full'>
            <div>
              Book Purchase Ratio
              
            </div>
            <div>
              Growth Ratio(Yearly)
              
            </div>

          </div>
          {/* grid chart*/}
          <div className='md:grid grid-cols-2 gap-2 mt-7 h-full w-full'>
            <div>
              <h1></h1>
              {/* Book Purchase Ratio chart*/}
              <ResponsiveContainer width={'100%'} height={'300'}>
                <BarChart
                  
                  responsive
                  data={data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="label" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar fill='#FFDB58' dataKey="x" radius={[10, 10, 0, 0]} />
                  <Bar fill='#303AB2' dataKey="y" radius={[10, 10, 0, 0]} />
                  <RechartsDevtools />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h1>Growth Ratio(Yearly)</h1>
              {/* Growth Ratio(Yearly) chart */}
              <ResponsiveContainer width={'100%'} height={'300'}>
                <PieChart responsive>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                    stroke="white"
                    
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    stroke="white"
                    label
                    
                  />
                  <Tooltip/>
                  <RechartsDevtools />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
