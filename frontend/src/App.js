import { useEffect, useState } from 'react';
import LeaveTracker from './LeaveTracker';

function App() {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    fetch('http://localhost:5000/hello')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Could not connect to backend'));
  }, []);
  return (
    <div>
      <LeaveTracker />
    </div>
  );
}

export default App;