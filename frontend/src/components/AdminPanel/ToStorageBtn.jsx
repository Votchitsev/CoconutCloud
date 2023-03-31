import React from 'react';
import { useNavigate } from 'react-router-dom';

function ToStorageBtn() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/my-storage/');
  };

  return (
    <button type="button" className="to-storage-btn" onClick={onClickHandler}>to storage</button>
  );
}

export default ToStorageBtn;
