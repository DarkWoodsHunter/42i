import React from "react";
import TaskCard from "./taskCard";
import { useGetTasksQuery } from "../AppStore/ApiSlice";

export default function TaskList() {

    const {data: Tasks, isError, isLoading, error} = useGetTasksQuery();
        if (isLoading) return <>Loading</>;
        else if (isError) return <>Error: {error.message}</>;
    return (
        <>
            <div className=" mx-auto py-[10px]">
                <h3 className="w-[80%] mx-auto font-bold">All Tasks:</h3>
                {Tasks.map((task, i) => (
                    <TaskCard data={task} key={i}/>
                ))}
            </div>
        </>
    )
}