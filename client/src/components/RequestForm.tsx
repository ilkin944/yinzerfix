"use client"
import { Contact, ContactActionState } from "@/app/api/actions";
import React from "react"
import { useActionState } from "react";
export default function RequestForm() {
    const [state, action, isPending] = useActionState(Contact, {
        success: null,
        error: null,
    } as ContactActionState);

    return (
        <form action={action} className="flex flex-col gap-4 mt-5">
            <div className="w-full">
                <input
                    type="text"
                    defaultValue={state.fullName}
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="w-full mb-2 lg:mb-0">
                    <input
                        type="tel"
                        defaultValue={state.phone}
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        defaultValue={state.email}
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="w-full">
                <input
                    type="text"
                    defaultValue={state.subject}
                    name="subject"
                    id="subject"
                    placeholder="Required services"
                    className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="w-full lg:col-span-2 mb-2 lg:mb-0">
                    <input
                        type="text"
                        defaultValue={state.address}
                        name="address"
                        id="address"
                        placeholder="Enter your address"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        defaultValue={state.zipCode}
                        name="zipCode"
                        id="zipCode"
                        placeholder="Zip Code"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="w-full mb-2 lg:mb-0">
                    <input
                        type="date"
                        defaultValue={state.date ? state.date.toISOString().split("T")[0] : ""}
                        name="date"
                        id="date"
                        placeholder="Date of Visit"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="time"
                        defaultValue={state.date ? state.date.toISOString().split("T")[1] : ""}
                        name="time"
                        id="time"
                        placeholder="Time of Visit"
                        className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="w-full">
                <button disabled={isPending} type="submit" className="w-full font-semibold bg-red-500 text-white py-2 rounded-md hover:bg-red-600 duration-300">
                    {isPending ? "Submitting..." : "Schedule your Booking"}
                </button>
            </div>
        </form>
    )
}
