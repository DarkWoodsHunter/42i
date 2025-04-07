import React, { useState } from "react";
import { useCreateTaskMutation } from "../../AppStore/ApiSlice";
import SubTaskCard from "./SubTaskCard";
import returnIcon from "../../Assets/returnicon.png";
import { useNavigate } from "react-router-dom";



export default function MainCreator() {
    //Component to Create and Add new tasks to the DB

    const [totalSubTaskt, setTotalSubTaskt] = useState();
    const [createTask] = useCreateTaskMutation();

    const navigate = useNavigate();
    function OnHandleSubTierChange(e) {
        e.preventDefault();
        setTotalSubTaskt(e.target.value);
    }

    //Function to update and shown the <SubTaskCard> component
    function ShowSubTaskCard() {
        let item = [];
        for (let i = 0; i < totalSubTaskt; i++) {
            item.push(<SubTaskCard number={i} count={i} key={i} />)
        }
        return item;
    }
    //For the button to return to the main page
    function GoBack(){
        navigate("/");
    }

    //Function to save all settings from the form and add the task to the DB
    const OnhandleSummit = async (e) => {

        e.preventDefault();
        const Tittle = e.target.elements.Tittle.value.trim();
        const Description = e.target.elements.Description.value.trim();
        const Status = e.target.elements.Status.value;
        const Priority = e.target.elements.priority.value;
        const Estimate = e.target.elements.estimate.value;
        const SubTask = [];
        //this is not efficient
        if (totalSubTaskt >= 1) {
            SubTask.push({
                Status: e.target.elements.Status_1.value,
                Estimate: e.target.elements.estimate_1.value,
            })
        }
        if (totalSubTaskt >= 2) {
            SubTask.push({
                Status: e.target.elements.Status_2.value,
                Estimate: e.target.elements.estimate_2.value,
            })
        }
        if (totalSubTaskt >= 3) {
            SubTask.push({
                Status: e.target.elements.Status_3.value,
                Estimate: e.target.elements.estimate_3.value,
            })
        }
        if (totalSubTaskt >= 4) {
            SubTask.push({
                Status: e.target.elements.Status_4.value,
                Estimate: e.target.elements.estimate_4.value,
            })
        }
        if (totalSubTaskt >= 5) {
            SubTask.push({
                Status: e.target.elements.Status_5.value,
                Estimate: e.target.elements.estimate_5.value,
            })
        }
        //If all required information is correct, create the task and show an alert to comfirm it, other way, throw an error alert
        if (Tittle != null && Tittle != "" && Status != null && Description != null && Description != "") {
            createTask({ Tittle, Description, Status, Priority, Estimate, SubTask });
            alert("Task Created");
            GoBack();
        } else {
            alert("Error!")
        }
    }
    return (
        <>
            <form onSubmit={OnhandleSummit}>
                <div className=" 
                mx-auto 
                my-[25px] 
                p-[10px] md:p-[30px] lg:p-[40px] xl:p-[50px] 2xl:p-[60px]
                w-[425px] sm:w-[75%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%]
                bg-gray-400 border-2 border-gray-500 rounded-lg shadow-2xl flex flex-col py-[20px]">

                    <div className="mx-auto grid grid-cols-3 gap-2 w-[95%]">

                        <img className=" w-[25px] cursor-pointer" src={returnIcon} onClick={() => GoBack()}/>

                        <h4 className=" font-bold text-nowrap text-center text-[20px]">CREATE NEW TASK</h4>
                    </div>

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Tittle: </p>
                        <input className=" w-[300px] rounded-lg  pl-[10px]" type="text" name="Tittle" />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Description: </p>
                        <input className="w-[300px] rounded-lg pl-[10px]" type="text" name="Description" />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <div>
                            <p className=" w-[120px] text-center text-[15px] h-[10px] font-bold tracking-wider text-nowrap">Priority level:</p>
                            <p className=" w-[120px] h-[10px] mb-[10px] mt-[8px] text-center text-[12px] text-red-800">*Optional</p>
                        </div>

                        <select name="priority" className=" my-auto h-[25px] rounded-lg pl-[10px]" >
                            <option value="empty">None</option>
                            <option value="low" >Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider text-nowrap">Status: </p>
                        <select name="Status" className="my-auto h-[25px] rounded-lg pl-[10px]" >
                            <option value="backlog">Backlog</option>
                            <option value="unstarted">Unstarted</option>
                            <option value="started">Started</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <div>
                            <p className=" w-[120px] text-center text-[15px] h-[10px] font-bold tracking-wider text-nowrap">Estimate value:</p>
                            <p className=" w-[120px] h-[10px] mb-[10px] mt-[8px] text-center text-[12px] text-red-800">*Optional</p>
                        </div>

                        <input className="my-auto h-[25px] rounded-lg pl-[10px]" type="number" name="estimate" />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px] flex-col">
                        <div className="flex">
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider text-nowrap">Subtasks: </p>
                            <select name="Ntiers" onChange={(e) => OnHandleSubTierChange(e)} className="my-auto h-[25px] w-[40px] rounded-lg pl-[10px]">
                                <option value={"0"}>None</option>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                            </select>
                        </div>
                        {ShowSubTaskCard()}
                    </div>

                    <div className="flex justify-around">

                        <button className="bg-green-400 rounded-xl hover:bg-green-500 w-[150px] mt-[15px] shadow-xl border-2 font-bold text-center underline">Create Task</button>

                    </div>

                </div>
            </form>
        </>
    )
}