import PropTypes from 'prop-types';

const InputBookDesc = ({ register, errors }) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-desc">
        本の概要
      </label>
      <textarea
        id="book-desc"
        placeholder="本の概要"
        {...register("description", {
          required: "本の概要を入力してください。",
        })}
      />
      {errors.description && (
        <div className="error-msg">{errors.description.message}</div>
      )}
    </>
  );
};

InputBookDesc.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    description: PropTypes.shape({
      message: PropTypes.string
    })
  })
};

export default InputBookDesc;
