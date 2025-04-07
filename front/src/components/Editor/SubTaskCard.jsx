import React from "react";

export default function SubTaskCard(number) {
    // A simple Sub Component to be used in the Creator and Edit Components
    return (
        <>
            <div className="flex flex-col ml-[120px]">
                <h3 className=" font-semibold">SubTask {number.count + 1}:</h3>
                <div className=" flex pl-[10px]">
                    <p className="w-[75px] font-semibold">State:</p>
                    <select name={`Status_${number.count + 1}`} className="w-[190px] rounded-lg pl-[10px] ml-[10px]" defaultValue={number.number.Status}>
                        <option value="backlog">Backlog</option>
                        <option value="unstarted">Unstarted</option>
                        <option value="started">Started</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <div className="rounded-lg my-[5px] mr-auto pl-[10px] flex">
                    <p className="w-[75px] font-semibold">Estimate:</p>
                    <input className="w-[190px] rounded-lg ml-[10px] pl-[10px]" type="number" name={`estimate_${number.count + 1}`} defaultValue={number.number.Estimate} />
                </div>

                <hr className="w-[250px] mx-auto"/>
            </div>
        </>
    )
}