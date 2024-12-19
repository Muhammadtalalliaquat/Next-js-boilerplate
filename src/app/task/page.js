"use client";

import { fetchTasks, addTasks } from "@/store/features/taskSlice";
import { logoutUser } from "@/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Task() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { task, status, error, isLoading } = useSelector((state) => state.task);
  const [newAddTask, setNewAddTask] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newAddTask.trim()) {
      dispatch(addTasks({ task: newAddTask, completed: false }));
      setNewAddTask("");
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
          >
            Add Task
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
              task.data.map((item, index) => (
                <div
                  className="bg-slate-800 text-white p-3 my-1"
                  key={item._id || index}
                >
                  <h1>{item.task}</h1>
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
