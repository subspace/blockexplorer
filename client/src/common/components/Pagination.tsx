import { FC } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

//
import { DOTS, usePagination } from 'common/hooks/usePagination'

type Props = {
  nextPage: () => void
  previousPage: () => void
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount: number
  handleGetPage: (page: string | number) => void
}

const Pagination: FC<Props> = ({
  previousPage,
  nextPage,
  currentPage,
  pageSize,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  handleGetPage,
}) => {
  const paginationRange = usePagination({ totalCount, pageSize, currentPage })

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={previousPage}
          disabled={!hasPreviousPage}
          className='relative inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className='rounded-full relative ml-3 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-end'>
        <div>
          <nav className='isolate inline-flex rounded-md' aria-label='Pagination'>
            <button
              onClick={previousPage}
              disabled={!hasPreviousPage}
              className='relative inline-flex items-center rounded-full border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 mr-[14px]'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {paginationRange.map((page, index) => {
              if (page === DOTS) {
                return (
                  <span
                    key={`${page}-${index}`}
                    className='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 rounded-full mx-1'
                  >
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  aria-current='page'
                  onClick={() => handleGetPage(page)}
                  className={
                    page === currentPage
                      ? 'h-10 min-w-10 relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 rounded-full mx-1'
                      : 'h-10 min-w-10 relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 rounded-full mx-1'
                  }
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={nextPage}
              disabled={!hasNextPage}
              className='relative inline-flex items-center rounded-full border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ml-[14px]'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
