import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const CommentList = ({comments}) => {
    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <li className="comment-item" key={comment._id}>
                    <div className="comment-content">
                        <img src="/user.svg" alt="user" className="img-user" />
                        <a href="#!">{comment.userId}</a>
                        <div>{comment.text}</div>
                    </div>
                    <span>{new Date(comment.date).toLocaleString()}</span>
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
