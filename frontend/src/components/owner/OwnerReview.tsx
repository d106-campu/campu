const OwnerReview = ({
  selectCampground,
}: {
  selectCampground: string | null;
}) => {
  return (
    <>
      <div>{selectCampground}리뷰 관리</div>
    </>
  );
};

export default OwnerReview;
