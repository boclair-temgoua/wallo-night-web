import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.bubble.css'

interface QuillWrapperProps extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>;
}

const DynamicReactQuill = dynamic<QuillWrapperProps>(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);


interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  className: string;
  errors: { [key: string]: any };
  placeholder?: string;
  defaultValue?: string;
}

const TextareaReactQuillInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  className,
  placeholder = "",
  defaultValue,
}) => {

  return (
    <>
      {label ? <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}>
        {label}
      </label> : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: "Please enter post description"
        }}
        render={({ field: { ref, ...field } }) => (
          <DynamicReactQuill
            {...field}
            theme="snow"
            placeholder={placeholder}
            modules={{ toolbar: false }}
            className={`w-full ${className} px-full py-full border-none rounded-lg focus:outline-none focus:ring focus:border-blue-300`}
          />
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { TextareaReactQuillInput };
