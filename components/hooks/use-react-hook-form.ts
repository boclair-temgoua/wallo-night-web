import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useReactHookForm = (options: { schema: any }) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const { schema } = options;
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    isDirty,
    isValid,
    isSubmitting,
    setHasErrors,
  };
};

export { useReactHookForm };
