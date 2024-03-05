export enum SearchParamSort {
  TotalUsedAsc = 'totalUsed:asc',
  TotalUsedDesc = 'totalUsed:desc',

  PublishedDateTimestampAsc = 'publishedDateTimestamp:asc',
  PublishedDateTimestampDesc = 'publishedDateTimestamp:desc',

  TitleAsc = 'title:asc',
  TitleDesc = 'title:desc',

  /** False -> True */
  OutdatedAsc = 'outdated:asc',

  /**
   * luminpdf.com: 1
   * others domain: 0
   */
  DomainIndexAsc = 'domainIndex:asc',
  DomainIndexDesc = 'domainIndex:desc',
}

/**
 * @description Follow this specs https://lumin.atlassian.net/wiki/spaces/LT/pages/1371963572/Filter+Sort
 */
export const SortType = {
  // MostPopular: [SearchParamSort.TotalUsedDesc, SearchParamSort.PublishedDateTimestampDesc, SearchParamSort.TitleAsc],
  // MostRecent: [SearchParamSort.PublishedDateTimestampDesc, SearchParamSort.TotalUsedDesc, SearchParamSort.TitleAsc],
};

export const START_OF_FILTER_DAY = '2022 July 01';
