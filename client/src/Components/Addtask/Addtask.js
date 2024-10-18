import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Store/authh";
import { useNavigate } from "react-router-dom";

const Addtask = () => {
  const [questionText, setQuestionText] = useState("");
  const [userID, setUserID] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState(null);
  const [taskStarted, setTaskStarted] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const navigate = useNavigate();

  const { UserIDFROMLSGet, logout } = useAuth();

  useEffect(() => {
    const storedUserID = UserIDFROMLSGet();
    if (storedUserID) {
      setUserID(storedUserID);
      
    } else {
      console.error("No userID found in local storage.");
      // toast.error("Failed to retrieve user ID. Please log in again.");
      navigate("/login");
    }
  }, [UserIDFROMLSGet, navigate]);

  useEffect(() => {
    if (userID) {
      console.log("p1",userID);
      fetchTasks();
    }
  }, [userID]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://newquiz-e2nh.onrender.com/api/authh/alltaskget/${userID}`);

      if (response.ok) {
        const fetchedTasks = await response.json();
        console.log("p1", fetchedTasks);
        setTasks(fetchedTasks.tasks);
      } else {
        const result = await response.json();
        console.log(result);
        // toast.error(result.message || "Failed to fetch tasks");
      }
    } catch (error) {
      toast.error("An error occurred while fetching tasks.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { questionText, userID };

    try {
      const response = await fetch("https://newquiz-e2nh.onrender.com/api/authh/createtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Task created successfully!");
        setQuestionText("");
        setShowForm(false);
        fetchTasks();
      } else {
        toast.error(result.message || "Failed to create task");
      }
    } catch (error) {
      toast.error("An error occurred while creating the task.");
    }
  };

  const handleTaskClick = (task) => {
    if (task.status !== "Not Completed") {
      setExpandedTaskId(expandedTaskId === task._id ? null : task._id);
      return;
    }
    setCurrentTask(task);
    setAnswer(""); // Reset the answer field
    setMistakes(0); // Reset mistakes
    setTaskStarted(false); // Reset task started state
    setTimeLeft(null); // Reset the timer
    // setShowForm(false);
  };

  const startTask = () => {
    if (currentTask) {
      setTimeLeft(30); // Start 30-second countdown
      setTaskStarted(true); // Indicate that the task has started
    }
  };

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleTaskUpdate();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    countMistakes();
  }, [answer]);

  const countMistakes = () => {
    if (!currentTask) return 0;

    const correctWords = currentTask.questionText.split(" ").filter(Boolean);
    const answerWords = answer.split(" ").filter(Boolean);
    let mistakes = 0;

    for (let i = 0; i < correctWords.length; i++) {
      if (answerWords[i] !== correctWords[i]) {
        mistakes++;
      }
    }
    setMistakes(mistakes);
    return mistakes;
  };

  const handleTaskUpdate = async () => {
    try {
      const mistakesCount = countMistakes();
      const statuss = mistakesCount === 0 ? "Passed" : "Failed";

      const response = await fetch(`https://newquiz-e2nh.onrender.com/api/authh/updatetask/${currentTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer: answer,
          mistakes: mistakesCount,
          status: statuss,

        }),
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(statuss); // Show the status immediately
        setTimeout(() => {
          setStatus(null); // Reset status after a short delay
          setCurrentTask(null);
          setAnswer("");
          setTimeLeft(null);
          fetchTasks();
        }, 2000);
      } else {
        setStatus("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogout = () => {
  //   logout(); // Clear the user session and data
  //   toast.success("Logged out successfully!");
  //   navigate("/"); // Redirect to the registration page
  // };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          backgroundColor: "#e74c3c",
          color: "#ecf0f1",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
      >
        Logout
      </button> */}
      <div
        style={{
          width: "25%",
          backgroundColor: "#2c3e50",
          padding: "20px",
          color: "#ecf0f1",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Your Tasks</h2>
        {tasks.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {tasks
              .slice()
              .reverse()
              .map((task, index) => (
                <li key={task._id}>
                  <button
                    style={{
                      backgroundColor: "#34495e",
                      border: "none",
                      padding: "12px 15px",
                      textAlign: "left",
                      width: "100%",
                      cursor: "pointer",
                      marginBottom: "10px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      color: "#ecf0f1",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1abc9c")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#34495e")
                    }
                    onClick={() => handleTaskClick(task)}
                  >
                    <span
                      style={{
                        flex: 1,
                        fontSize: "16px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* (ID: {task._id}) */}
                      {/* {index + 1}. */}
                       {task.questionText}
                    </span>
                    <span
                      style={{
                        backgroundColor:
                          task.status === "Not Completed"
                            ? "#e67e22"
                            : task.status === "Passed"
                            ? "#27ae60"
                            : "#D22B2B",
                        color: "#ecf0f1",
                        padding: "5px 10px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {task.status}
                    </span>
                  </button>
                  {expandedTaskId === task._id && (
                    <div
                      style={{
                        padding: "10px",
                        backgroundColor: "#f4f6f7",
                        borderRadius: "8px",
                        marginTop: "5px",
                        color: "#000000",
                      }}
                    >
                      <p>
                        <strong>Question:</strong> {task.questionText}
                      </p>
                      <p>
                        <strong>Answer:</strong> {task.answer}
                      </p>
                      <p>
                        <strong>Mistakes:</strong> {task.mistakes}
                      </p>
                      <p>
                        <strong>Status:</strong> {task.status}
                      </p>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p style={{ color: "#bdc3c7" }}>No tasks found.</p>
        )}
      </div>

      <div style={{ width: "75%", padding: "40px" }}>
        <div
          style={{
            backgroundColor: "#ecf0f1",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {!currentTask && (
            <>
              <h2>Create a New Task</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  backgroundColor: "#3498db",
                  color: "#ecf0f1",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2980b9")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3498db")
                }
              >
                {showForm ? "Close Form" : "Add Task"}
              </button>

              {showForm && (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Question Text:</label>
                    <textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #bdc3c7",
                        fontSize: "16px",
                        minHeight: "100px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#3498db",
                      color: "#ecf0f1",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "20px",
                      fontSize: "16px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2980b9")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3498db")
                    }
                  >
                    Submit
                  </button>
                </form>
              )}
            </>
          )}

          {currentTask && (
            <div style={{ marginTop: "20px" }}>
              <h3  style={{ color: "#000000"}}>QuestionTask:{currentTask.questionText}</h3>
              {!taskStarted ? (
                <>
                  <button
                    onClick={() => setCurrentTask(null)}
                    style={{
                      backgroundColor: "#f39c12",
                      color: "#ecf0f1",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "20px",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e67e22")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f39c12")
                    }
                  >
                    Back to Task List
                  </button>
                  <button
                    onClick={startTask}
                    style={{
                      backgroundColor: "#27ae60",
                      color: "#ecf0f1",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "20px",
                      fontSize: "16px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1e8449")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#27ae60")
                    }
                  >
                    Start Task
                  </button>
                </>
              ) : (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {timeLeft !== null && (
                      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Time Left: {timeLeft}s
                      </div>
                    )}
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Mistakes: {mistakes}
                    </div>
                  </div>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #bdc3c7",
                      fontSize: "16px",
                      minHeight: "100px",
                      boxSizing: "border-box",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center", // Center horizontally
                      marginTop: "20px",
                    }}
                  >
                    {/* <button
                      onClick={handleTaskUpdate}
                      style={{
                        backgroundColor: "#3498db",
                        color: "#ecf0f1",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2980b9")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3498db")
                      }
                    >
                      Submit Answer
                    </button> */}
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        padding: "12px 24px", // Padding to match the button
                        border: "2px solid", // Border to match the button
                        borderRadius: "5px",
                        color: status === "Passed" ? "#27ae60" : "#e74c3c", // Green if passed, red otherwise
                        backgroundColor: "#ecf0f1", // Light background for contrast
                      }}
                    >
                      Status: {status}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addtask;
