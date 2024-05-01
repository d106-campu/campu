interface ICampSiteTitleProps {
  types: string[];
  campsiteName: string;
}

const CampSiteTitle = ({ types, campsiteName }: ICampSiteTitleProps) => {
  return (
    <>
      {/* 캠핑장 이름 */}
      <div className="pt-7">
        {types.map((type, index) => (
          <span key={index} className="text-UNIMPORTANT_TEXT_01">
            {type}
            {index < types.length - 1 && (
              <span className="text-UNIMPORTANT_TEXT_01 p-1">·</span>
            )}
          </span>
        ))}
        <h1 className="font-bold text-3xl">{campsiteName}</h1>
      </div>
    </>
  );
};
export default CampSiteTitle;
