import React, { useState, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReviewsContext from './reviews-context';
import HotelContext from '../../../../context/hotel-context';

import getFilteredReviews from '../../../../helpers/filteredReviews';
import crudReducer from '../../../../helpers/crudReducer';

const ReviewsState = ({ children }) => {
  const { setReviews, hotelId, setLoading } = useContext(HotelContext);

  const [selectedRatings, dispatchRatings] = useReducer(crudReducer, []);
  const [selectedTimes, dispatchTimes] = useReducer(crudReducer, []);
  const [selectedTypes, dispatchTypes] = useReducer(crudReducer, []);
  const [selectedLanguage, setLanguage] = useState('English');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMention, setSelectedMention] = useState('All reviews');

  useEffect(() => {
    if (hotelId) {
      fetch(`/api/hotels/${hotelId}/reviews/general`)
        .then(res => res.json())
        .then(data => {
          setReviews(data);
          setLoading(false);
        });
    }
  }, [hotelId]);

  const contextData = {
    selectedRatings,
    selectedTimes,
    selectedTypes,
    selectedLanguage,
    searchTerm,
    dispatchRatings,
    dispatchTimes,
    dispatchTypes,
    selectedMention,
    setSelectedMention,
    setLanguage,
    setSearchTerm,
    getFilteredReviews,
  };

  return (
    <ReviewsContext.Provider value={contextData}>
      {children}
    </ReviewsContext.Provider>
  );
};

ReviewsState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReviewsState;
