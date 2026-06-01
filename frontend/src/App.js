import { useEffect, useState } from 'react';
function App() {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    fetch('http://localhost:5000/hello')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Could not connect to backend'));
  }, []);
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My First App</h1>
      <p>Message from backend: <strong>{message}</strong></p>
    </div>
  );
}
export default App;