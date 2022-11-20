import { NextPage } from 'next';
import { useIsAuthenticated } from '../providers/Auth';
import withConditionalRedirect from './withConditionalRedirect';
import { parseCookies } from 'nookies';

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth<P>(
  WrappedComponent: NextPage<P>,
  location = '/dashboard'
): NextPage<P> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      return useIsAuthenticated();
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
        const {token} = parseCookies(ctx);
        return !!token;
    }
  });
}