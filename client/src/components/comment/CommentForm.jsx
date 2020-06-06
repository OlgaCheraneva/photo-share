import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addComment} from '../../actions/comments';

const CommentForm = ({
    auth: {loading, isAuthenticated},
    photoId,
    addComment,
}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') return;

        addComment({text, photoId});
        setText('');
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            onSubmit(e);
        }
    };

    return !loading && isAuthenticated ? (
        <form className="comment-form" onSubmit={onSubmit}>
            <textarea
                name="comment"
                placeholder="Add a comment..."
                className="comment-form-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
            ></textarea>
            <button type="submit" className="button comment-bt">
                Submit
            </button>
        </form>
    ) : (
        <span className="comment-form comment-form-not-auth">
            Authorize to add comments.
        </span>
    );
};

CommentForm.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
    }),
    photoId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    photoId: state.photos.photo.id,
});

export default connect(mapStateToProps, {addComment})(CommentForm);
