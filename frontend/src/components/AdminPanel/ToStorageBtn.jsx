import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ToStorageBtn({ userId }) {
  return (
    <Link
      to={{
        pathname: '/my-storage',
      }}
      state={{
        userId,
      }}
      className="to-storage-btn"
    >
      to storage

    </Link>
  );
}

ToStorageBtn.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ToStorageBtn;
