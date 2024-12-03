import Image from "next/image"
import React from "react"
import { BiTargetLock } from "react-icons/bi"
import { MdReduceCapacity } from "react-icons/md"
import { SiAdguard } from "react-icons/si"

export default function Satisfaction() {
    return (
        <section id="satisfaction" className="container my-20">
            <div className="flex lg:flex-row flex-col flex-wrap w-full h-full justify-between items-start">
                <div className="w-full lg:w-1/2">
                    <Image src={"/images/sections/miusa guaranteed.png"} alt="satisfaction" width={500} height={500} className="w-[150px] h-[150px] object-cover" />
                    <div className="mt-6">
                        <span className="text-3xl font-semibold">Customer Satisfaction Guaranteed</span>
                    </div>
                    <div className="mt-4 lg:pr-[84px]">
                        <span className="text-base font-normal ">Our goal is to provide the highest level of service and ensure your complete satisfaction. We pride ourselves on our professionalism, attention to detail, and commitment to customer care. From the moment you contact us to the completion of your repair, we were dedicated to making the process as smooth and stress-free as possible.</span>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:mt-0 mt-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full">
                                <BiTargetLock size={28} className="text-purple" />
                            </div>
                            <div className="info">
                                <div className="mb-2">
                                    <span className="text-xl font-semibold">Extensive Brand Coverage</span>
                                </div>
                                <div className="desc">
                                    <span>We are able to provide services for a diverse assortment of brands, ranging from high-end luxury to everyday household names.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full">
                                <MdReduceCapacity size={28} className="text-purple" />
                            </div>
                            <div className="info">
                                <div className="mb-2">
                                    <span className="text-xl font-semibold">Brand-Specific Training</span>
                                </div>
                                <div className="desc">
                                    <span>In order to maintain a current knowledge of the most recent brand technologies, our team participates in ongoing training.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full">
                                <SiAdguard size={28} className="text-purple" />
                            </div>
                            <div className="info">
                                <div className="mb-2">
                                    <span className="text-xl font-semibold">Warranty Compliance</span>
                                </div>
                                <div className="desc">
                                    <span>All of our repairs are guaranteed to be in accordance with the manufacturer&apos;s warranty, thereby preserving your coverage.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
