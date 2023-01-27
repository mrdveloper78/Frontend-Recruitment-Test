import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import Replay from './components/Replay';
import { discussions } from "./assets/data";

const App = () => {
  
  // for show replies
  const [show, setShow] = useState(false);

  //این تابع برای زمانی است که کاربر عکس اواتار ندارد
  //  و مخفف نام او عنوان عکس قرار می گیرد
  const convertNemeToAvatar = (fullName) => {
    let str = fullName;
    let matches = str.match(/\b(\w)/g);
    let acronym = matches.join('');
    return (
      acronym
    )
  };

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
  };


  return (
    <div className='container mx-auto w-[1000px]'>
      {/* start */}
      <div className='mb-1'>
        <div className='bg-white/50 flex items-center justify-between p-8 rounded-t-xl'>
          {/* icon */}
          <img
            className='rounded-full w-[75px]'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />

          {/* input */}
          <input
            type={'text'}
            placeholder='start a discussion '
            className='w-[90%] h-16 rounded-md border-gray border p-4' />

        </div>
      </div>
      {/* end start */}


      {/* comments */}
      <div>
        {
          discussions && discussions.map(
            (item, index) => {
              const { date, iLikedIt, id, likes, replies, text, user, repliesIt } = item;
              let name = user.name;
              return (
                <div className=' mb-1' key={index}>
                  <div className='text-black flex items-start gap-10 p-8 bg-white '>

                    {/* left */}
                    <div className='flex flex-col items-center gap-4'>
                      {/* icon */}
                      {user.avatar ?
                        <img
                          className='rounded-full w-[75px]'
                          src={user.avatar} /> :
                        <span
                          className='
                          rounded-full w-[75px] h-[75px] bg-blue-100 
                          text-blue flex items-center justify-center text-lg font-bold'>
                          {convertNemeToAvatar(user.name)}
                        </span>
                      }
                      <p className={show && repliesIt ? 'perpendicular-line' : ''}></p>
                    </div>


                    {/* right */}
                    <div >
                      {/* title */}
                      <div className='flex gap-3 mb-2'>
                        <h2 className='font-bold'>{user.name}</h2>
                        <span className='text-gray'>
                          {timeDifference(Date.now(), date)}
                        </span>
                      </div>

                      {/* text */}
                      <p className='text-black/50 font-medium text-lg leading-8 max-w-[580px] mb-2'>
                        {text}
                      </p>

                      {/* like & reply */}
                      <div className='flex items-center gap-4 mb-8'>
                        <div
                          className={`
                                      flex items-center justify-center gap-2 px-4 py-2 w-[80px] rounded-3xl cursor-pointer
                                      ${iLikedIt ? 'bg-blue text-white' : 'bg-blue/5'}
                                    `}>
                          <AiOutlineLike className='text-black/50 text-2xl' />
                          <span className='font-medium'>{likes}</span>
                        </div>

                        <span
                          onClick={() => repliesIt && setShow(!show)}
                          className='text-blue font-medium cursor-pointer'>
                          Reply
                        </span>
                      </div>

                      {/* reply comment */}
                      <div className={show && repliesIt && name === user.name ? 'block' : 'hidden'}>
                        <Replay rep={replies} />
                      </div>

                    </div>

                  </div>
                </div>
              )
            }
          )
        }
      </div>


      {/* end comments */}
    </div>
  )
};

export default App;
