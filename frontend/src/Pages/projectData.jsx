
let projectJson = `
{
    "start_time": "2022-01-01T09:00:00",
    "deadline": "2022-03-31T17:00:00",
    "title": "New Website Design",
    "goals": [
        {
            "goal_title": "Design homepage",
            "tasks": [
                {
                    "task_title": "Create wireframe",
                    "deadline": "2022-02-01T12:00:00",
                    "completed": true,
                    "completed_time": "2022-01-15T15:00:00"
                },
                {
                    "task_title": "Design mockup",
                    "deadline": "2022-02-15T12:00:00",
                    "completed": true,
                    "completed_time": "2022-02-10T10:00:00"
                },
                {
                    "task_title": "Test design with users",
                    "deadline": "2022-03-01T12:00:00",
                    "completed": true
                }
            ]
        },
        {
            "goal_title": "Develop website",
            "tasks": [
                {
                    "task_title": "Set up development environment",
                    "deadline": "2022-02-05T12:00:00",
                    "completed": true,
                    "completed_time": "2022-02-01T09:00:00"
                },
                {
                    "task_title": "Develop homepage",
                    "deadline": "2022-03-01T12:00:00",
                    "completed": true,
                    "completed_time": "2022-02-28T17:00:00"
                },
                {
                    "task_title": "Develop other pages",
                    "deadline": "2022-03-15T12:00:00",
                    "completed": false
                }
            ]
        }
    ]
}

`; 

const porjectData =()=>JSON.parse(projectJson)

export default porjectData;