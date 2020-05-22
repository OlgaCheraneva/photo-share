import React, {Fragment} from 'react';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

import './Comment.css';

const CommentContainer = () => {
    const d = new Date();
    const comments = [
        {
            userId: '123456789',
            text: 'Тестовый комментарий',
            date: d.toLocaleString(),
        },
    ];

    return (
        <Fragment>
            <CommentList comments={comments} />
            <CommentForm />
        </Fragment>
    );
};

export default CommentContainer;
