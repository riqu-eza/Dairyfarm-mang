import  { useState, useEffect } from 'react';
import moment from 'moment';
import { format, parseISO,  } from 'date-fns';

// Helper function to group data by schedule
const groupBySchedule = (data) => {
  const schedules = {};
  data.forEach(item => {
    const time = moment(item.Timestamp).format('YYYY-MM-DD HH:00'); // Group by hour
    if (!schedules[time]) {
      schedules[time] = { total: 0, count: 0 };
    }
    schedules[time].total += item.milkProductionKilos;
    schedules[time].count += 1;
  });
  return schedules;
};

// Helper function to format time
const formatTime = (date) => format(parseISO(date), 'HH:mm');

// Main Component
const MilkProductionSchedule = () => {
  const [productions, setProductions] = useState([]);
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    // Fetch data from the backend
    const fetchProductions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/milk-production/getProduction');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProductions(data);
        const groupedData = groupBySchedule(data);
        setScheduleData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductions();
  }, []);

  const calculateTotalsAndAverages = () => {
    let total = 0;
    let count = 0;
    Object.keys(scheduleData).forEach(key => {
      total += scheduleData[key].total;
      count += scheduleData[key].count;
    });
    return {
      total,
      average: count === 0 ? 0 : total / count,
    };
  };

  const { total, average } = calculateTotalsAndAverages();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Milk Production Schedule</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Schedule</th>
            <th className="py-2 px-4 border-b">Total Milk (Kilos)</th>
            <th className="py-2 px-4 border-b">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scheduleData).map((key) => (
            <tr key={key}>
              <td className="py-2 px-4 border-b">{formatTime(key)}</td>
              <td className="py-2 px-4 border-b">{scheduleData[key].total.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{scheduleData[key].count}</td>
            </tr>
          ))}
          <tr>
            <td className="py-2 px-4 border-b font-bold">Total</td>
            <td className="py-2 px-4 border-b font-bold">{total.toFixed(2)}</td>
            <td className="py-2 px-4 border-b font-bold">{productions.length}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Average per Entry</td>
            <td className="py-2 px-4 border-b font-bold">{average.toFixed(2)}</td>
            <td className="py-2 px-4 border-b"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MilkProductionSchedule;
