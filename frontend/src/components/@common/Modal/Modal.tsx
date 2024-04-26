import { PropsWithChildren, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface IModalProps {
  width: string;
  margin?: string;
  padding?: string;
  rounded?: string;
  isBackgroundColorDark?: boolean;
  contentBackgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  width,
  margin,
  padding = "p-5",
  rounded = "rounded-lg",
  isBackgroundColorDark = true,
  contentBackgroundColor,
  textColor,
  iconColor,
  onClose,
  children,
}: PropsWithChildren<IModalProps>) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중단
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  // isBackgroundColorDark 값에 따라 색상 변경
  const actualIconColor =
    iconColor || (isBackgroundColorDark ? "black" : "white");

  const actualTextColor =
    textColor || (isBackgroundColorDark ? "text-black" : "text-white");

  const actualContentBackgroundColor =
    contentBackgroundColor ||
    (isBackgroundColorDark ? "bg-white" : "bg-black/90");

  return (
    <>
      {/* 전체 화면을 덮는 반투명 배경 구성 */}
      <div
        className={`fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[99]
        ${isBackgroundColorDark ? "bg-black/70" : "bg-white/50"} `}
        onClick={handleClose}
      />
      {/* 모달창*/}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]
        ${width} ${padding} ${margin} ${rounded} ${actualContentBackgroundColor} ${actualTextColor} 
        ${isRendering ? "animate-modalOpen" : "animate-modalClose"}
        `}
      >
        {/* 닫기 버튼 */}
        <div className=" flex justify-end cursor-pointer" onClick={handleClose}>
          <IoCloseOutline color={actualIconColor} size={25} />
        </div>

        {/*모달 내용 */}
        {children}
      </div>
    </>
  );
};

export default Modal;
