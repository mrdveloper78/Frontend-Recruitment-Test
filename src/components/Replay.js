import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";


const Replay = ({ rep }) => {

    // for time ago
    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    return (
        <div className='w-full container mx-auto'>

            {
                rep && rep.map(
                    (item, index) => {

                        const { id, date, user, text, likes, iLikedIt } = item;

                        return (
                            <div key={index}>
                                <div className='bg-white mb-8'>
                                    <div className='text-black flex items-start  gap-10'>

                                        {/* left */}
                                        <div>
                                            {/* icon */}
                                            <img
                                                className='rounded-full w-[75px]'
                                                src={user.avatar} />
                                        </div>


                                        {/* right */}
                                        <div className=''>
                                            {/* title */}
                                            <div className='flex gap-3 mb-2'>
                                                <h2 className='font-bold'>{user.name}</h2>
                                                <span className='text-gray'>
                                                    {
                                                        timeDifference(Date.now(), date)
                                                    }
                                                </span>
                                            </div>

                                            {/* text */}
                                            <p className='text-black/50 font-medium text-lg leading-8 max-w-[580px] mb-2'>
                                                {text}
                                            </p>

                                            {/* like & reply */}
                                            <div className='flex items-center gap-4'>
                                                <div
                                                    className={`
                                                flex items-center justify-center gap-2 px-4 py-2 w-[80px] rounded-3xl cursor-pointer
                                                ${iLikedIt ? 'bg-blue text-white' : 'bg-blue/5'}
                                                `}>
                                                    <AiOutlineLike className='text-black/50 bg-transparent text-2xl' />
                                                    <span className='font-medium'>{likes}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }



            {/* user comment */}
            <div className='bg-white/50 flex items-center gap-10 '>
                {/* icon */}
                <img
                    className='rounded-full w-[75px]'
                    src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />

                {/* input */}
                <input
                    type={'text'}
                    placeholder='Reply '
                    className='w-full h-16 rounded-md border-gray border p-4' />

            </div>

        </div>
    )
}

export default Replay;
