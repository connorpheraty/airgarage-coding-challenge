import "./App.css";
import { useState } from "react";
import axios from "axios";
import ParkingLotContainer from "./components/ParkingLotContainer";

function App() {
  const [location, setLocation] = useState("");
  const [parkingLots, setParkingLots] = useState([]);

  const yelpFormula = (rating, reviewCount) => {
    const adjustedScore = (reviewCount * rating) / (reviewCount + 1);
    return adjustedScore.toFixed(2);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Submitted ${location}`);

    let header = {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_YELP_API_KEY,
      },
    };

    axios
      .get(
        `v3/businesses/search?term=parking lot&location=${location}}`,
        header
      )
      .then((response) => {
        let parkingLots = response.data.businesses;

        for (let i = 0; i < parkingLots.length; i++) {
          if (parkingLots[i].image_url === "") {
            parkingLots.splice(i, 1);
          }
        }
        for (let i = 0; i < parkingLots.length; i++) {
          const rating = parkingLots[i].rating;
          const reviewCount = parkingLots[i].review_count;
          const adjustedScore = yelpFormula(rating, reviewCount);
          parkingLots[i]["adjusted_score"] = parseFloat(adjustedScore, 10);
        }
        parkingLots.sort((a, b) =>
          a.adjusted_score > b.adjusted_score ? 1 : -1
        );

        setParkingLots(parkingLots);
      })
      .catch();
  };

  return (
    <div>
      <h1 className="text-center text-green-500 uppercase text-6xl font-bold py-5">
        Airgarge Challenge 🚘
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="2xl:mx-96 xl:mx-56 lg: md:mx-36 sm:mx-20 mx-3 mt-3">
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md lg:pl-10 sm:pl-5 pl-3 sm:text-sm border-gray-300"
                placeholder="New York, Los Angeles, Chicago..."
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {parkingLots.map((parkingLot, index) => (
          <ParkingLotContainer props={parkingLot} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
