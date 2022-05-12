interface PaginationInterface {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: SortInterface;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface SortInterface {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
