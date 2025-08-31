"use client"
import React,{useState,useEffect} from 'react'
import { MdCancel } from 'react-icons/md'
import { Rings } from 'react-loader-spinner'
const Pending = ({social,content,reason,id}) => {
    const [load,setLoad] = useState(true)
    const [perror,setPerror] = useState(false)
    const fetchList = () =>{
      setTimeout(() => {
       setLoad(false)
       setPerror(true)
      },3000)
    }
    useEffect(() =>{
     fetchList()
    },[])
  return (
    <main className='w-full h-auto flex flex-col'>
     {load &&
        <Loading />
     }
     {
        perror && 
        <Error social={social} />
     }
     <section className={`${load && !perror ? "hidden" :"flex"} flex-col`}>

     </section>
    </main>
  )
}

const Loading = ({social}) =>(
    <main className='w-full flex flex-col items-center'>
    <span className=''>
        <Rings visible height="120" width="120" className="fill-violet-500" />
    </span>
    <p className='Loading ...'></p>
    </main>
)

const Error = ({social}) =>(
    <main className='w-full flex flex-col items-center py-20'>
    <span className=''>
        <MdCancel size={100} className='fill-red-500 ' />
    </span>
    <p className='text-center text-[12px] text-red-600 px-2'>Your {social} Profile is not yet verified, you need to verify your profile before you can start earning</p>
    </main>
)

export default Pending;