import { BsFillChatTextFill } from "react-icons/bs";
export default function Supportbox({click}) {
    return(
        <>
        <div className="fixed md:absolute w-12 h-12 rounded-full bg-mycolor animate-bounce bottom-10 right-5 flex items-center justify-center cursor-pointer " onClick={() => click()}>
            <BsFillChatTextFill className="fill-white" size={22} />
        </div>
        </>
    )
}