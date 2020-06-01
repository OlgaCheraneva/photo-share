import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const CommentList = ({comments}) => {
    const onCommentTextClick = (id) => {
        const text = document.getElementById(id);
        text.classList.toggle('line-clamp');
    };

    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <li className="comment-item" key={comment._id}>
                    <div className="comment-content">
                        <a href={comment.profileURI}>
                            <img
                                src={comment.avatar}
                                alt="user"
                                className="img-user"
                            />
                        </a>
                        <a href={comment.profileURI} className="comment-user">
                            {comment.username}
                        </a>
                    </div>
                    <div
                        id={comment._id}
                        className="comment-text line-clamp"
                        onClick={() => onCommentTextClick(comment._id)}
                    >
                        <span className="comment-text-wrapper">
                            {comment.text}
                        </span>
                    </div>
                    <span className="comment-stamp">
                        {new Date(comment.date).toLocaleString()}
                    </span>
                </li>
            ))}
        </ul>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    comments: state.photos.photo.comments,
});

export default connect(mapStateToProps)(CommentList);
