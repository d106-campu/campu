import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setNickname } from '@/features/login/authSlice';
import { ISignUpFormValues } from '@/types/auth';
import Button from '@/components/@common/Button/Button';
import InputField from '@/components/@common/Input/InputField';
import { useSignup } from '@/hooks/auth/useSignup';
import { checkIdDuplicate, checkNicknameDuplicate } from '@/services/auth/api';

interface ILoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
  phoneVerified: boolean; // 인증 성공 여부 확인
  resetPhoneVerification: () => void; // 인증 상태 초기화
  openCertificationModal: (phone: string) => void; // 모달을 여는 함수
  closeCertificationModal: () => void; // 모달을 닫는 함수
}

const SignUpForm = ({
  isSmallScreen,
  toggleForm,
  phoneVerified,
  resetPhoneVerification,
  openCertificationModal,
  // closeCertificationModal,
}: ILoginFormProps): JSX.Element => {
  const { signupMutation, sendVerificationCode, checkPhone } = useSignup();
  // const dispatch = useDispatch();
  // 폼 입력 값 상태 관리
  const [values, setValues] = useState<ISignUpFormValues>({
    id: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  // 유효성 통과 실패하면 오류 메세지 관리
  const [errors, setErrors] = useState<ISignUpFormValues>({
    id: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  // 사용자가 입력하는 input 값 실시간 유효성 검사
  const validateField = async (field: keyof ISignUpFormValues, value: string) => {
    let message = '';
    if (value) {
      switch (field) {
        case 'id':
          if (value.length < 6 || value.length > 16) {
            message = '아이디는 6~16자 이내로 해주세요.';
          } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            message = '영문자와 숫자 조합으로 설정해주세요.';
          } else {
            const res = await checkIdDuplicate(value);
            message = res.data.available ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.';
          }
          break;
        case 'nickName':
          if (value.length < 2 || value.length > 8) {
            message = '닉네임은 2~8자 이내로 해주세요.';
          } else if (!/^[가-힣a-zA-Z0-9]+$/.test(value)) {
            message = '특수문자, 띄워쓰기는 사용할 수 없습니다.';
          } else {
            const res = await checkNicknameDuplicate(value);
            message = res.data.available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.';
          }
          break;
        case 'password':
          if (value.length < 8) {
            message = '비밀번호는 8자 이상이어야 합니다.';
          } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
            message = '영문자, 숫자, 특수문자 조합으로 설정해주세요.';
          } else {
            message = '올바른 비밀번호가 설정되었습니다.';
          }
          if (values.confirmPassword && value !== values.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
          }
          break;
        case 'confirmPassword':
          if (value !== values.password) {
            message = '비밀번호가 일치하지 않습니다.';
          } else {
            message = '비밀번호가 일치합니다.';
          }
          break;
        case 'phone':
          if (!/^\d{11}$/.test(value)) {
            message = '휴대폰 번호는 11자리 숫자여야 합니다.';
          }
          break;
      }
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // 회원가입 클릭 시 유효성 검사 함수에 대해 분기 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 회원가입 필드가 올바른 상태 메시지를 포함하고 있는지 검사
    const allFieldsValid = Object.values(errors).every(
      error => [
        '사용 가능한 아이디입니다.',
        '사용 가능한 닉네임입니다.',
        '올바른 비밀번호가 설정되었습니다.',
        '비밀번호가 일치합니다.',
        '인증 성공!'
      ].includes(error)
    );

    if (allFieldsValid && phoneVerified && values.confirmPassword === values.password) {
      // 회원가입 API 연결
      signupMutation.mutate({
        account: values.id,
        nickname: values.nickName,
        tel: values.phone,
        password: values.password,
        passwordCheck: values.confirmPassword
      }, {
        onSuccess: (res) => {
          console.log('회원가입 성공함 !:', res);
          // @TODO: 회원가입 성공 모달 띄우고 로그인폼으로 이동시키기
        },
        onError: (error) => {
          console.error('회원가입 에러발생 ㅠ:', error);
        }
      });
    } else {
      console.log('회원가입 실패함 !:', errors);
    }
  };

  // 사용자가 input에 입력하는 값 추적
  const handleChange = (field: keyof ISignUpFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // 인증이 완료된 경우, 휴대폰 번호 수정을 막음
    if (field === 'phone' && phoneVerified) {
      return;
    }

    // 휴대폰 번호 적는 곳에는 숫자만 입력하도록 함
    if (field === 'phone' && value === '' || /^\d+$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    } else if (field !== 'phone') {
      setValues(prev => ({ ...prev, [field]: value }));
      validateField(field, value); 
    }
  };


  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof ISignUpFormValues; placeholder: string; maxLength: number; type?: string }> = [
    { label: '아이디', name: 'id', placeholder: '아이디는 6~16자 이내로 해주세요.', maxLength: 16 },
    { label: '닉네임', name: 'nickName', placeholder: '닉네임은 8자 이내로 해주세요.', maxLength: 8 },
    { label: '휴대폰 번호', name: 'phone', placeholder: '숫자만 입력해주세요.', maxLength: 11 },
    { label: '비밀번호', name: 'password', placeholder: '비밀번호는 영문자, 숫자, 특수문자를 포함한 8자 이상입니다.', maxLength: 20, type: 'password' },
    { label: '비밀번호 확인', name: 'confirmPassword', placeholder: '비밀번호를 한번 더 입력해주세요.', maxLength: 20, type: 'password' }
  ];

  // 휴대폰 인증 버튼이 작동될 때 한번 더 따로 유효성 검사
  const handleCertificationClick = async () => {
    if (values.phone.length === 11) {
      // 휴대폰 번호 중복 확인 요청 API 호출 -> checkPhone 호출
      checkPhone.mutate(values.phone, {
        onSuccess: (res) => {
          if (res.data.available) {
            // 번호 중복 검사가 통과하면 인증번호 전송 api 요청 -> sendVerificationCode 호출
            sendVerificationCode.mutate(values.phone, {
              onSuccess: () => {
                console.log('인증 번호 전송 성공!');
                openCertificationModal(values.phone);
              },
              onError: (error) => {
                console.error('인증 번호 전송 실패:', error);
                setErrors(prev => ({ ...prev, phone: '인증번호 전송 실패! 다시 시도해주세요.' }));
              }
            });
          } else {
            setErrors(prev => ({ ...prev, phone: '이미 등록된 휴대폰 번호입니다.' }));
          }
        },
        onError: (error) => {
          console.error('휴대폰 번호 중복 확인 에러:', error);
          setErrors(prev => ({ ...prev, phone: '휴대폰 인증을 실패했습니다. 다시 확인해주세요.' }));
        }
      });
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: '휴대폰 번호는 11자리 숫자여야 합니다.'
      }));
    }
  };

  // 휴대폰 인증 버튼 작동시키기
  const phoneCertificationButton = (
    <Button
      text="인 증"
      disabled={phoneVerified} // 인증 성공 시 버튼 비활성화하기
      textSize='text-[12.5px]'
      width='w-16'
      height='h-8'
      onClick={handleCertificationClick} // 클릭하여 인증번호 입력 모달 열기
      textColor="text-white"
      borderRadius="rounded-md"
      visible={!phoneVerified}
    />
  )

  useEffect(() => {
    Object.keys(values).forEach((field) => {
      validateField(field as keyof ISignUpFormValues, values[field as keyof ISignUpFormValues]);
    });
  }, [phoneVerified]);

  // 인증 성공 상태 확인
  useEffect(() => {
    // 인증 성공 메시지도 errors 객체에 저장하여 동일하게 사용함
    if (phoneVerified) {
      setErrors(prev => ({ ...prev, phone: '인증 성공!' }));
    } else {
      // 인증이 되지 않았을 때는 에러 메시지 초기화
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  }, [phoneVerified]);


  // 사용자가 페이지를 벗어났다가 돌아왔을 때 인증 상태를 초기화
  useEffect(() => {
    return () => {
      resetPhoneVerification();
    };
  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-[100%] h-auto flex items-center justify-center rounded-2xl shadow-2xl bg-white relative">
          <div className="w-[80%]">
            {/* 헤더 */}
            <div className="h-[30px] pt-8 flex items-center justify-center">
              <p className="text-center font-bold text-xl">
                회원가입
              </p>
            </div>
            <p
              className={isSmallScreen ? "cursor-pointer visible text-centerfont-bold text-xs absolute top-3 right-10" : "invisible"}
              onClick={toggleForm}
            >
              로그인 &gt;
            </p>
            <div className=''>
              {fields.map(field => (
                <InputField
                  key={field.name}
                  label={field.label}
                  type={field.type || 'text'}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange(field.name as keyof ISignUpFormValues)}
                  placeholder={field.placeholder}
                  error={errors[field.name]}
                  maxLength={field.maxLength}
                  certificationButton={field.name === 'phone' ? phoneCertificationButton : undefined }
                />
              ))}
              {/* 회원가입 시도 */}
              <div className="flex flex-col justify-center items-center py-5">
                <Button
                  type="submit"
                  text="회원가입"
                  textSize='text-md'
                  width='w-full'
                  borderRadius='rounded-md'
                  padding='px-auto'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;