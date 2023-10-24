import projectData from "../projectData";



const progressData = {
    labels: projectData.goals.map(goal => goal.goal_title),
    datasets: [
      {
        label: 'Progress',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: projectData.goals.map(goal => {
          const completedTasks = goal.tasks.filter(task => task.completed);
          return (completedTasks.length / goal.tasks.length) * 100;
        })
      }
    ]
  };




  function projectProgress() {
    return <div>
        ⊕
    </div> ;
  }
  
  export default projectProgress;