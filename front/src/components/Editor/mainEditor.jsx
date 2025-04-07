import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTaskByIDQuery, useEditTaskMutation, useDeleteTaskMutation } from "../../AppStore/ApiSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import SubTaskCard from "./SubTaskCard";
import returnIcon from "../../Assets/returnicon.png"

export default function MainEditor() {
    const [totalSubTaskt, setTotalSubTaskt] = useState();
    const [currentSubTasks, setCurrentSubTasks] = useState();
    const navigate = useNavigate();
    const [deleteTask] = useDeleteTaskMutation();
    const [editTask] = useEditTaskMutation();

    let [status, setStatus] = useState();
    let [priority, setPriority] = useState();

    const [getQuery] = useSearchParams();
    let id = getQuery.get("id");
    const { data: TaskData, isError, isLoading, error } = useGetTaskByIDQuery(id);

    useEffect(() => {
        if (!isLoading) {
            setStatus(TaskData.Status)
            setPriority(TaskData.Priority)
            setTotalSubTaskt(TaskData.SubTask.length)
            setCurrentSubTasks(TaskData.SubTask)

        }
    }, [isLoading, TaskData])

    if (isLoading) return <div>isLoading</div>
    else if (isError) return <div>Error</div>

    function TranslateDate(e) {
        const date = new Date(e);
        const options = {
            weekday: "long",
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric"
        }
        return (date.toLocaleDateString("es-AR", options))
    }

    function OnHandleSubTierChange(e) {
        e.preventDefault();
        setTotalSubTaskt(e.target.value);
    }

    function ShowSubTaskCard() {
        let item = [];
        for (let i = 0; i < totalSubTaskt; i++) {
            if (i < currentSubTasks.length) {
                item.push(<SubTaskCard number={TaskData.SubTask[i]} count={i} key={i} />)
            } else {
                item.push(<SubTaskCard number={i} count={i} key={i} />)
            }

        }
        return item;
    }

    function GetSubTaskEstimatePending() {
        let totalestimate = 0;
        for (let i = 0; i < totalSubTaskt; i++) {
            if (TaskData.SubTask[i].Status == "backlog" || TaskData.SubTask[i].Status == "unstarted") {
                totalestimate = totalestimate + TaskData.SubTask[i].Estimate;
            }
        }
        return totalestimate;
    }

    function GetSubTaskEstimateStarted() {
        let totalestimate = 0;
        for (let i = 0; i < totalSubTaskt; i++) {
            if (TaskData.SubTask[i].Status == "started") {
                totalestimate = totalestimate + TaskData.SubTask[i].Estimate;
            }
        }
        return totalestimate;
    }

    function GetSubTaskEstimateTotal() {
        let totalestimate = 0;
        for (let i = 0; i < totalSubTaskt; i++) {
            totalestimate = totalestimate + TaskData.SubTask[i].Estimate;
        }
        return totalestimate;
    }

    function DeleteTaskFunction(e) {
        deleteTask(e);
        alert("Deleted Task");
        navigate("/");
    }

    function setCurrentDate() {
        if (TaskData.LastUpdateDate == undefined || TaskData.LastUpdateDate == null || TaskData.LastUpdateDate == "") {
            return TranslateDate(TaskData.CreationDate)
        } else {
            let current = new Date;
            let today = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}, ${current.getHours()}:${current.getMinutes()}`;
            let formated = TranslateDate(today)
            return formated;
        }

    }

    function GoBack() {
        navigate("/");
    }

    function OnHandleSummitEdit(e) {
        e.preventDefault();
        const Tittle = e.target.elements.Tittle.value.trim();
        const Description = e.target.elements.Description.value.trim();
        const Status = status;
        const Priority = priority;
        const Estimate = e.target.elements.estimate.value;
        let current = new Date;
        const LastUpdateDate = TranslateDate(`${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}, ${current.getHours()}:${current.getMinutes()}`);
        const SubTask = [];

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

        if (Tittle != null && Tittle != "" && Status != null && Description != null && Description != "") {
            editTask({ id, Tittle, Description, Status, Priority, Estimate, LastUpdateDate, SubTask });
            alert("Task Modified")
        } else {
            alert("Error!")
        }
    }

    return (
        <>
            <div className="mx-auto 
                my-[25px] 
                p-[10px] md:p-[30px] lg:p-[40px] xl:p-[50px] 2xl:p-[60px]
                w-[425px] sm:w-[75%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%]
                bg-gray-400 border-2 border-gray-500 rounded-lg shadow-2xl flex flex-col py-[20px]">

                <div className="mx-auto grid grid-cols-3 gap-2 w-[95%]">
                    <img className=" w-[25px] cursor-pointer" src={returnIcon} onClick={() => GoBack()} />

                    <h2 className=" font-bold text-nowrap text-center text-[25px]">{TaskData.Tittle}</h2>
                </div>

                <form onSubmit={OnHandleSummitEdit}>
                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">ID: </p>
                        <span>{TaskData._id}</span>
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Tittle: </p>
                        <input className="w-[300px] rounded-lg pl-[7px]" type="text" name="Tittle" defaultValue={TaskData.Tittle} />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Description: </p>
                        <input className="w-[300px] rounded-lg pl-[10px]" type="text" name="Description" defaultValue={TaskData.Description} />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <div>
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Priority level:</p>
                            <p className=" w-[120px] h-[10px] mb-[10px] mt-[8px] text-center text-[12px] text-red-800">*Optional</p>
                        </div>

                        <select name="priority" className="my-auto h-[25px] rounded-lg pl-[10px]" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="empty">None</option>
                            <option value="low" >Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Status: </p>
                        <select name="Status" className="my-auto h-[25px] rounded-lg pl-[10px]" value={status} onChange={(e) => setStatus(e.target.value)}>
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
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Estimate value:</p>
                            <p className=" w-[120px] h-[10px] mb-[10px] mt-[8px] text-center text-[12px] text-red-800">*Optional</p>
                        </div>

                        <input className="my-auto h-[25px] rounded-lg pl-[10px]" type="number" name="estimate" defaultValue={TaskData.Estimate} />
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex my-[5px] flex-col">
                        <div className="flex">
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Subtasks: </p>
                            <select name="Ntiers" className="my-auto h-[25px] rounded-lg pl-[10px]" onChange={(e) => OnHandleSubTierChange(e)} value={totalSubTaskt}>
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

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex flex-col my-[5px]">
                        <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider">Estimates: </p>
                        <p className=" text-[12px] ml-[120px] font-semibold ">total estimate for subtasks in pending states: {GetSubTaskEstimatePending()}</p>
                        <p className=" text-[12px] ml-[120px] font-semibold">total estimate for subtasks in progress: {GetSubTaskEstimateStarted()}</p>
                        <p className=" text-[12px] ml-[120px] font-semibold">overall total estimate: {GetSubTaskEstimateTotal()}</p>
                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex flex-col my-[5px]">

                        <div className="flex">
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider text-nowrap">Creation Date: </p>
                            <p className=" w-[300px]">{TranslateDate(TaskData.CreationDate)}</p>
                        </div>

                        <div className="flex">
                            <p className=" w-[120px] text-center text-[15px] font-bold tracking-wider text-nowrap" onClick={setCurrentDate}>Last Updated:</p>
                            <p className=" w-[300px] font-normal">{setCurrentDate()}</p>
                        </div>

                    </div>

                    <hr className="w-[85%] mx-auto" />

                    <div className="flex justify-around">
                        <button className="bg-green-400 rounded-xl hover:bg-green-500 w-[150px] mt-[15px] shadow-xl border-2 border-green-600 font-bold text-center hover:underline">Apply Changes</button>
                    </div>
                </form>
                <button className="bg-red-400 rounded-xl hover:bg-red-500 mx-auto w-[150px] mt-[15px] shadow-xl border-2 border-red-600 font-bold text-center hover:underline" onClick={() => DeleteTaskFunction(TaskData._id)}>Delete Task</button>
            </div>
        </>
    )
}