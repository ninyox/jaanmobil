import { useEffect, useRef, useState } from "react";
import { FaCamera, FaPaperPlane, FaPaperclip, FaPlane } from "react-icons/fa";
import { timeAgo } from "../worker/page.js";
import { TiWarning } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import { SaveImages } from "./log.js";
import Imagebox from "@/components/imagebox/page.js";
import Loader from "../loader/loader.jsx";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import Chatoption from "@/modals/forumoption/page.js";
import useLongPress from "./press.js"

const userd = typeof window !== "undefined" ? window.localStorage.getItem("userid") : false;

export default function SupportScreen({ submit, receivedData,optiondelete }) {
  const fileInput = useRef(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);
  const [imageurl, setImageurl] = useState([]);
  const [openImage, setOpenimage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageprop, setImageProp] = useState([]);
  const [option, setOption] = useState(false);
  const [report, setReport] = useState(false);
  const [x, setX] = useState(53);
  const [y, setY] = useState(9);
  const [optionprop, setOptionprop] = useState(null);
  const textref = useRef(null);
  const handleUpload = async () => {
    setLoader(true)
    try {
      const response = await SaveImages(images);
      const load = {
        text: "",
        imageurl: response,
        type: "image",
      };
      submit(load);
      setSelected(false)
    } catch (error) {
      alert("Error uploading Image");
    } finally {
      setLoader(false)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text === "" && selected === false) {
        return;
      }
      if (selected) {
        handleUpload();
      }
      if(text !== ''){
        const load = {
          imageurl: "",
          text: text,
          type: "message",
        };
        submit(load);
        setText("");
      }
     
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [receivedData]);
  useEffect(() => {
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
      }
    };
    handleScroll();
  }, [receivedData, submit]);
  const handleFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = Array.from(e.target.files);
    setImages(selectedFile[0]);
    if (e.target.files.length < 1) {
      alert("Its typically recommended to upload more than a picture");
    }
    const url = selectedFile.map((file) => URL.createObjectURL(file));
    setImageurl(url);
    setSelected(true);
  };
  const removeImage = (prop) => {
    const newImages = imageurl.filter((item) => item !== prop);
    setImageurl(newImages);
  };
  const handleDiv = () => {
    fileInput.current?.click();
  };
  useEffect(() => {
    if (selected && imageurl.length < 1) {
      setSelected(false);
    }
  }, [imageurl]);
  const OpenImage = (prop) => {
  const propArray = [prop]
    setImageProp(propArray);
    setOpenimage(true);
  };
  const handleLong = (e, messager) => {
    const rect = e.target.getBoundingClientRect();
    setX(rect.left);
    setY(rect.top);
    setOptionprop(messager);
    setOption(true);
  };

  const longPressProps = useLongPress({
    onLongPress: (event, item) => handleLong(event, item),
    onClick: (event, item) => handleLong(event, item),
  });


  

  return (
    <>
      <section className="w-full bg-white flex-grow flex flex-col justify-between dark:bg-gray-900 relative">
        <div className="viewport flex h-4/5 flex-col w-full overflow-auto">
          
          {receivedData?.map((item, index) => {
            return (
              <div
              key={index}
              className={`msgbox flex items-center w-full h-auto px-2 py-2 ${
                item.sender === userd ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`min-w-20 w-3/5 lg:w-2/5 h-auto flex justify-end ${
                  item.sender === userd ? "flex-row" : "flex-row-reverse"
                } `}
              >
                <div className="min-w-20 w-4/5 h-auto block">
                  <span
                    className={`flex justify-end min-h-4 h-auto w-full ${
                      item.sender === userd ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <p className="text-sm font-intermedium text-blue-600">
                      {item.sendername}
                    </p>
                    <p className="">&nbsp;~&nbsp;</p>
                  </span>
                  <div
                    onMouseDown={(e) => longPressProps.onMouseDown(e, item)}
                    onTouchStart={(e) => longPressProps.onTouchStart(e, item)}
                    onMouseUp={(e) => longPressProps.onMouseUp(e, item)}
                    onMouseLeave={(e) => longPressProps.onMouseLeave(e, item)}
                    onTouchEnd={(e) => longPressProps.onTouchEnd(e, item)}
                    //onClick={(e) => handleLong(e, item)}
                    onDoubleClick={(e) => handleLong(e, item)}
                    onContextMenu={(e) => {
                     e.preventDefault();
                     handleLong(e, item)
                    } }
                    className={`${
                      item.sender === userd ? "bg-blue-500 rounded-tr-none" : "bg-slate-500 rounded-tl-none"
                    } min-w-20 rounded-[5px] w-auto h-auto min-h-10 px-3 py-3 mb-2`}
                  >
                    {item.type === "message" ? (
                      <p className="text-white font-intermedium  text-sm whitespace-pre-wrap">
                        {item.message}
                      </p>
                    ) : (
                      <img src={item.imageurl} className="rounded-md my-2" onClick={() => OpenImage(item.imageurl)} />
                    )}
                  </div>
                  <span className="flex justify-end min-h-3 h-auto w-full">
                    <p className="text-[11px] text-black">
                      {timeAgo(item.date)}
                    </p>
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full mx-2 mt-4">
                  <img src={item.senderimage || "emoticon.png"} className="rounded-full" />
                </span>
              </div>
            </div>
            )
          })}
          <p ref={textref}></p>
        </div>
        <div className="justify-center flex-col flex py-2 w-full bottom-0 absolute">
          {selected && (
            <div className="flex overflow-y-hidden flex-nowrap h-28 px-1 w-full rounded-md overflow-x-auto whitespace-nowrap py-3 justify-end">
              {imageurl.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="h-full w-24 block relative flex-shrink-0 mr-2 scroll-m-0"
                  >
                    {" "}
                    {/* Removed inline-block */}
                    <div className="absolute top-0 left-0 bg-opacity-10 bg-mycolor w-full h-5 justify-end px-2 flex">
                      <MdCancel
                        size={20}
                        className="fill-black"
                        onClick={() => removeImage(items)}
                      />
                    </div>
                    <img
                      onClick={() => OpenImage(items)}
                      src={items}
                      className="w-full h-full object-cover rounded-md"
                    />{" "}
                    {/* Added object-cover */}
                  </div>
                );
              })}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full border-slate-300 dark:border-slate-700 border-t min-h-14 h-auto items-center justify-around p-2 bg-white dark:bg-gray-900"
          >
            <span className="flex items-center rounded-full p-2 flex-grow justify-between dark:bg-gray-900">
              <textarea
                value={text}
                className="w-9/12 h-auto min-h-4 bg-transparent text-sm font-inter outline-none items-center flex flex-col dark:bg-gray-900 dark:border-none"
                onChange={(e) => setText(e.target.value)}
                aria-multiline
                placeholder="Input message to send"
              />
              <div className="w-auto h-auto bg-slate-200 dark:bg-slate-700 p-2 rounded-[40px] mx-2">
              <FiPaperclip
                size={22}
                className="bg-transparent"
                onClick={() => handleDiv()}
              />
              </div>
             
            </span>

            <div className="w-auto h-auto bg-slate-200 p-2 rounded-[40px] mx-2 dark:bg-slate-700">
              <IoPaperPlaneOutline
                size={20}
                type="submit"
                onClick={handleSubmit}
              />
            </div>
            <input
              type="file"
              ref={fileInput}
              accept="image/jpeg , image/png"
              style={{ display: "none" }}
              onChange={handleFileChange}
              
            />
          </form>
        </div>
      </section>
      {openImage && (
        <Imagebox image={imageprop} cancel={(e) => setOpenimage(!e)} />
      )}
      {loader && <Loader />}
      {option && (
          <Chatoption
            close={() => setOption(false)}
            xpos={x}
            ypos={y}
            messageid={optionprop === null ? {} : optionprop}
            deletemsg={(ide) => optiondelete(ide)}
          />
        )}
    </>
  );
}
