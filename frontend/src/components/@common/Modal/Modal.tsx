import { PropsWithChildren, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface IModalProps {
  width: string;
  contentBackgroundColor?: string;
  isBackgroundColorDark?: boolean;
  padding?: string;
  rounded?: string;
  margin?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  width,
  padding = "p-5",
  rounded = "rounded-lg",
  contentBackgroundColor = "bg-white",
  isBackgroundColorDark = true,
  margin,
  onClose,
  children,
}: PropsWithChildren<IModalProps>) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);

    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <>
      {/* 전체 화면을 덮는 투명 혹은 반투명 배경 구성 */}
      <div
        className={`absolute w-full h-full top-0 left-0 right-0 bottom-0 
        ${isBackgroundColorDark ? "bg-black/70" : "bg-white/50"}`}
        onClick={handleClose}
      />
      {/* 모달창*/}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        ${width} ${padding} ${margin} ${rounded} ${contentBackgroundColor} 
        ${!isBackgroundColorDark && "text-white"} 
        ${isRendering ? "animate-modalOpen" : "animate-modalClose"}
        `}
      >
        {/* 닫기 버튼 */}
        <div className=" flex justify-end cursor-pointer" onClick={handleClose}>
          <IoCloseOutline color={contentBackgroundColor} size={25} />
        </div>

        {/*모달 내용 */}
        {children}
      </div>
    </>
  );
};

export default Modal;
