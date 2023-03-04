import React, { useState } from 'react'
import {DocumentMagnifyingGlassIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import { hashOrNumber, isEmpty } from '../utils/utils';

export const SearchBlockBar = ({blockNo, alchemy, blockWithTxs, setBlockWithTxs}) => {

    const [blockId, setBlockId] = useState("");
    
    async function getBlockDetails() {
        const myBlockid = isEmpty(blockId) ? blockNo : hashOrNumber(blockId);
        const response = await alchemy.core.getBlockWithTransactions(myBlockid);
        setBlockWithTxs(response);
    }

    function handleChange(event) {
        setBlockId(event.target.value);
    }

    return (
        <>
            <div className="flex items-center">
                <div className="flex space-x-1">
                    <input
                        type="text"
                        className="block w-full px-4 py-2 text-blue-400 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search block..."
                        value={blockId}
                        onChange={handleChange}
                    />
                    <button 
                        className="px-4 text-white bg-gray-300 rounded-full "
                        onClick={getBlockDetails}
                        type="button"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    )
}
