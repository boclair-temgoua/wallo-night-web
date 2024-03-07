import { useDebounce } from '@/utils';
import { useState } from 'react';
import { useAuth } from '../util/context-user';

export function useInputState() {
  const [fromAt, setFromAt] = useState<any>(null);
  const [toAt, setToAt] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [extension, setExtension] = useState<'xlsx' | 'csv'>('xlsx');
  const initTime = fromAt?.$d?.toISOString();
  const endTime = toAt?.$d?.toISOString();

  const { userStorage, ipLocation, profile } = useAuth() as any;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );

  const handleClearDate = () => {
    setFromAt(null);
    setToAt(null);
  };

  const handleChangeExtension = (event: any) => {
    setExtension(event.target.value);
  };

  const handleSetSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(event.target.value);
  };

  const newSearch = useDebounce(search, 500);

  const linkHref = typeof window !== 'undefined' ? window.location.href : null;
  return {
    fromAt,
    setFromAt,
    toAt,
    setToAt,
    search: newSearch,
    setSearch,
    extension,
    setExtension,
    initTime,
    endTime,
    handleClearDate,
    handleChangeExtension,
    handleSetSearch,
    success,
    loading,
    isOpen,
    hasErrors,
    setIsOpen,
    setLoading,
    setSuccess,
    setHasErrors,
    userStorage,
    ipLocation,
    profile,
    linkHref,
  };
}
