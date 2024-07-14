import { ColumnFilter } from "./ColumnFilter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faBookmark, faEye } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

export const Column =[
    {
        Header : 'Roll no',
        accessor : 'roll',
        Filter : ColumnFilter,
    },
    {
        Header : 'Name',
        accessor : 'name',
        Filter : ColumnFilter,
    },

     {
        Header : 'Marks',
        accessor : 'marks',
        Filter : ColumnFilter,
    },
    {
        Header : 'Date of Birth',
        accessor : 'age',
        Filter : ColumnFilter,
    },
    {
        Header: 'Actions',
        accessor: 'actions',
        disableFilters: true, // Disable filters for the actions column
        Cell: ({ row }) => (
          <button onClick={() => handleApplyNow(row.original)} className="bg-blue-500 p-1 rounded-lg">
            Apply Now
          </button>
        ),
      },
      {
        Header: 'Bookmark',
        accessor: 'bookmark',
        disableFilters: true, // Disable filters for the bookmark column
        Cell: ({ row }) => (
          <div>
            <FontAwesomeIcon icon={faBookmark} />
            <FontAwesomeIcon  icon={faEye} />
          </div>
        ),
      },
]
