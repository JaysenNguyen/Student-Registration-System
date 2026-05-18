import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [homeHovered, setHomeHovered] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 2rem',
      backgroundColor: '#e70d0dff',
      color: '#fff',
      gap: '1.5rem',
    }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginRight: 'auto' }}>
        CS Registration System
      </span>
      <button
        onClick={() => navigate('/')}
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
        style={{
          background: 'none',
          border: '1px solid #fff',
          color: '#fff',
          padding: '0.4rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.95rem',
          boxShadow: homeHovered ? '0 4px 12px rgba(12, 12, 12, 0.4)' : 'none',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        Home
      </button>
    </nav>
  );
}

export default NavBar;
