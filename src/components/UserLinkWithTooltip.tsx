"use client";

import kyInstance from "@/lib/ky";
import { TUser } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import Link from "next/link";
import UserTooltip from "./UserTooltip";

interface UserLinkWithTooltipProps extends React.PropsWithChildren {
  username: string;
}
const UserLinkWithTooltip = ({
  username,
  children,
}: UserLinkWithTooltipProps) => {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<TUser>(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404) false;
      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return <Link href={`/users/${username}`}>{children}</Link>;
  }

  //   return <UserToo;
  return (
    <UserTooltip user={data}>
      <Link
        className="text-primary hover:underline"
        href={`/users/${username}`}
      >
        {children}
      </Link>
    </UserTooltip>
  );
};

export default UserLinkWithTooltip;
