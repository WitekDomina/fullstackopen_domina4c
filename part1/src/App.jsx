const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  const Header = (props) =>{
    return(<h1>{props.course}</h1>)
  }

  const Content = (props) =>{
     return( <>
     <div>
       <Part partName={part1} exercises={exercises1}/>
       <Part partName={part2} exercises={exercises2}/>
       <Part partName={part3} exercises={exercises3}/>
    </div></>)
  }

  const Part = (props) =>{
    return(
      <p>
        {props.partName} {props.exercises}
      </p>
    )
  }

  const Total = (props) =>{
    return(<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>)
  }
  return (
    <div>
        <Header course={course}/>
        <Content exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
        <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>  
    </div>
  )
}

export default App