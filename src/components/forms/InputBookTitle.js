import PropTypes from 'prop-types';

const InputBookTitle = ({ register, errors }) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-title">
        本のタイトル
      </label>
      <input
        type="text"
        id="book-title"
        placeholder="タイトル"
        {...register("title", {
          required: "タイトルを入力してください。",
          maxLength: { value: 10, message: `10文字以内で入力してください。` },
        })}
      />
      {errors.title && <div className="error-msg">{errors.title.message}</div>}
    </>
  );
};

InputBookTitle.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.shape({
      message: PropTypes.string
    })
  })
};

export default InputBookTitle;
