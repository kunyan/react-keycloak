import React, { useCallback } from 'react';
import { useLocalStorageState } from 'react-storage-hooks';
import Keycloak from 'keycloak-js';

import { KeycloakProvider } from '../lib';

import { AppRouter } from './routes';

const keycloak = new Keycloak();

const PersistedApp = () => {
    const [, setTokens] = useLocalStorageState('kcTokens');

    const onKeycloakTokens = useCallback(tokens => {
      console.log(new Date().toLocaleString(), 'onKeycloakTokens', { tokens });
      setTokens(tokens);
    }, [setTokens]);
    
    const onKeycloakEvent = useCallback((event, error) => {
      console.log(new Date().toLocaleString(), 'onKeycloakEvent', event, error);
      if (event === 'onAuthLogout') {
        setTokens({});
      }
    }, [setTokens]);

    return (
      <KeycloakProvider
        keycloak={keycloak}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens}
      >
        <AppRouter />
      </KeycloakProvider>
    );
  };

export default React.memo(PersistedApp);
