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


  const Header = (props) =>{  
    console.log(props)
    return(<h1>{props.course}</h1>)
  }

  const Content = (props) =>{
    console.log(props)
     return( 
     <div>
       <Part partName={parts[0].name} exercises={parts[0].exercises}/>
       <Part partName={parts[1].name} exercises={parts[1].exercises}/>
       <Part partName={parts[2].name} exercises={parts[2].exercises}/>
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
    return(<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>)
  }
  return (
    <div>
        <Header course={course}/>
        <Content parts={parts}/>
        <Total parts={parts}/>  
    </div>
  )
}

export default App