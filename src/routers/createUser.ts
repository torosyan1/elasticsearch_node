import { UserModel } from '../database/models/userModule';

export const createUser = async (req, res) => {
    const users = new UserModel(req.body);
    await users.save((err, user) => {
        if (err) throw err;
        res.json({ message: 'user saved!', user });
        // @ts-ignore
        user.on('es-indexed', (error) => {
            if (error) throw error;
            console.log('user indexed');
        });
    });
};
