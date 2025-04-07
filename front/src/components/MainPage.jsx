import React from "react";
import TaskList from "./taskList";
import { Link } from "react-router-dom";

export default function MainPAge() {
    return (
        <>
            <div className=" 
            mx-[10px] sm:mx-[15px] md:mx-auto lg: xl: 2xl:
            my-[10px] sm: md: lg: xl: 2xlmy-[30px]:
            w-[90%] sm:w-[90%] md:w-[75%] lg:w-[500px] xl:w-[600px] 2xl:2-[50%]
            bg-gray-400 rounded-lg shadow-2xl flex flex-col py-[20px]">

                    <Link to="/create" className=" bg-red-400 hover:bg-red-500 border-2 border-red-500 rounded-lg px-[10px] py-[5px] mx-auto font-bold shadow-md shadow-black mb-5">Create task</Link>



                <div>
                    <TaskList />
                </div>

            </div>
        </>
    )
}