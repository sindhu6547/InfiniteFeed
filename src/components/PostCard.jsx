import React from 'react'
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
const PostCard = ({post}) => {
  return (
    <div className='border bg-white m-6 rounded-md m-0 p-0'>
        <div className='p-2 flex items-center gap-3  '>
            <img src={`https://i.pravatar.cc/40?u=${post.id}`} className='w-10 h-10 rounded-full'></img>
           <p className="font-semibold text-sm">{post.username}</p>
              <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
        </div>
        <div>
            <img src={`https://picsum.photos/600/400?random=${post.id}`} className='w-full object-cover'></img>
        </div>
        <div className='flex p-1 pl-2 gap-3  items-center'>
             <span>❤️</span>
          <span>💬</span>
          <span>📤</span>
        </div>
        <p className='pl-3'>
            {Math.floor(Math.random()*5000)} Likes
        </p>

        <p className='p-1 pl-3 pt-0 text-black font-semibold text-sm'
        >{post.username}<span className='font-light text-black ml-2'>{post.title}</span> </p>
      <p className='text-gray-700 text-sm p-1 pt-0 pl-3'> {post.body}</p>
    </div>
  )
}

export default PostCard