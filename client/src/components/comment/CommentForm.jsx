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

        addComment({text, photoId});
        setText('');
    };

    return (
        !loading &&
        isAuthenticated && (
            <form className="comment-form" onSubmit={onSubmit}>
                <img src="/user.svg" alt="user" className="img-user" />
                <div className="comment-add">
                    <textarea
                        name="comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button>Submit</button>
                </div>
            </form>
        )
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
