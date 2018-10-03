export class Pagination {
  private _currPage: number;
  private _pageSize: number;

  constructor(page = 1, size = 5) {
    this.currPage = page;
    this.pageSize = size;
  }

  get currPage(): number {
    return this._currPage;
  }

  set currPage(value: number) {
    this._currPage = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }
}
