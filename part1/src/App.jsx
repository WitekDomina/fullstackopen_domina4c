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


  const Header = (props) =>{  
    console.log(props)
    return(<h1>{course.name}</h1>)
  }

  const Content = (props) =>{
    console.log(props)
     return( 
     <div>
       <Part partName={course.parts[0].name} exercises={course.parts[0].exercises}/>
       <Part partName={course.parts[1].name} exercises={course.parts[1].exercises}/>
       <Part partName={course.parts[2].name} exercises={course.parts[2].exercises}/>
    </div>)
  }

  const Part = (props) =>{
    console.log(props)
    return(
      <p>
        {props.partName} {props.exercises}
      </p>
    )
  }

  const Total = (props) =>{
    console.log(props)
    return(<p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>)
  }
  return (
    <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>  
    </div>
  )
}

export default App