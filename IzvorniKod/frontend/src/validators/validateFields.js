export const validateFields = (fields, handleSnackbarOpen) => {
  for (const field of fields) {
    const { value, validator, setError } = field;
    const error = validator(value);

    if (error) {
      if (setError) setError(error);
      handleSnackbarOpen(error);
      return false;
    }
  }

  return true;
};