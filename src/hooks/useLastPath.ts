import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLastPath = (): string => {
  const { query, asPath, isReady } = useRouter();
  const a = asPath.split("/")[asPath.split("/").length -1] as string
  const [id, setId] = useState(a);

  useEffect(() => {
    if (!isReady) {
      setId(a);
    } else {
      setId((query.id as string) || (a));
    }
  }, [isReady]);

  return id;
};
