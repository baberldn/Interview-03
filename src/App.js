import axios from "axios";
import { useState } from "react";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activities, setActivities] = useState([]); 
  const [expandedItem, setExpandedItem] = useState(null); 

  const fetchActivity = async () => {
    try {
      const response = await axios.get("https://bored.api.lewagon.com/api/activity/");
      const newActivity = response.data;
      setActivities((prevActivities) => [...prevActivities, newActivity]);
    } catch (error) {
      console.error("Error fetching activity", error);
    }
  };

  const toggleDetails = (index) => {
    setExpandedItem((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Activity Generator</h1>
      <button
        onClick={fetchActivity}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Generate Activity
      </button>

      <ul>
        {activities.map((activity, index) => (
          <ExpandableListItem
            key={index} 
            item={activity}
            isExpanded={expandedItem === index} 
            onToggle={() => toggleDetails(index)}
          />
        ))}
      </ul>
    </div>
  );
};

const ExpandableListItem = ({ item, isExpanded, onToggle }) => {
  return (
    <li className="mb-2 border p-2 rounded">
      <div className="flex justify-between items-center">
        <span>{item.activity}</span>
        <button onClick={onToggle} className="text-blue-500 underline">
          {isExpanded ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2">
          <p>Type: {item.type}</p>
          <p>Participants: {item.participants}</p>
          <p>Price: {item.price}</p>
          {item.link && (
            <p>
              Link: <a href={item.link}>{item.link}</a>
            </p>
          )}
          <p>Accessibility: {item.accessibility}</p>
        </div>
      )}
    </li>
  );
};

export default App;
