import { useState, useCallback } from 'react'
import Select from './components/Select';
import { OptionType } from './types'; 

import './App.css'

function App() {
  const [month, setMonthValue] = useState<OptionType | null>(null);
  const handleSelect = useCallback((value: OptionType) => {
    setMonthValue(value);
  }, []);

  return (
    <main>
      <Select
        selected={month}
        onChange={handleSelect}
      />
    </main>
  )
}

export default App
