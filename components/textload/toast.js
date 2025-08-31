'use client'
import { FaXmark } from "react-icons/fa6";
import {motion} from "framer-motion"
import { IoMdCheckmarkCircle, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCancel, MdVerified } from "react-icons/md"
import { useRef } from "react";
import { ColorRing } from "react-loader-spinner";
const TextLoad = ({ text, onClose }) => {
    const click = useRef(null)
    const handleClick =(event) =>{
        if (click.current === event.target) {
            onClose()
        }
    }
    return (
        <div ref={click} onClick={(event) => handleClick(event)} className="fixed w-screen h-screen backdrop-blur-sm inset-0 flex flex-col items-center justify-center">
            <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 200 }}
            transition={{ duration: 0.5 }}
             className="w-10/12 rounded-md min-h-24 h-auto bg-white flex items-center border-2 border-mycolor box-border justify-around md:w-1/3">
                <span className="w-full h-auto overflow-x-auto flex items-center justify-center">
                    <p className="font-intermedium text-slate-900 text-center dark:text-slate-300">{text || "Loading . . ."}</p>
                    <ColorRing visible height="40" width="40" colors={['#e15b64']} />
                </span>

            </motion.div>
        </div>
    )
};

export default TextLoad;