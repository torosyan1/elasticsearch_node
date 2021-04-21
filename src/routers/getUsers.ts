import { UserModel } from '../database/models/userModule';

export const getUsers = (req, res) =>
    UserModel.find({}, (err, users) => {
        if (err) throw err;
        res.json(users);
    });
