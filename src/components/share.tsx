import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/router";

export function PresetShare() {
  const { id } = useRouter().query;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share</h3>
        </div>
        <div className="flex flex-col space-y-4 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">Raw Markdown</Label>
            <div className="flex items-center gap-2">
              <Input
                id="link"
                defaultValue={`https://raw.md.tinyhosting.dev/f/${id}`}
                readOnly
                className="h-9"
              />
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">HTML Page</Label>
            <div className="flex items-center gap-2">
              <Input
                id="link"
                defaultValue={`https://pretty.md.tinyhosting.dev/f/${id}`}
                readOnly
                className="h-9"
              />
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
