import SearchContext from '../contexts/SearchContext';
import { useContext } from 'react';

export const Notification = () => {
  const { notification, setNotification } = useContext(SearchContext);

  const clearNotification = () => {
    setNotification('');
  };
  return notification ? (
    <div className="notification is-info is-light">
      <button onClick={clearNotification} className="delete"></button>
      {notification}
    </div>
  ) : null;
};
