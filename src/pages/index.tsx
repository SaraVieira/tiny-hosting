import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { mutateAsync } = api.mdfiles.create.useMutation();
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  const newFileCreate = async () => {
    const newPost = await mutateAsync({ name: "My file from " + new Date() });
    router.push(`/new/${newPost.id}`);
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1>Tiny Hosting</h1>
      <Button size={"lg"} onClick={newFileCreate}>
        Create a new file
      </Button>
    </div>
  );
}
