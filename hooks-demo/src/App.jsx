import React, { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log('点击次数: ' + count);
    }, 3000);
  }

  return (
    <div className='App'>
      <button onClick={() => setCount(count + 1)}>点击{count}次</button>
      <button onClick={handleClick}>展示点击次数</button>
    </div>
  )
} 

export default App;