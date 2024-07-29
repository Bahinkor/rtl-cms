import React from 'react';
import CommentsTable from '../../Components/CommentsTable/CommentsTable';

export default function Comments() {
    //JSX
    return (
        <div className="mt-[60px] md:p-5 rounded-xl">
            <CommentsTable/>
        </div>
    );
}