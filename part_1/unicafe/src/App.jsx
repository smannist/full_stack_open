import React from 'react'
import { useState } from 'react'
import Button from './components/button'
import Statistics from './components/statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedback = () => setGood(good + 1)
  const setNeutralFeedback = () => setNeutral(neutral + 1)
  const setBadFeedback = () => setBad(bad + 1)

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

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
        handleClick={setNeutralFeedback}
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
        valueText1="Good" value1={good}
        valueText2="Neutral" value2={neutral}
        valueText3="Bad" value3={bad}
        valueText4="Total" total={total}
        valueText5="Average" average={average}
        valueText6="Positive" positive={positivePercentage} suffix={"%"}
      />

    </div>
  )
}

export default App;
