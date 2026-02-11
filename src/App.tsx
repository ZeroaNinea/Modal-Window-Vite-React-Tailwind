import { useState } from 'react';

import RainbowButton from './components/rainbow-button';
import Modal from './components/modal';

import './App.css';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <RainbowButton onClick={() => setOpen(true)}>
        Open Rainbow Modal
      </RainbowButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Hello 🌈</h2>
        <p>This is your animated modal.</p>
      </Modal>
    </div>
  );
}

export default App;
