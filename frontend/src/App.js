import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [markedCar, setMarkedCar] = useState(null);
  const [carToAdd, setCarToAdd] = useState({
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
    year: "",
  });
  const [carToUpdate, setCarToUpdate] = useState({
    id: "",
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        "https://car-inventory-server-zuye.onrender.com/cars"
      );
      setCars(response.data);
    } catch (error) {
      console.log("Error fetching cars:", error);
    }
  };

  const addCar = async () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(carToAdd.year);
    const newCar = { ...carToAdd, age };
    await axios.post(
      "https://car-inventory-server-zuye.onrender.com/cars",
      newCar
    );
    fetchCars();
  };

  const deleteCar = async (id) => {
    await axios
      .delete(`https://car-inventory-server-zuye.onrender.com/cars/${id}`)
      .then(() => {
        const filteredCars = cars.filter((car) => car._id !== id);
        setCars(filteredCars);
      })
      .catch((error) => {
        console.log("Error deleting car:", error);
      });
  };

  // Function to mark a car for update (only one at a time)
  const toggleCarMarked = (carId) => {
    // If the same car is clicked again, unmark it
    if (markedCar === carId) {
      setMarkedCar(null);
      setCarToUpdate({
        id: "",
        make: "",
        model: "",
        registrationNumber: "",
        currentOwner: "",
      });
    } else {
      setMarkedCar(carId);
      const selectedCar = cars.find((car) => car._id === carId);
      setCarToUpdate(selectedCar);
    }
  };

  const updateMarkedCar = async () => {
    try {
      if (markedCar) {
        await axios.put(
          `https://car-inventory-server-zuye.onrender.com/cars/${markedCar}`,
          carToUpdate
        );
        setMarkedCar(null);
        setCarToUpdate({
          id: "",
          make: "",
          model: "",
          registrationNumber: "",
          currentOwner: "",
        });
        fetchCars();
      }
    } catch (error) {
      console.log("Error updating car:", error);
    }
  };

  return (
    <div className="container">
      <div className="app-logo">
        <img src="./images/car-inventory-logo.jpg" alt="app-logo" />
      </div>
      <h1>Car Inventory</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCar();
        }}
      >
        <input
          type="text"
          placeholder="Make"
          value={carToAdd.make}
          onChange={(e) => setCarToAdd({ ...carToAdd, make: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          value={carToAdd.model}
          onChange={(e) => setCarToAdd({ ...carToAdd, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={carToAdd.registrationNumber}
          onChange={(e) =>
            setCarToAdd({ ...carToAdd, registrationNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Current Owner"
          value={carToAdd.currentOwner}
          onChange={(e) =>
            setCarToAdd({ ...carToAdd, currentOwner: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Year"
          value={carToAdd.year}
          onChange={(e) => setCarToAdd({ ...carToAdd, year: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Mark</th>
            <th>Make</th>
            <th>Model</th>
            <th>Registration Number</th>
            <th>Current Owner</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>
                <input
                  type="checkbox"
                  checked={markedCar === car._id}
                  onChange={() => toggleCarMarked(car._id)}
                />
              </td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.currentOwner}</td>
              <td>{car.age}</td>
              <td>
                <button onClick={() => deleteCar(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMarkedCar();
        }}
      >
        <h2>Update Marked Car</h2>
        <input
          type="text"
          placeholder="Make"
          value={carToUpdate.make}
          onChange={(e) =>
            setCarToUpdate({ ...carToUpdate, make: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Model"
          value={carToUpdate.model}
          onChange={(e) =>
            setCarToUpdate({ ...carToUpdate, model: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={carToUpdate.registrationNumber}
          onChange={(e) =>
            setCarToUpdate({
              ...carToUpdate,
              registrationNumber: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Current Owner"
          value={carToUpdate.currentOwner}
          onChange={(e) =>
            setCarToUpdate({ ...carToUpdate, currentOwner: e.target.value })
          }
        />
        <button type="submit">Update Marked Car</button>
      </form>
    </div>
  );
}

export default App;
