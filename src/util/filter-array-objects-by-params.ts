export const filterArrayObjectsByParams = <T>(
  items: T[],
  filterParams: Partial<T>
): T[] => {
  let result: T[] = [];
  Object.keys(filterParams).forEach((item) => {
    result.push(
      ...items.filter(
        (coin) => coin[item as keyof T] === filterParams[item as keyof T]
      )
    );
    // result = items.filter(
    //   (coin) => coin[item as keyof T] === filterParams[item as keyof T]
    // );
  });
  return result;
};
