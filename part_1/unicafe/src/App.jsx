import React from 'react'
import { useState } from 'react'
import Button from './components/button'
import Statistics from './components/statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedback = () => setGood(good + 1)
  const setNeturalFeedback = () => setNeutral(neutral + 1)
  const setBadFeedback = () => setBad(bad + 1)

  return (
    <div>

      <h2>
        At Unicafe, your feedback is valuable to us! Submit your feedback below:
      </h2>

      <Button
        handleClick={setGoodFeedback}
        text="good :)"
      />
      <Button
        handleClick={setNeturalFeedback}
        text="neutral :I"
      />
      <Button
        handleClick={setBadFeedback}
        text="bad :("
      />

      <h2>
        Statistics:
      </h2>

      <Statistics
        valueText1="good" value1={good}
        valueText2="neutral" value2={neutral}
        valueText3="bad" value3={bad}
      />

    </div>
  )
}

export default App;
