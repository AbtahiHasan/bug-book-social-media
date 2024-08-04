import React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};
