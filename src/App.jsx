import React, { useState, useEffect, useCallback } from 'react';
import Spinner from './components/Spinner';
import './App.css';

const spaceXDataAPI = 'https://api.spacexdata.com/v3/launches'

// console.log(spaceXDataAPI, 'spaceXDataAPI');

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleLaunches, setVisibleLaunches] = useState({});

  const fetchLaunches = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${spaceXDataAPI}?limit=10&page=${page}`);
      const data = await response.json();
    
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLaunches((prevLaunches) => {
          return prevLaunches.concat(data);
        });
      }
    } catch (error) {
      console.error('Error fetching SpaceX launches:', error);
    } finally {
      setLoading(false);
    }    
  }, [page]);

  useEffect(() => {
    fetchLaunches()
  }, [fetchLaunches, page])

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  };

  const toggleDescription = (flightNumber) => {
    setVisibleLaunches((prevState) => {
      const updatedState = Object.assign({}, prevState)
      updatedState[flightNumber] = !updatedState[flightNumber]
      return updatedState
    });
  };

  const filteredLaunches = launches.filter((launch) =>
    // console.log(filteredLaunches, 'filteredLaunches');
    
    launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <input type="search" placeholder="Search by mission name" value={searchTerm} onChange={handleSearch}className="search"/>

        <div className="launch__wrapper" onScroll={handleScroll}>
          {filteredLaunches.length === 0 && !loading ? (
            <p className="no-content"></p>
          ) : (
            <div className="launch__list">
              {filteredLaunches.map((launch) => (
                <div className="launch__item" key={launch.flight_number}>
                  <h3>{launch.mission_name}</h3>
                  {visibleLaunches[launch.flight_number] && <p>{launch.details}</p>}

                  {/*if status is = success, failed or null for upcoming*/}
                  <div className={`launch__status launch__status--${launch.launch_success === null ? 'upcoming' : launch.launch_success ? 'success' : 'failed'}`}>
                    {launch.launch_success === null ? 'Upcoming' : launch.launch_success ? 'Success' : 'Failed'}
                  </div>
                  <button className="view-button" onClick={() => toggleDescription(launch.flight_number)}>
                    {visibleLaunches[launch.flight_number] ? 'Hide' : 'View'}
                  </button>
                </div>
              ))}
            </div>
          )}
          {loading && <Spinner />}
          {!hasMore && !loading && <p className="max-reached">no more data fetched to load.</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
