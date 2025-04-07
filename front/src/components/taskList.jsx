import React from "react";
import TaskCard from "./taskCard";
import { useGetTasksQuery } from "../AppStore/ApiSlice";

export default function TaskList() {
    //TaskList component fetch to the DB througt ApiSlice.js and Get all tasks in the DataBase

    //fetch through the apiSlice.js script, and save the data in the variable Tasks
    const {data: Tasks, isError, isLoading, error} = useGetTasksQuery();
        //While waiting for the Data, return a Loading message
        if (isLoading) return <>Loading</>;
        //If the fetch fails, return a error
        else if (isError) return <>Error: {error.message}</>;
    return (
        <>
            <div className=" mx-auto py-[10px]">
                <h3 className="w-[80%] mx-auto font-bold">All Tasks:</h3>
                {/* Tasks it's a object, so read every element and create a <TaskCard> component for every one of them*/}
                {Tasks.map((task, i) => (
                    <TaskCard data={task} key={i}/>
                ))}
            </div>
        </>
    )
}