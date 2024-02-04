interface Props {
  type: string;
  required: boolean;
  message?: string;
  register: any;
  errors: any;
  label: string;
  placeholder?: string;
  id: string;
  minLength?: number;
}

const Inputs = ({
  type,
  required,
  message,
  register,
  errors,
  label,
  placeholder,
  id,
  minLength,
}: Props) => {
  return (
    <div className="flex flex-col ">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className={`border px-4  outline-none py-2 rounded-md ${
          errors[id]?.message ? "border-red-800" : "border-slate-800"
        }

            ${
              errors[id]?.message
                ? "focus:border-rose-400"
                : "focus:border-slate-300"
            }
             
            `}
        type={type}
        {...register(id, {
          required: {
            value: required ? true : false,
            message,
          },
          minLength: minLength
            ? {
                value: minLength,
                message: "Password should be at least 6 character",
              }
            : null,
        })}
      />
      {errors[id]?.message && (
        <p className="text-rose-800 font-semibold text-xs mt-1 capitalize">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default Inputs;
