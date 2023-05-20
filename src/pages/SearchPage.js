import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      axios
        .get(`http://localhost:5000/api/v1/search?q=${searchTerm}`)
        .then((response) => {
          history.push({
            pathname: '/search',
            search: `?q=${searchTerm}`,
            state: { products: response.data },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default withRouter(SearchBar);
