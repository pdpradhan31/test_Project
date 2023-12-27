import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import "./Homepage.css";
import { useLocation } from "react-router-dom";

const Homepage = () => {
    const location = useLocation();
    const user = location.state?.user;
   
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        
        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch all tasks from the 'tasks' table
            console.log("In fetch data ")
            console.log(user)
            console.log(user.id)

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('userid',user.id);
            console.log(data)

            if (error) {
                console.error('Error fetching tasks:', error.message);
            } else {
                // Set the tasks in the component's state
                setTasks(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const [taskData, setTaskData] = useState({
      taskName: '',
      taskDescription: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTaskData({
        ...taskData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Insert the task data into the 'tasks' table using Supabase
          const { data, error } = await supabase
            .from('tasks')
            .insert([
              {
                taskname: taskData.taskName,
                taskdescription: taskData.taskDescription,
                isactive: true,
                IsCompleted: false,
                userid:user.id
              },
            ])
            .select();
    
          if (error) {
            console.error('Error inserting task:', error.message);
          } else {
            console.log('Task inserted successfully:', data);
            // Optionally, you can update the local state or perform other actions
            setTaskData({
              taskName: '',
              taskDescription: '',
            });
            fetchData();
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  
    return (
        <>
        {/* <h2>Welcome, {user ? user.name : "Guest"}!</h2> */}
        <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          name="taskName"
          value={taskData.taskName}
          onChange={handleInputChange}
          className="form-input"
        />
        <textarea
          placeholder="Task Description"
          name="taskDescription"
          value={taskData.taskDescription}
          onChange={handleInputChange}
          className="form-textarea"
        />
        <button type="submit" className="form-button">
          Add
        </button>
      </form>
      <TaskTable tasks={tasks} fetchData={fetchData}></TaskTable>
        </>
    );
  };
  


export default Homepage;




const TaskTable = ({ tasks ,fetchData}) => {

    const handleDelete = async (taskId) => {
        try {
          // Delete the task with the specified ID from the 'tasks' table using Supabase
          const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);
    
          if (error) {
            console.error('Error deleting task:', error.message);
          } else {
            fetchData();
            console.log('Task deleted successfully');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
    
      const handleComplete = async (taskId) => {
        try {
          // Update the 'IsCompleted' flag of the task with the specified ID in the 'tasks' table using Supabase
          const { data, error } = await supabase
            .from('tasks')
            .update({ IsCompleted: true })
            .eq('id', taskId)
            .select();
    
          if (error) {
            console.error('Error completing task:', error.message);
          } else {
            // Update the local state or perform other actions
            fetchData();
            console.log('Task marked as completed successfully:', data);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Task Description</th>
           
            <th>User ID</th>
            <th>Created On</th>
            <th>Updated On</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task,index) => (
            <tr key={task.id}>
              <td>{index+1}</td>
              <td>{task.taskname}</td>
              <td>{task.taskdescription}</td>
              
              <td>{task.userid}</td>
              <td>{new Date(task.createdon).toLocaleString()}</td>
              <td>{new Date(task.updatedon).toLocaleString()}</td>
            
              <td>
                  {!task.IsCompleted && (
                    <button className="action-button delete-button"  onClick={() => handleDelete(task.id)}>Delete</button>
                  )}
                  {!task.IsCompleted && (
                    <button className="action-button complete-button"  onClick={() => handleComplete(task.id)}>Complete</button>
                  )}
                  {task.IsCompleted && <span className="completed-status">Completed</span>}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


