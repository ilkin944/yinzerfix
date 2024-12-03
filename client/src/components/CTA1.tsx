import React from "react"
import BookServiceCTA from "./BookServiceCTA"

export default function CTA1() {
  return (
    <section id="cta" className="w-full h-[490px] relative my-20">
      <div className="flex h-full bg-fixed bg-no-repeat bg-center" style={{ backgroundImage: `url(/images/sections/master-repairs-the-broken-washing-machine.jpg)` }}>
        <div className="w-full h-full absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="container relative">
          <div className="lg:w-2/5 w-full h-full py-16 px-10 lg:before:w-2/5 before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-[#3637A5] before:opacity-90">
            <div className="relative z-40 h-full gap-6 flex flex-col">
              <div className="mb-4">
                <span className="text-white text-3xl font-semibold">Your Appliance Emergency is Our Priority</span>
              </div>
              <div className="mb-6">
                <span className="text-white text-base">We offer a comprehensive range of repair services for all major home appliances. Whether your refrigerator is leaking, your oven is not heating, or your washing machine is making strange noises, we have the solution.</span>
              </div>
              <BookServiceCTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
