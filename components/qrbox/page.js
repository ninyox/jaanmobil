import { MdCancel, MdClose } from "react-icons/md";
import QRCode from "react-qr-code";

export default function Qrbox({ image, cancel }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <main className="w-screen h-screen fixed inset-0 flex flex-col justify-center bg-black">
        <header className="fixed top-0 w-full h-12 flex justify-end px-3 py-2">
          <MdClose size={35} className="fill-white" onClick={cancel} />
        </header>
        <div className="flex h-full w-full rounded-md  whitespace-nowrap py-3 items-center justify-center">
 
                <div className="h-auto w-auto block relative flex-shrink-0 mr-2 scroll-m-0 bg-white p-2 items-center justify-center">
                <QRCode value={image} size={256} viewBox="0 0 256 256" />
                </div>
        </div>
        
      </main>
    </>
  );
}
