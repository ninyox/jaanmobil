import Image from "next/image";
import { MdSearch } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Humanicon, Penicon } from "../icons/icons";
import { useAuth } from "@/store/authstore";
import { useRouter } from "next/navigation";
import Authmodal from "../authmodal/page";
import useModal from "@/store/modal";

export default function Header({ search }) {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { authValue } = useAuth();
  // const { headclick,penclick } = props;
  const router = useRouter();
  const handleRoute = (prop) => {
    if (authValue) {
      router.push(prop);
    } else {
      handleOpenModal();
    }
  };
  return (
    <>
      <div className="w-full h-auto flex flex-col py-4 px-4 border-b border-slate-300 bg-white">
        <div className="logotop w-full h-auto pb-2 flex justify-between">
          <img src="/logo.png" className="w-40" />
          <div className="iconbox flex mx-2 items-center justify-between w-3/12 h-auto">
            <Penicon click={() => handleRoute("/post")} />
            <Humanicon click={() => handleRoute("/profile")} />
          </div>
        </div>
        <div className="w-full h-auto flex flex-row items-center">
          <div className="inputbox border border-slate-300 rounded-[30px] flex items-center py-2 h-auto px-2 w-full">
            <CiSearch size={20} className="fill-slate-700 mx-2" />
            <input
              type="search"
              onChange={(e) => search(e.target.value)}
              className="outline-none font-inter w-full h-full text-sm"
              placeholder="Search for a product or category"
            />
          </div>
        </div>
      </div>
      {showModal && <Authmodal close={handleCloseModal} />}
    </>
  );
}
