import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setNickname } from "@/features/login/authSlice";
import { setIsProfileImage } from '@/features/mypage/myProfile';
import profileDefaultImage from "@/assets/images/profile.png";
import Button from "@/components/@common/Button/Button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IMyPhoneValues } from '@/types/profile';
import { ChangePhoneModal } from "@/components/my/profile/ChangePhoneModal";
import { ChangePasswordModal } from "@/components/my/profile/ChangePasswordModal";

interface IMyProfileProps {
  phoneVerified: boolean;
}

const MyProfile = ({
  phoneVerified
}: IMyProfileProps): JSX.Element => {
  const dispatch = useDispatch();
  const profileImage = useSelector((state: RootState) => state.profileImage.isProfileImage); // 프로필이미지 스토어에서 꺼내오기
  // const nickname = useSelector((state: RootState) => state.auth.nickname);  // 닉네임 스토어에서 꺼내오기

  // 폼 입력 값 상태 관리
  const [values, setValues] = useState<IMyPhoneValues>({
    nickName: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    verifyNums: '',
  });

  // 유효성 통과 실패하면 오류 메세지 관리
  const [errors, setErrors] = useState<IMyPhoneValues>({
    nickName: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    verifyNums: '',
  });

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false); // 휴대폰 변경 모달 관리Z
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false); // 비밀번호 변경 모달 관리

  const hasCustomImageRef = useRef<boolean>(false); // 프로필 이미지 변경했는지 추적 관리
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false); // 닉네임 수정 가능 상태 관리
  const [nicknameMessage, setNicknameMessage] = useState<string>(''); // 닉네임 유효성 통과 상태 관리
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState<boolean>(false); // 닉네임 유효성 통과 시에 상태 관리
  
  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false); // 기타정보 수정 가능 상태 관리
  const [gender, setGender] = useState<string>('여성');
  const [genderOpen, setGenderOpen] = useState<boolean>(false); 
  const [age, setAge] = useState<string>('20대');
  const [ageOpen, setAgeOpen] = useState<boolean>(false);
  const genderRef = useRef(null);
  const ageRef = useRef(null);

  // "닉네임"에서 수정 버튼을 클릭해야 수정이 가능하도록
  const handleEditNicknameClick = () => {
    if (isEditingNickname && nicknameMessage === '사용 가능한 닉네임입니다.') {
      // 닉네임을 성공적으로 변경 후에는 에러 메시지를 초기화
      setErrors(prevErrors => ({
        ...prevErrors,
        nickName: '',
      }));
      dispatch(setNickname(values.nickName)); // 수정된 닉네임 다시 전역 업데이트
      setNicknameMessage('');
      setIsEditingNickname(false); // 닉네임 수정 종료시키기
    } else {
      setIsEditingNickname(prevState => !prevState);
    }
  };

  // "닉네임" 수정 시 input 추적해서 유효성 검사
  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues(prev => ({ ...prev, nickName: value }));
    validateField('nickName', value); // 닉네임 유효성 검사와 연결
    setIsSaveButtonEnabled(nicknameMessage  === '사용 가능한 닉네임입니다.');
  };


  // 실시간 사용자가 입력하는 프로필 수정 input 값 유효성 검사
  const validateField = (field: keyof IMyPhoneValues, value: string) => {
    let message = '';
    if (value) {
      switch (field) {
        case 'nickName':
          if (value.length < 2 || value.length > 8) {
            message = '닉네임은 2~8자 이내로 해주세요.';
          } else if (!/^[가-힣a-zA-Z0-9]+$/.test(value)) {
            message = '특수문자, 띄워쓰기는 사용할 수 없습니다.';
          } else {
            message = '사용 가능한 닉네임입니다.';
          }
          setNicknameMessage(message);
          break;
      }
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // "기타정보"에서 수정 버튼을 클릭해야 수정이 가능하도록
  const handleEditInfoClick = () => {
    setIsEditingInfo(prevState => !prevState);
  };

  // "기타정보"에서 상태 변경 후 "저장" 버튼 클릭 시 처리
  const handleSaveInfoClick = () => {
    // @TODO: 여기서 백엔드와 연결 후 서버에 변경된 성별과 연령을 저장.
    setIsEditingInfo(false);
  };


  // 휴대폰 번호 변경 모달 열기
  const handlePhoneModalOpen = () => {
    setIsPhoneModalOpen(true);
  };

  // 휴대폰 번호 변경 모달 닫기
  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
    // 모달이 닫힐 때 휴대폰 번호와 인증번호 관련 상태 및 오류 상태 초기화
    setValues(prev => ({
      ...prev,
      phone: '',
      verifyNums: '',
    }));
    setErrors(prev => ({
      ...prev,
      phone: '',
      verifyNums: '',
    }));
  };

  // 비밀번호 변경 모달 열기
  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  }

  // 비밀번호 변경 모달 닫기
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    // 모달 닫힐 때 비밀번호, 비밀번호 확인 관련 상태와 오류 메세지 초기화
    setValues(prev => ({
      ...prev,
      password: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setErrors(prev => ({
      ...prev,
      password: '',
      newPassword: '',
      confirmPassword: '',
    }));
  }

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // 선택된 파일
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성

    // FileReader로 파일을 읽고, 읽은 URL을 프로필 이미지 상태에 설정
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      hasCustomImageRef.current = true; // 사용자가 이미지를 바꿨다면 true로 추적
      dispatch(setIsProfileImage(imageDataUrl)); // 스토어에 전역 관리해주기
    };

    if (file) {
      reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
    }
  };

  // "기본 사진" 버튼 클릭 시
  const handleSetDefaultImage = () => {
    hasCustomImageRef.current = false; // 사용자가 이미지를 기본으로 변경했음을 추적
    dispatch(setIsProfileImage(profileDefaultImage)); // 기본 이미지로 설정
  };

  // 드롭다운 메뉴 참조와 이벤트 객체 조정 -> 드롭다운 상태 관리
  const handleClickOutside = (event: MouseEvent, ref: React.RefObject<HTMLDivElement>, setter: (value: boolean) => void) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setter(false);
    }
  };

  // 클릭 이벤트 감지
  const onBodyClick = (event: MouseEvent) => {
    handleClickOutside(event, genderRef, setGenderOpen);
    handleClickOutside(event, ageRef, setAgeOpen);
  };

  // 클릭 이벤트 발생 될 때 드롭다운 외부 클릭 처리
  useEffect(() => {
    document.body.addEventListener('mousedown', onBodyClick);
    return () => {
      document.body.removeEventListener('mousedown', onBodyClick);
    };
  }, []);

  // 유효성 검사 Field에 대해 값들을 처리
  useEffect(() => {
    Object.keys(values).forEach((field) => {
      validateField(field as keyof IMyPhoneValues, values[field as keyof IMyPhoneValues]);
    });
  }, [phoneVerified]);


  return (
    <div>
      {/* 프로필 수정 헤더 */}
      <div className='flex flex-col pb-4'>
        <h1 className='text-lg font-bold'>
          프로필 설정
        </h1>
        <h1 className="text-sm text-gray-400">"유저 닉네임"님의 프로필을 변경할 수 있습니다.</h1>
      </div>

      {/* 아이디 + 닉네임 */}
      <div className="w-full flex justify-between">
        <div className="w-[50%] flex flex-col">
          <div className="pb-5">
            <h1 className="pb-2">아이디</h1>
            <input
              type="text"
              className="w-full h-[35px] pl-2 outline-none border-2 rounded-md bg-gray-100"
              disabled // 수정 불가능하게 막기
            />
          </div>
          <div className="pb-5">
            <div className="flex justify-between">
              <h1 className="pb-2">닉네임</h1>
              {/* 수정 또는 저장 버튼 제공 */}
              {isEditingNickname ? (
                <button
                  onClick={handleEditNicknameClick}
                  className="hover:text-MAIN_GREEN text-sm"
                  disabled={!isEditingNickname || !isSaveButtonEnabled}
                >
                  저 장
                </button>
              ) : (
                <button onClick={handleEditNicknameClick} className="hover:text-MAIN_GREEN text-sm">
                  수 정
                </button>
              )}
            </div>
            <input
              type="text"
              className={`w-full h-[35px] pl-2 outline-none border-2 rounded-md ${isEditingNickname ? '' : 'pointer-events-none'}`}
              disabled={!isEditingNickname}
              maxLength={8}
              value={values.nickName}
              onChange={handleChangeNickname}
            />
            <p className={`pl-2 pt-2 text-xs flex justify-end items-center ${nicknameMessage === '사용 가능한 닉네임입니다.' ? 'text-MAIN_GREEN' : 'text-red-500'}`}>{errors.nickName}</p> 
          </div>
        </div>
        {/* 프로필 이미지 */}
        <div className="w-[50%] flex flex-col items-center justify-center pr-10 pt-1">
          <img 
            src={profileImage || profileDefaultImage}
            alt="프로필 이미지" 
            className="w-[150px] h-[150px] object-cover object-center rounded-full"
            // onClick={() => {document.getElementById('imageUpload')?.click();}}
          />
          <div className="pt-2 flex justify-center">
            <div className="px-2 ">
              <Button 
                text="사진 변경"
                width="w-full"
                backgroundColor="bg-SUB_GREEN_01"
                textColor="text-MAIN_GREEN"
                hoverTextColor="text-green-700"
                hoverBackgroundColor="hover:bg-SUB_GREEN_02"
                padding="p-2"
                fontWeight="none"
                onClick={() => {document.getElementById('imageUpload')?.click();}}
              />
            </div>
            {/* 만약 이미지를 한번이라도 바꿨다면 "기본 사진"으로 바꿀 수 있는 버튼 제공 */}
            <div className="px-2 ">
              {profileImage !== profileDefaultImage && (
                <Button 
                  text="기본 사진"
                  width="w-full"
                  backgroundColor="bg-SUB_GREEN_01"
                  textColor="text-MAIN_GREEN"
                  hoverTextColor="text-green-700"
                  hoverBackgroundColor="hover:bg-SUB_GREEN_02"
                  padding="p-2"
                  fontWeight="none"
                  onClick={() => {
                    handleSetDefaultImage(); // 사용자가 이미지를 기본으로 변경했음을 추적
                    dispatch(setIsProfileImage(profileDefaultImage));
                  }}
                />
              )}
            </div>
          </div>
          {/* 이미지 업로드 */}
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload} // 파일 선택 시 이미지 업로드 핸들러 호출
          />
        </div>
      </div>

      {/* 휴대폰 번호 */}
      <div className="w-full flex flex-col pb-5">
        <h1 className="pb-2">휴대폰 번호</h1>
        <div className="flex items-center justify-start">
          <input
            type="text" 
            className="w-[25%] h-[35px] pl-2 outline-none border-2 rounded-md"
            disabled
          />
          <div className="pl-5 flex items-center  justify-center">
            <Button 
              text="전화번호 변경"
              width="w-full"
              backgroundColor="bg-SUB_GREEN_01"
              textColor="text-MAIN_GREEN"
              hoverTextColor="text-green-700"
              hoverBackgroundColor="hover:bg-SUB_GREEN_02"
              padding="p-2"
              fontWeight="none"
              onClick={handlePhoneModalOpen}
            />
          </div>
        </div>
      </div>

      {/* 휴대폰 번호 변경 모달 호출 */}
      {isPhoneModalOpen && (
        <ChangePhoneModal
          isOpen={isPhoneModalOpen}
          onClose={handlePhoneModalClose}
          phoneVerified={phoneVerified}
          values={values}
          errors={errors}
          setValues={setValues}
          setErrors={setErrors}
        />
      )}

      {/* 비밀번호 */}
      <div className="pb-10">
        <h1 className="pb-2">비밀번호</h1>
        <button
          className="h-[35px] p-2 rounded-md text-sm text-MAIN_GREEN hover:text-green-700 bg-SUB_GREEN_01 hover:bg-SUB_GREEN_02"
          onClick={handleOpenPasswordModal}
        >
          비밀번호 변경
        </button>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
          values={values}
          errors={errors}
          setValues={setValues}
          setErrors={setErrors}
        />
      )}

      {/* 추가 기타 정보 */}
      <div className="w-full">
        <div className="w-[50%] flex justify-between">
          <h1 className="pb-2">기타 정보</h1>
          {/* 수정 또는 저장 버튼 제공 */}
          {isEditingInfo ? (
            <button onClick={handleSaveInfoClick} className="hover:text-MAIN_GREEN text-sm">저 장</button>
          ) : (
            <button onClick={handleEditInfoClick} className="hover:text-MAIN_GREEN text-sm">수 정</button>
          )}
        </div>
        <div className="w-[50%] flex">
          <div className="flex items-center ">
            <h1 className="text-GRAY">성별</h1>
            <div className="pl-4 relative">
              <button
                onClick={() => { if (isEditingInfo) setGenderOpen(!genderOpen); }}
                className="flex items-center h-[35px] p-2 rounded-md text-sm text-MAIN_GREEN hover:text-green-700 bg-SUB_GREEN_01 hover:bg-SUB_GREEN_02 outline-none"
              >
                {gender}
                {isEditingInfo && <RiArrowDropDownLine size={25} />}
              </button>
              {genderOpen && (
                <ul ref={genderRef} className="absolute w-[70%] bg-white rounded-xl border-MAIN_GREEN z-10">
                  {["여성", "남성"].map((select, idx) => (
                    <li
                      key={idx}
                      onClick={() => { setGender(select); setGenderOpen(false); }}
                      className="p-2 hover:bg-SUB_GREEN_02 hover:text-MAIN_GREEN cursor-pointer text-center text-sm border-MAIN_GREEN rounded-xl"
                    >
                      {select}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex items-center pl-10">
            <h1 className="text-GRAY">연령</h1>
            <div className="pl-4 relative">
              <button
                onClick={() => { if (isEditingInfo) setAgeOpen(!ageOpen); }}
                className="flex items-center h-[35px] p-2 rounded-md text-sm text-MAIN_GREEN hover:text-green-700 bg-SUB_GREEN_01 hover:bg-SUB_GREEN_02 outline-none"
              >
                {age}
                {isEditingInfo && <RiArrowDropDownLine size={25} />}
              </button>
              {ageOpen && (
                <ul ref={ageRef} className="absolute w-[70%] bg-white rounded-xl z-10">
                  {["10대", "20대", "30대", "40대", "50대~"].map((select, idx) => (
                    <li
                      key={idx}
                      onClick={() => { setAge(select); setAgeOpen(false); }}
                      className="p-2 hover:bg-SUB_GREEN_02 hover:text-MAIN_GREEN cursor-pointer text-center text-sm rounded-xl"
                    >
                      {select}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;