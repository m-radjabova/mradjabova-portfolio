import { useEffect, useState } from "react";

function useLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Match the one-pass Lottie timing so the intro finishes naturally.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return {
    loading,
  };
}

export default useLoading;
