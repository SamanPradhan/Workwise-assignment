import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import SeatGrid from '../components/SeatGrid';

export default function Home() {
  const [seats, setSeats] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [numSeats, setNumSeats] = useState('');
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetchSeats();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchSeats = async () => {
    try {
      setMessage('');
      const response = await axios.get(`${BASE_URL}/api/seats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSeats(response.data.seats);
      setAvailableCount(response.data.availableCount);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error fetching seats.');
    }
  };

  const handleBook = async () => {
    if (!numSeats) return;
    try {
      setMessage('');
      const response = await axios.post(
        `${BASE_URL}/api/reservation/reserve`,
        { numSeats: parseInt(numSeats, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message || 'Seats booked successfully!');
      setNumSeats('');
      fetchSeats();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error booking seats.');
    }
  };

  const bookedCount = seats.filter(s => s.reserved).length;

  // Merge responsive adjustments into styles
  const flexRowStyle = {
    ...styles.flexRow,
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'center' : 'flex-start',
    gap: isMobile ? '20px' : '50px'
  };

  return (
    <div style={styles.container}>
      <h1>Ticket Booking</h1>
      <div style={flexRowStyle}>
        <div style={styles.leftPanel}>
          <SeatGrid seats={seats} />
          <div style={styles.infoBar}>
            <p>Booked Seats = {bookedCount}</p>
            <p>Available Seats = {availableCount}</p>
          </div>
        </div>
        <div style={styles.rightPanel}>
          <div>
            <label>Book Seats</label>
            <input
              type="number"
              placeholder="1 - 7"
              value={numSeats}
              onChange={(e) => setNumSeats(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleBook} style={styles.button}>Book</button>
          </div>
          {message && <p style={{ marginTop: '10px', color:'red' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px'
  },
  flexRow: {
    display: 'flex'
    // flexDirection and gap will be adjusted for responsiveness
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  infoBar: {
    marginTop: '20px',
    textAlign: 'center'
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '8px'
  },
  button: {
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '10px'
  }
};
