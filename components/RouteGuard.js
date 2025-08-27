import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];


export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  async function authCheck(url) {
    const path = url.split('?')[0];
      console.log(" authCheck -> URL:", url, " | Path:", path);

    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            console.log(" Not authenticated. Redirecting to /login");
      setAuthorized(false);
      router.push('/login');
    } else {
      if (!favouritesList) setFavouritesList(await getFavourites());
      if (!searchHistory) setSearchHistory(await getHistory());
         console.log(" Authenticated or public path, allowing access");
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
