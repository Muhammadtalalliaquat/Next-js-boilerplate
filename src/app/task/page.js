"use client";

import { fetchTasks, addTasks, deletedTasks } from "@/store/features/taskSlice";
// import { logoutUser } from "@/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Task() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { task, error, isLoading, addTaskStatus } = useSelector(
    (state) => state.task
  );

  const [newAddTask, setNewAddTask] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newAddTask) {
      dispatch(addTasks({ task: newAddTask, completed: false }));
      setNewAddTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    if (taskId) {
      dispatch(deletedTasks(taskId));
    }
  };



  if (error) return router.push(`/`);

  return (
    <>
      <div className="container mx-auto mt-20">
        <div className="flex gap-4 my-10">
          <input
            className="flex flex-grow border p-3 rounded"
            placeholder="Add Task"
            value={newAddTask}
            onChange={(e) => setNewAddTask(e.target.value)}
          />

          <button
            className="bg-slate-800 text-white rounded px-4 py-2"
            onClick={handleAddTask}
            // disabled={addTaskStatus == "pending"}
          >
            {" "}
            Add Task
            {/* {addTaskStatus == "pending" ? "Saving..." : "Add Task"} */}
          </button>
          <button
            onClick={() => {
              dispatch(logoutUser);
              setCookie(`token`, null);
              router.push(`/`);
            }}
            className="bg-slate-800 text-white rounded px-4 py-2"
          >
            Logout
          </button>
        </div>
        <div>
          <div>
            {task?.data?.length > 0 ? (
              task.data.map(( item, index ) => (
                <div
                  className="bg-slate-800 text-white p-3 my-1 flex items-center justify-between h-16 bg-gray-700"
                  key={item._id || index}
                >
                  <h1>{item.task}</h1>
                  <div className="flex space-x-4">
                    <button className="bg-blue-500 p-2 rounded hover:bg-blue-600">
                      <MdModeEdit size={15} color="white" />
                    </button>
                    <button onClick={() => handleDeleteTask(item._id)}  className="bg-red-500 p-2 rounded hover:bg-red-600">
                      <FaDeleteLeft size={15} color="white" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
