import { Separator } from "@radix-ui/react-separator";
import { debounce } from "lodash-es";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { Editor } from "~/components/Editor";
import { PresetActions } from "~/components/actions";
import { PresetShare } from "~/components/share";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { useNewId } from "~/hooks/useNewId";
import { api } from "~/utils/api";

export default function New() {
  const { data: sessionData } = useSession();
  const [fileName, setFileName] = useState("");
  const id = useNewId();
  const { toast } = useToast();

  const { data } = api.mdfiles.get.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!sessionData,
      staleTime: Infinity,
      onSettled: (data) => {
        if (data) setFileName(data?.name);
      },
    },
  );
  const { mutateAsync } = api.mdfiles.update.useMutation();

  const onChange = useCallback(
    debounce((name: string) => {
      mutateAsync({
        name,
        id: id,
      });
    }, 500),
    [],
  );

  return (
    <div className="hidden h-full flex-col md:flex">
      <div className="container flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <Input
            className="w-full"
            value={fileName}
            onChange={(e) => {
              onChange(e.target.value);
              setFileName(e.target.value);
            }}
          />
        </div>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <div className="hidden space-x-2 md:flex">
            <Button
              onClick={() => {
                mutateAsync({
                  id,
                  name: fileName,
                });
                toast({
                  title: "File Saved",
                });
              }}
              variant="secondary"
            >
              Save
            </Button>
            <PresetShare />
          </div>
          <PresetActions />
        </div>
      </div>
      <Separator />
      <div className="container h-full py-6">
        <div className="h-full" data-color-mode="dark">
          {data ? <Editor data={data} /> : null}
        </div>
      </div>
    </div>
  );
}
