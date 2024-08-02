import  { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Helper function to fetch schedule data by date
const fetchScheduleData = async (date) => {
  const formattedDate = date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  const response = await fetch(`http://localhost:3001/api/milk-production/date/${formattedDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const CalendarWithSchedules = () => {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchScheduleData(date);
        setSchedules(data);

        const totalMilk = data.reduce((sum, entry) => sum + entry.milkProductionKilos, 0);
        setTotal(totalMilk);

        const avgMilk = data.length > 0 ? totalMilk / data.length : 0;
        setAverage(avgMilk);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div className="flex flex-col items-center">
      <Calendar
        onChange={setDate}
        value={date}
      />
      <h2 className="text-xl font-bold mt-4">Schedules for {date.toDateString()}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {schedules.length === 0 ? (
        <p>No schedules found</p>
      ) : (
        <ul className="w-full max-w-md">
          {schedules.map((item) => (
            <li key={item._id} className="border p-4 mb-2 rounded">
              <p>Time: {new Date(item.Timestamp).toLocaleTimeString()}</p>
              <p>Milk Production: {item.milkProductionKilos} Kilos</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <p>Total Milk Production: {total.toFixed(2)} Kilos</p>
        <p>Average Milk Production: {average.toFixed(2)} Kilos</p>
      </div>
    </div>
  );
};

export default CalendarWithSchedules;
