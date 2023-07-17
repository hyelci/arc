import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getAccesToken, getEventsData } from "./features/events/eventsSlice";
import SingleEvent from "./app/components/SingleEvent";

const monthsOptions = [
  { key: 1, text: "January" },
  { key: 2, text: "February" },
  { key: 3, text: "March" },
  { key: 4, text: "April" },
  { key: 5, text: "May" },
  { key: 6, text: "June" },
  { key: 7, text: "July" },
  { key: 8, text: "August" },
  { key: 9, text: "September" },
  { key: 10, text: "October" },
  { key: 11, text: "November" },
  { key: 12, text: "December" },
];

function App() {
  const [month, setMonth] = useState<number>(7);
  const { accessToken, eventList, isLoading } = useAppSelector(
    (store) => store.events
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccesToken());
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getEventsData(month));
    }
  }, [accessToken]);

  const handleMonthsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = e.target.selectedIndex + 1;
    setMonth(newIndex);
    dispatch(getEventsData(newIndex));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Events</h1>
      <select
        name="month"
        id="month"
        value={month}
        defaultValue={month}
        onChange={handleMonthsChange}
      >
        {monthsOptions.map((item) => (
          <option key={item.key} value={item.key}>
            {item.text}
          </option>
        ))}
      </select>

      <div>
        {eventList.map((event) => {
          return <SingleEvent key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
}

export default App;
