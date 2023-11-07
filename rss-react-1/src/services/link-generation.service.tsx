export const generateLink = (pageNumber:number, pageSize:number, id?: number) => {
  return id ? `${id}?page=${pageNumber}&pageSize=${pageSize}` 
    : `/?page=${pageNumber}&pageSize=${pageSize}`
}