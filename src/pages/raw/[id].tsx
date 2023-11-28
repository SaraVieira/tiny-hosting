import { useLastPath } from "~/hooks/useLastPath";

import { api } from "~/utils/api";

export default function New() {
  const id = useLastPath();

  const { data } = api.mdfiles.get.useQuery({
    id,
  });

  return (
    <>
      <style jsx global>{`
        body {
          all: unset !important;
        }
      `}</style>
      <pre className="whitespace-pre-wrap break-words">{data?.content}</pre>
    </>
  );
}
