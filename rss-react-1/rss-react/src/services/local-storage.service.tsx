export const getLocalSearchParam = (): string => {
  const param = localStorage.getItem('searchParam');
  if (param) return param;
    return '';
};

export const setLocalSearchParam = (param: string): void => {
  localStorage.setItem('searchParam', param);
  console.log('set!!!');
  
};