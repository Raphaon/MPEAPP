export type PaginationQuery = {
  page?: number;
  pageSize?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};

export const buildPagination = ({ page = 1, pageSize = 20 }: PaginationQuery) => ({
  skip: (page - 1) * pageSize,
  take: pageSize,
  page,
  pageSize
});

export function toPaginatedResponse<T>(data: T[], total: number, page: number, pageSize: number) {
  return { data, total, page, pageSize } satisfies PaginatedResponse<T>;
}
