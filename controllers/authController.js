const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});
