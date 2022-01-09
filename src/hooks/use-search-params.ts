import {useLocation} from 'react-router-dom';
import {browserHistory} from '../services/browser-history';
import {useCallback, useMemo} from 'react';

type SearchRecord = Record<string, string>;

type ReturnType = [
  searchParams: URLSearchParams,
  setSearchParams: (params: SearchRecord) => void,
];

function useSearchParams(): ReturnType {
  const location = useLocation();
  const search = location.search;
  const pathname = location.pathname;
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = (params: Record<string, string>) => {
    Object.entries(params).forEach(([name, value]) => {
      searchParams.set(name, value);
    });

    browserHistory.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  const setSearchParamsMemo = useCallback(setSearchParams, [searchParams, pathname]);

  return [searchParams, setSearchParamsMemo];
}

export {
  useSearchParams
};
