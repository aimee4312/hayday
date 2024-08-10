import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [resources, setResources] = useState([]);
  const [bakeryItem, setBakeryItem] = useState([]);
  const [itemCounts, setItemCounts] = useState([]);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await axios.get('http://localhost:5001/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources: ', error);
      }
    }
    async function fetchBakery() {
      try {
        const response = await axios.get('http://localhost:5001/api/bakery');
        setBakeryItem(response.data);
      } catch (error) {
        console.error('Error fetching bakery: ', error);
      }
    }
    fetchResources();
    fetchBakery();
  }, []);

  const handleItemClick = (itemName) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: (prevCounts[itemName] || 0) + 1
    }));
  };

  return (
    <div className="container">
      <div className="left">
        {resources.map(resource => (
          <img
            key={resource.name}
            className="button"
            src={`/goods/crops/${resource.image}`}
            onClick={() => handleItemClick(resource.name)}
            alt={resource.name}
          />
        ))}
        {bakeryItem.map(bakery => (
          <img
            key={bakery.name}
            className="button"
            src={`/goods/bakery/${bakery.image}`}
            onClick={() => handleItemClick(bakery.name)}
            alt={bakery.name}
          />
        ))}
      </div>
      <div className="right">
      <h2>Item Count</h2>
        <ul>
          {Object.entries(itemCounts).map(([itemName, count]) => (
            <li key={itemName}>
              {itemName}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function addResource() {
  console.log("resource added!\n")
}

function addBakery() {
  console.log("bakery item added!\n")
}

function addFeed() {
  console.log("feed added!\n")
}

export default App;
