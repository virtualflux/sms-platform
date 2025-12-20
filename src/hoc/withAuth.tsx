'use client'

import { ReactNode, ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Loader from "@/components/ui/Loader";

interface WithAuthProps {
  children?: ReactNode;
}

export function withAuth<T extends object>(WrappedComponent: ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAppSelector(state => state.auth);

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/auth/accounts/login");
      }
    }, [isAuthenticated, loading, router]);

    if (!isAuthenticated) {
      return <Loader/>;
    }

    return <WrappedComponent {...props} />;
  };
}
