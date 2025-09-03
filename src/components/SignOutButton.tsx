"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/src/lib/actions/auth.action";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success(result.message);
      router.push("/sign-in");
    } else {
      toast.error("Failed to sign out. Try again.");
    }
  };

  return (
    <div className="w-full shadow-md px-6 py-4 flex justify-end items-center">
      <Button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition-all"
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </div>
  );
}



