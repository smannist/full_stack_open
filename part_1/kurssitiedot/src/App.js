const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.map((part) => part.exercises).reduce((sum, exercises) => sum + exercises)

  return (
    <div>
      <p>
        Number of exercises: {totalExercises}
      </p>
    </div>
  );

};

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

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App;
