import { ReactNode } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';

import graphql from 'babel-plugin-relay/macro';
import { useRefetchableFragment } from 'react-relay';
import { AuthGuardFragment$key } from './__generated__/AuthGuardFragment.graphql';
import { AuthGuardRefetchQuery } from './__generated__/AuthGuardRefetchQuery.graphql';
import { Unauthorized } from './Unauthorized';

const AuthGuardFragment = graphql`
  fragment AuthGuardFragment on Viewer
  @refetchable(queryName: "AuthGuardRefetchQuery") {
    me {
      id
    }
  }
`;

export interface AuthGuardProps {
  publicRoutes: string[];
  userResult: AuthGuardFragment$key;
  renderAllowed: (refresh: () => void) => ReactNode;
}

export function AuthGuard({
  renderAllowed,
  publicRoutes,
  userResult,
}: AuthGuardProps) {
  const [data, refetchFragment] = useRefetchableFragment<
    AuthGuardRefetchQuery,
    AuthGuardFragment$key
  >(AuthGuardFragment, userResult);
  const location = useLocation();

  const loggedIn = !!data?.me;
  const isPublicRoute = !!publicRoutes.find(
    (route) => route === location.pathname
  );

  const refetch = () => {
    refetchFragment({}, { fetchPolicy: 'network-only' });
  };

  if (!isPublicRoute && !loggedIn) {
    return <Unauthorized />;
  }

  return <>{renderAllowed(refetch)}</>;
}

type RouterContext = {
  refresh: () => void;
};

export function useAuthUserRefresh() {
  return useOutletContext<RouterContext>();
}
