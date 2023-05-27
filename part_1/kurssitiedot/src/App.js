const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.exTtlAmount}
      </p>
    </div>
  )
}

const Part = (props) => {
  const paragraph = { part: props.part, exercises: props.exercises }

  return (
    <p>
      {paragraph.part} {paragraph.exercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'

  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  const exTtlAmount = exercises1 + exercises2 + exercises3

  return (
    <>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exTtlAmount={exTtlAmount} />
    </>
  )
}

export default App;
