import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useNewId = (path = "/new/"): string => {
  const { query, asPath, isReady } = useRouter();
  const [id, setId] = useState(asPath.split(path)[1] as string);

  useEffect(() => {
    if (!isReady) {
      setId(asPath.split(path)[1] as string);
    } else {
      setId((query.id as string) || (asPath.split(path)[1] as string));
    }
  }, [isReady]);

  return id;
};
