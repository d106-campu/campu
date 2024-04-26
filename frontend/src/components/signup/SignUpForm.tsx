import { useState } from 'react';
import { ISignUpFormValues } from '@/types/auth';
import Button from '@/components/@common/Button/Button';
import InputField from '@/components/@common/Input/InputField';

interface ILoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
}

const SignUpForm = ({ isSmallScreen, toggleForm }: ILoginFormProps): JSX.Element => {

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

  // 유효성 검사 함수
  const validateForm = () => {
    let isValid = true;
    const newErrors: ISignUpFormValues = { id: '', nickName: '', password: '', confirmPassword: '', phone: '' };

    const idRegex = /^[a-zA-Z0-9]+$/;
    if (!values.id) {
      newErrors.id = '아이디를 입력해주세요.';
      isValid = false;
    } else if (values.id.length < 6 || values.id.length > 16) {
      newErrors.id = '아이디는 6자 이상이어야 합니다.';
    } else if (!idRegex.test(values.id)) {
      newErrors.id = '영문자와 숫자 조합으로 설정해주세요.';
      isValid = false;
    }

    const nickNameRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (!values.nickName) {
      newErrors.nickName = '닉네임을 입력해주세요.';
      isValid = false;
    } else if (values.nickName.length < 2 || values.nickName.length > 8) {
      newErrors.nickName = '닉네임은 2자 이상 8자 이하여야 합니다.';
      isValid = false;
    } else if (!nickNameRegex.test(values.nickName)) {
      newErrors.nickName = '특수문자, 띄워쓰기는 사용할 수 없습니다.';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(values.password)) {
      newErrors.password = '영문자, 숫자, 특수문자 조합으로 설정해주세요.';
      isValid = false;
    }

    if (values.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
      isValid = false;
    }

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(values.phone)) {
      newErrors.phone = '휴대폰 번호를 정확히 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 회원가입 클릭 시 유효성 검사 함수에 대해 분기 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('회원가입 성공함');
    } else {
      console.log('회원가입 실패함', errors);
    }
  };

  // 사용자가 input에 입력하는 값 추적
  const handleChange = (field: keyof ISignUpFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
  };


  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof ISignUpFormValues; placeholder: string; maxLength: number; type?: string }> = [
    { label: '아이디', name: 'id', placeholder: '아이디는 6~16자 이내로 해주세요.', maxLength: 16 },
    { label: '닉네임', name: 'nickName', placeholder: '닉네임은 8자 이내로 해주세요.', maxLength: 8 },
    { label: '휴대폰 번호', name: 'phone', placeholder: '본인의 전화번호를 입력해주세요.', maxLength: 11 },
    { label: '비밀번호', name: 'password', placeholder: '비밀번호는 영문자, 숫자, 특수문자를 포함한 8자 이상입니다.', maxLength: 20, type: 'password' },
    { label: '비밀번호 확인', name: 'confirmPassword', placeholder: '비밀번호를 한번 더 입력해주세요.', maxLength: 20, type: 'password' }
  ];

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-[100%] h-[75vh] flex items-center justify-center rounded-2xl shadow-2xl bg-white relative">
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
            <form onSubmit={handleSubmit} className='space-y-1'>
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
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;