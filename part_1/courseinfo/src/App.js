const Header = ({ course }) => {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App;
