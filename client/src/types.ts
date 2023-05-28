import { useFormik } from 'formik';

export type UseFormik = ReturnType<typeof useFormik>;
export type FormStatus = 'FILLED' | 'NOT_FILLED';
export type FormikValues = { [key: string]: string[] | string };
