import React, { useEffect } from 'react';
import './Alert.css';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Alert = (props) => {
  const { alertContent, alertClass, onCloseAlert } = props;
  
// alert timer functionality
  useEffect(() => {
    const interval = setTimeout(() => {
      onCloseAlert();
    }, 3000)

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <div className={`alert ${alertClass}`}>
      <FaExclamationCircle size={16} className="icon-x" />
      <span className='msg'>{alertContent}</span>
      <div className="close-btn" onClick={onCloseAlert}>
        <FaTimes size={19} className='icon-x' />
      </div>
    </div>
  )
}

export default Alert