export const LOGIN_ERROR_MESSAGES = {
  EMPTY_LOGIN: '아이디와 비밀번호를 모두 입력해주세요.',
  INVALID_LOGIN: '아이디 또는 비밀번호가 올바르지 않습니다.',
};

export const SIGNUP_ERROR_MESSAGES = {
  EMPTY_SIGNUP: '필수 입력 항목입니다.',
  DUPLICATE_ID: '이미 사용 중인 아이디입니다.',
  ID_NOT_CHECKED: '아이디 중복 확인을 해주세요.',
  WEAK_PASSWORD: '비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.',
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  INVALID_NAME: '이름은 2자 이상 입력해주세요.',
  INVALID_PHONE: '전화번호는 숫자만 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 주소 형식이 아닙니다.',
};

export const PASSWORD_CHANGE_ERROR_MESSAGES = {
  EMPTY_CURRENT_PASSWORD: '현재 비밀번호를 입력해주세요.',
  EMPTY_NEW_PASSWORD: '새 비밀번호를 입력해주세요.',
  EMPTY_NEW_PASSWORD_CONFIRM: '새 비밀번호 확인을 입력해주세요.',
  WEAK_PASSWORD: '비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '새 비밀번호가 일치하지 않습니다.',
  SAME_AS_CURRENT: '새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.',
};
