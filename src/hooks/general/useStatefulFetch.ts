import { useState } from 'react';

const useStatefulFetch = <T>() => {
  const [state, setState] = useState<T>();

  return state;
};

export default useStatefulFetch;
