import * as Yup from 'yup';
export const LoginSchema = Yup.object<Login>({
    membershipNumber: Yup.number()
      .required('Please enter your membership number'),
    password: Yup.string()
      .required('Please enter your password'),
  });

export class Login {
    membershipNumber : number;
    password: string;
    //login: string = 'Login';
}


