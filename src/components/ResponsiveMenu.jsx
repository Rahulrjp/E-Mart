import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ResponsiveMenu({ openNav, setOpenNav }) {
    const { user } = useUser();
    return (
        <div className={`${openNav ? 'left-0' : '-left-[100%]'} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                <div className='flex flex-col items-start justify-start gap-3'>
                    <div className='flex gap-2'>
                        {
                            user ? <UserButton size={50} /> : <FaUserCircle size={50} />
                        }
                        <div className='flex items-center'>
                            <div className='text-xl text-gray-700 mx-2 font-semibold'>{user ? <h1>Hello , {user.firstName}
                                <p className='text-sm text-slate-500'>Premium User</p>
                            </h1> : <SignInButton className="bg-red-500 px-3 py-1 rounded-md text-white cursor-pointer" />}</div>
                            
                        </div>
                    </div>
                    <nav className='mt-12'>
                        <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                            <Link to={'/'} onClick={() => setOpenNav(false)} className={` cursor-pointer`}><li>Home</li></Link>
                            <Link to={'products'} onClick={() => setOpenNav(false)} className={` cursor-pointer`}><li>Products</li></Link>
                            <Link to={'/about'} onClick={() => setOpenNav(false)} className={` cursor-pointer`}><li>About</li></Link>
                            <Link to={'contact'} onClick={() => setOpenNav(false)} className={` cursor-pointer`}><li>Contact</li></Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveMenu