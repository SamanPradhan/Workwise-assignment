export default function SeatGrid({ seats }) {
    if (!seats || seats.length === 0) {
      return <p>No seat data available.</p>;
    }

    const seatsByRow = seats.reduce((acc, seat) => {
      (acc[seat.row] = acc[seat.row] || []).push(seat);
      return acc;
    }, {});
  
    const sortedRows = Object.keys(seatsByRow)
      .map(r => parseInt(r, 10))
      .sort((a, b) => a - b);
  
    return (
      <div>
        {sortedRows.map((row) => {
          seatsByRow[row].sort((a, b) => a.seatNumber - b.seatNumber);
  
          return (
            <div key={row} style={styles.row}>
              {seatsByRow[row].map((seat) => {
                const seatStyle = {
                  ...styles.seat,
                  backgroundColor: seat.reserved ? '#FFA000' : '#8BC34A'
                };
                return (
                  <div key={seat.id} style={seatStyle}>
                    {seat.id}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  
  const styles = {
    row: {
      marginBottom: '8px',
      display: 'flex',
      flexDirection: 'row'
    },
    seat: {
      width: '35px',
      height: '35px',
      marginRight: '5px',
      textAlign: 'center',
      lineHeight: '35px',
      borderRadius: '4px',
      cursor: 'default',
      color: '#000',
      fontWeight: 'bold'
    }
  };
  