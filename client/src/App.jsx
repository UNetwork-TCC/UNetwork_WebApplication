import { useState } from 'react'
function App() {
    const [count, setCount] = useState(0)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>{count}</div>
            <div onClick={() => setCount(count + 1)} >Counter</div>
        </div>
    )
}

export default App
