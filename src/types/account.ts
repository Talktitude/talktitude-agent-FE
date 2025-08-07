export interface EditFormPropsType {
  userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  };
  onEditChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ProfileImagePropsType {
  profileImageUrl: string;
  onChangePhoto: () => void;
}

export interface ChangePasswordFormPropsType {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
  onPasswordChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
