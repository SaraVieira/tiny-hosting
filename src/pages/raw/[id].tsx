import { useNewId } from "~/hooks/useNewId";
import { api } from "~/utils/api";

export default function New() {
  const id = useNewId("/raw/");

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
