import { api } from "~/utils/api";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import type { MarkdownFile } from "@prisma/client";
import { useCallback, useState } from "react";
import { debounce } from "lodash-es";
import dynamic from "next/dynamic";
import { useNewId } from "~/hooks/useNewId";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false },
);

export const Editor = ({ data }: { data?: MarkdownFile }) => {
  const id = useNewId();
  const { mutateAsync } = api.mdfiles.update.useMutation();
  const [value, setValue] = useState(data?.content || "");

  const onChange = useCallback(
    debounce((value: string) => {
      mutateAsync({
        content: value,
        id,
      });
    }, 500),
    [],
  );

  return (
    <>
      <MDEditor
        height={"100%"}
        visibleDragbar={false}
        value={value}
        onChange={(value) => {
          if (value) {
            setValue(value);
            onChange(value);
          }
        }}
      />
    </>
  );
};
