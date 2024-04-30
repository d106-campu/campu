const OwnerReview = ({
  selectCampground,
}: {
  selectCampground: string | null;
}) => {
  return (
    <>
      <div className="py-5">
        <p className="p-4 font-semibold">
          <span className="text-MAIN_GREEN">{selectCampground}</span> 의 리뷰
          관리
        </p>
      </div>
    </>
  );
};

export default OwnerReview;
