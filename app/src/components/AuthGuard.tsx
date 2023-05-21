import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay';
import { AuthGuardFragment$key } from './__generated__/AuthGuardFragment.graphql';
import { Button, Result } from 'antd';

const AuthGuardFragment = graphql`
  fragment AuthGuardFragment on UserResult {
    ... on User {
      id
    }
  }
`;

export interface AuthGuardProps {
  publicRoutes: string[];
  children: ReactNode;
  userResult: AuthGuardFragment$key;
}

export function AuthGuard({
  children,
  publicRoutes,
  userResult,
}: AuthGuardProps) {
  const user = useFragment(AuthGuardFragment, userResult);
  const location = useLocation();
  const navigate = useNavigate();

  const loggedIn = !!user?.id;
  const isPublicRoute = !!publicRoutes.find(
    (route) => route === location.pathname
  );

  if (!isPublicRoute && !loggedIn) {
    return (
      <Result
        title="Unauthorized"
        status="403" // TODO there is no 401, I'll reuse the 403 icon
        subTitle="You must be authenticated to access this page."
        extra={
          <Button type="primary" onClick={() => navigate('./login')}>
            Login
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
}
