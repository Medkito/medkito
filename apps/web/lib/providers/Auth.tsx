import React, { Component, ReactNode, ReactElement } from "react";

type AuthContext = {
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const AuthProvider = ({
  children,
  authenticated,
}: {
  children: ReactNode;
  authenticated: boolean;
}): ReactElement => {
  const [isAuthenticated, setAuthenticated] =
    React.useState<boolean>(authenticated);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}

export const withAuthInfo = (WrappedComponent) =>
  class AuthWrapper extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const UntypedComponent = WrappedComponent as any;
      return (
        <AuthContext.Consumer>
          {(userContext) => (
            <UntypedComponent
              {...this.props}
              isAuth={userContext.isAuthenticated}
              setAuthenticated={userContext.setAuthenticated}
            />
          )}
        </AuthContext.Consumer>
      );
    }
  };
