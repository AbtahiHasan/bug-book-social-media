import Image from "next/image";
import userPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, className, size }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl ?? userPlaceholder}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
      height={size ?? 48}
      width={size ?? 48}
      alt="User avatar"
    />
  );
};
export default UserAvatar;
