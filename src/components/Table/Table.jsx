import {React ,useMemo} from 'react'
import { useTable,useGlobalFilter , useFilters} from 'react-table';
import { Column } from './Column.jsx';
import { GlobalFilter  } from './GlobalFilter';

function Table() {
    const students = [
        { roll: 1, name: "Amit", marks: 94, age: 23 },
        { roll: 2, name: "Riya", marks: 92, age: 23 },
        { roll: 3, name: "John", marks: 88, age: 18 },
        { roll: 4, name: "Sara", marks: 90, age: 18 },
        { roll: 5, name: "Michael", marks: 85, age: 17 },
        { roll: 6, name: "Sophia", marks: 95, age: 18 },
        { roll: 7, name: "Daniel", marks: 87, age: 17 },
        { roll: 8, name: "Olivia", marks: 93, age: 18 },
        { roll: 9, name: "David", marks: 89, age: 17 },
        { roll: 10, name: "Emma", marks: 91, age: 18 },
        { roll: 11, name: "James", marks: 86, age: 17 },
        { roll: 12, name: "Isabella", marks: 94, age: 18 },
        { roll: 13, name: "Benjamin", marks: 88, age: 17 },
        { roll: 14, name: "Mia", marks: 92, age: 18 },
        { roll: 15, name: "Elijah", marks: 90, age: 17 },
        { roll: 16, name: "Liam", marks: 85, age: 18 },
        { roll: 17, name: "Noah", marks: 87, age: 17 },
        { roll: 18, name: "William", marks: 92, age: 18 },
        { roll: 19, name: "Lucas", marks: 89, age: 17 },
        { roll: 20, name: "Henry", marks: 91, age: 18 },
        { roll: 21, name: "Alexander", marks: 93, age: 18 },
        { roll: 22, name: "Charlotte", marks: 88, age: 17 },
        { roll: 23, name: "Ava", marks: 90, age: 18 },
        { roll: 24, name: "Harper", marks: 94, age: 17 },
        { roll: 25, name: "Evelyn", marks: 87, age: 18 },
        { roll: 26, name: "Abigail", marks: 86, age: 17 },
        { roll: 27, name: "Emily", marks: 85, age: 18 },
        { roll: 28, name: "Ella", marks: 92, age: 17 },
        { roll: 29, name: "Madison", marks: 88, age: 18 },
        { roll: 30, name: "Scarlett", marks: 91, age: 17 }
      ];
      
      
   
       const col = useMemo(() => Column , [])
       const data = useMemo(() => students , [])

     const  {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
      } =  useTable({
         columns : col,
         data : data,
      }, useFilters,
     useGlobalFilter);

  const {globalFilter} = state      

  return (
  
    <>
      <GlobalFilter/>
     <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((header) => (
              <th {...header.getHeaderProps()}>{header.render("Header")}
                   <div>{header.canFilter ? header.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default Table

function handleApplyNow(student) {
    // Handle the "Apply Now" button click
    console.log('Applying for:', student);
  }