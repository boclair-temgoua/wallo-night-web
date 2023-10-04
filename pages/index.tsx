/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ButtonInput } from "@/components/ui/button-input";
import { LayoutSite } from "@/components/layout-site";

export default function Home() {


  return (
    <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">


    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">per chi ama fare!</h2>
                {/* <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">per chi ama fare!</p> */}

                {/* <p className="mt-4 text-xl text-gray-600 md:mt-8">
                    <span className="relative inline-block">
                        <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                        <span className="relative"> Have a question? </span>
                    </span>
                    <br className="block sm:hidden" />Ask me on <a href="#" title="" className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Twitter</a>
                </p> */}
            </div>

            <div className="relative">

                <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://loremflickr.com/640/480?lock=1798381764608000" alt="" />
            </div>
        </div>
    </div>








      {/* <section classNameNameNameName="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
        <h2 classNameNameNameName="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>

        <p classNameNameNameName="mt-4 text-sm text-gray-600 dark:text-gray-300">We use cookies to ensure that we give you the best experience on our website. <a href="#" classNameNameNameName="text-blue-500 hover:underline">Read cookies policies</a>. </p>

        <div classNameNameNameName="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          <button classNameNameNameName="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Manage your preferences
          </button>

          <button classNameNameNameName=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Accept
          </button>
        </div>
      </section> */}




    </LayoutSite>
  );
}
