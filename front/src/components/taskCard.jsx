import React from "react";
import { Link } from "react-router-dom";

export default function TaskCard({ data }) {

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

    function setCurrentDate() {
        if (data.LastUpdateDate == undefined || data.LastUpdateDate == null || data.LastUpdateDate == "") {
            return TranslateDate(data.CreationDate)
        } else {
            return data.LastUpdateDate;
        }
    }
    return (
        <>
            <div className="bg-gray-200 rounded-xl 
            w-[100%] sm:w-[90%] md:w-[80%]
            flex flex-col p-[10px] mx-auto my-[20px] shadow-2xl">
                <span className="font-bold">ID: <span className="font-light">{data._id}</span></span>
                <span className="font-bold">Title: <span className="font-light">{data.Tittle}</span></span>
                <span className="font-bold">Status: <span className="font-light">{data.Status}</span></span>
                <span className="font-bold">Priority: <span className="font-light">{data.Priority}</span></span>
                <span className="font-bold">Estimate: <span className="font-light">{data.Estimate}</span></span>
                <span className="font-bold">Creation Date: <span className="font-light">{TranslateDate(data.CreationDate)}</span></span>
                <span className="font-bold">LastUpdateDate: <span className="font-light">{setCurrentDate()}</span></span>
                <Link to={`/Edit?id=${data._id}`} className=" bg-red-400 hover:bg-red-500 border-2 border-red-600 rounded-lg shadow-lg w-[150px] text-center font-bold underline">Details</Link>
            </div >
        </>
    )
}