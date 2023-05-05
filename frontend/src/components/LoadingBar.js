import { useState, useEffect } from 'react';
import './LoadingBar.css';

function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add any necessary logic to determine when to show the loading bar
    // For example, you could use a global state to track the loading state of your app
    // or you could listen for the "load" and "unload" events on the window object
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // simulate a 5 second loading time
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>
      )}
    </>
  );
}

export default LoadingBar;
