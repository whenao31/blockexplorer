import React, {useMemo, useEffect, } from 'react'
import { useTable, 
   usePagination, 
   useRowSelect} from "react-table";
import { useRowSelectColumn } from '@lineup-lite/hooks';
import { Button, PageButton } from '../contexts/Button'
import {DOTS, useCustomPagination} from './useCustomPagination';
import { Utils } from 'alchemy-sdk';


export function EthValue({value}) {
    return (
        <span className="items-center">
            {Utils.formatUnits(value)} ETH
        </span>
    );
} 

const TransactionsTable = ({blockWithTxs}) => {

    const data = useMemo(() => blockWithTxs.transactions );

    const columns = useMemo(() => [
        {
            Header: "Txn Hash",
            accessor: "hash"
        },
        {
            Header: "From",
            accessor: "from"
        },
        {
            Header: "To",
            accessor: "to"
        },
        {
            Header: "Confirmations",
            accessor: "confirmations"
        },
        {
            Header: "Value (ETH)",
            accessor: "value",
            Cell: EthValue
        },
    ]);

    const { getTableProps,
        getTableBodyProps, 
        headerGroups,
        rows, 
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        gotoPage,
        pageCount,
        setPageSize,
        state, } =
        useTable({
            columns,
            data,
        },
        // usePagination, 
        );

    // const {pageIndex} = state;
    // const paginationRange = useCustomPagination({
    //     totalPageCount: pageCount,
    //     currentPage: pageIndex
    // });
    // console.log(paginationRange);

    // useEffect(() => {
    //     setPageSize(20);
    // }, [setPageSize]);

    return (
        <>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-10">
                                {
                                    headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}
                                            className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                                            >
                                                {column.render("Header")}
                                                </th>
                                        ))}
                                    </tr>
                                    ))
                                }
                                </thead>
                                <tbody 
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200">
                                    {
                                        rows.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return <td {...cell.getCellProps()} className="px-6 py-10 whitespace-nowrap">{cell.render("Cell")}</td>
                                                })}
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="py-3 flex items-center text-center justify-center pt-10">
                <div className="flex-1 flex justify-between md:hidden">
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" aria-label="Pagination">
                <div className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10" aria-label="Pagination">
                    {paginationRange?.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <PageButton
                                key={index}>...</PageButton>
                            );
                        }

                        if ((pageNumber - 1) === pageIndex) {
                            return (
                                <PageButton
                                    key={index}
                                    className=' active:bg-gray-500 active:border-gray-300'
                                    onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
                            );
                        }

                        return (
                            <PageButton
                                key={index}
                                className='active:bg-gray-500 active:border-gray-300'
                                onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
                        );
                    })}
                </div>
                </div>
            </div> */}
        </>
    );
}

export default TransactionsTable;