const NotificationIcon = ({
  hasNotification,
}: {
  hasNotification: boolean;
}) => {
  return (
    <div className="flex justify-center flex-grow relative cusor-pointer mx-1 px-4 py-2  hover:bg-SUB_GREEN_01 rounded-md">
      <div className="flex items-center justify-center  text-sm  hover:text-MAIN_GREEN">
        알림
      </div>
      {hasNotification && (
        <span className="absolute top-1 right-8 block h-2.5 w-2.5 rounded-full bg-MAIN_GREEN border-2 border-white"></span>
      )}
    </div>
  );
};
export default NotificationIcon;
