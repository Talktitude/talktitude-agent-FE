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
}

export interface ProfileImagePropsType {
  profileImageUrl: string;
  onChangePhoto: () => void;
}
