import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import { useUserContext } from '../UserContext';
import itemHasOldPassword from '~/utils/itemHasOldPassword';

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  const routes = [
    {
      path: Routes.PasswordHealth,
      items,
    },
    {
      path: Routes.Weak,
      items: items.filter(itemHasWeakPassword),
    },
    {
      path: Routes.Reused,
      items: items.filter((item) => itemHasReusedPassword(item, items)),
    },
    {
      path: Routes.Old,
      items: items.filter(itemHasOldPassword),
    },
  ];

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        {routes.map(({ path, items }) => (
          <Route exact path={path} key={path}>
            <List items={items} />
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default PasswordHealth;
