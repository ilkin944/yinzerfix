import React from "react"
import { PiCertificate } from "react-icons/pi"
export default function WhyUS() {
    return (
        <section  
        id="why-us" className="w-full h-full my-20">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-stretch">
                    <div className="p-12 bg-[#3637a53a] flex flex-col items-center justify-center">
                        <div className="icon bg-white p-2">
                            <PiCertificate size={28}/>
                        </div>
                        <div className="title my-5">
                            <span className="text-center text-xl font-semibold text-purple">Certified Technicians</span>
                        </div>
                        <div className="desc">
                            <p className="text-center">Our certified technicians can diagnose and repair all major brands of household appliances.</p>
                        </div>
                    </div>
                    <div className="p-12 bg-[#FFC7522a] flex flex-col items-center justify-center">
                        <div className="icon bg-white p-2">
                            <PiCertificate size={28}/>
                        </div>
                        <div className="title my-5">
                            <span className="text-center text-xl font-semibold text-purple">Local & Trusted</span>
                        </div>
                        <div className="desc">
                            <p className="text-center">We&apos;re your neighbors, dedicated to serving our community with top-notch appliance care.</p>
                        </div>
                    </div>
                    <div className="p-12 bg-[#090A1D1a] flex flex-col items-center justify-center">
                        <div className="icon bg-white p-2">
                            <PiCertificate size={28}/>
                        </div>
                        <div className="title my-5">
                            <span className="text-center text-xl font-semibold text-purple">Transparent Pricing</span>
                        </div>
                        <div className="desc">
                            <p className="text-center">No hidden fees or surprises. We provide upfront estimates before starting any work.</p>
                        </div>
                    </div>
                    <div className="p-12 bg-red-100 flex flex-col items-center justify-center">
                        <div className="icon bg-white p-2">
                            <PiCertificate size={28}/>
                        </div>
                        <div className="title my-5">
                            <span className="text-center text-xl font-semibold text-purple">Prompt Service</span>
                        </div>
                        <div className="desc">
                            <p className="text-center">We understand your time is valuable, so we offer same-day or next-day appointments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
