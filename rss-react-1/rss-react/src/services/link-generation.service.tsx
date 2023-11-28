export const generateLink = (
  pageNumber: number,
  pageSize: number,
  search: string,
  id?: string
) => {
  return id
    ? `/?search=${search}&page=${pageNumber}&limit=${pageSize}&id=${id}`
    : `/?search=${search}page=${pageNumber}&pageSize=${pageSize}`;
};
