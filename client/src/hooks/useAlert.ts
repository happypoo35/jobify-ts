import { useEffect, useState } from "react";

export type Alert = {
  isSuccess: boolean;
  message: string;
} | null;

const useAlert = () => {
  const [alert, setAlert] = useState<Alert>(null);

  useEffect(() => {
    if (!alert) return;
    setTimeout(() => setAlert(null), 2000);
  }, [alert]);

  return { alert, setAlert };
};

export default useAlert;
