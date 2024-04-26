import { useState } from 'react';
import { ILoginFormValues } from '@/types/auth';
import Button from '@/components/@common/Button/Button';
import InputField from '@/components/@common/Input/InputField';

interface ILoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
}

const LoginForm = ({ isSmallScreen, toggleForm }: ILoginFormProps): JSX.Element => {
  const [values, setValues] = useState<ILoginFormValues>({
    id: '',
    password: '',
  });

  const [errors, setErrors] = useState<ILoginFormValues>({
    id: '',
    password: '',
  });

  // 로그인 유효성 검사 함수
  const validateLoginForm = () => {
    let isValid = false;
    let newErrors = { id: '', password: '' };

    if (!values.id) {
      newErrors.id = '아이디를 입력해주세요.';
      isValid = true;
    }

    if (!values.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = true;
    }

    if (!isValid) {
      // @TODO : 여기서 api 통신 연결 -> 아이디, 비번 틀렸을 때의 유효성 처리 필요
      console.log('백엔드측으로 로그인 요청함');
    }

    setErrors(newErrors);
    return isValid;
  }

  // 로그인 클릭 시 유효성 검사 함수에 대해 분기 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLoginForm()) {
      console.log('로그인 성공함');
    } else {
      console.log('로그인 실패함', errors);
    }
  };

  // 사용자가 input에 입력하는 값 추적
  const handleInputChange = (name: keyof ILoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{ label: string; name: keyof ILoginFormValues; placeholder: string; type: string }> = [
    { label: '아이디', name: 'id', placeholder: '아이디를 입력하세요.', type: 'text' },
    { label: '비밀번호', name: 'password', placeholder: '비밀번호를 입력하세요.', type: 'password' }
  ];

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-[75vh] flex items-center justify-center rounded-2xl shadow-2xl bg-white relative">
          <div className="w-[80%]">
            {/* 헤더 */}
            <p
              className={isSmallScreen ? "cursor-pointer visible text-centerfont-bold text-xs absolute top-3 left-10" : "invisible"}
              onClick={toggleForm}
            >
              &lt; 회원가입
            </p>
            <div className="w-full p-3 flex items-center justify-center">
              <p className="text-center font-bold text-xl">
                로그인
              </p>
            </div>
            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className='space-y-2'>
              {fields.map(field => (
                <InputField
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={handleInputChange(field.name)}
                  error={errors[field.name]}
                />
              ))}
              <div className="flex flex-col justify-center items-center py-5 ">
                <Button
                  type='button'
                  text='비밀번호를 잊으셨나요?'
                  textSize='text-[15px]'
                  textColor='text-gray-400'
                  hoverTextColor='hover:text-black'
                  backgroundColor='none'
                  fontWeight='none'
                  hoverBackgroundColor='none'
                  padding='py-10'
                />
                <Button
                  type="submit"
                  text="로그인"
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

export default LoginForm;