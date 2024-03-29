import * as z from 'zod';

const useFormSchema = () => {
  const registerSchema = z.object({
    name: z
      .string({
        required_error: "Name can't be empty",
      })
      .min(3, { message: 'Name length should be bigger than 3' })
      .max(50, { message: 'Name length should be lower than 50' }),
    email: z.string({ required_error: "E-Mail can't be empty" }).email({
      message: 'Invalid email address',
    }),
    password: z
      .string({})
      .min(6, { message: 'Password length should be bigger than 6' }),
  });

  return { registerSchema };
};

export default useFormSchema;
