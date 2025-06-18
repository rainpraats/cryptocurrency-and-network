import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import UserRepository from '../repositories/user-repository.mjs';

export const addUser = catchErrorAsync(async (req, res, next) => {
  const user = await new UserRepository().add(req.body);

  user.password = undefined;
  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { user: user } });
});

export const listUsers = catchErrorAsync(async (req, res, next) => {
  const users = await new UserRepository().list();

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: { users: users } });
});

export const listUsersBlocks = catchErrorAsync(async (req, res, next) => {
  const userId = req.user._id.toString();
  const usersBlocks = await new UserRepository().getBlocksByUser(userId);

  res.status(200).json({ success: true, statusCode: 200, data: usersBlocks });
});

export const listUsersTransactions = catchErrorAsync(async (req, res, next) => {
  const userId = req.user._id.toString();
  const usersTransactions = await new UserRepository().getTransactionsByUser(
    userId
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: usersTransactions,
  });
});
