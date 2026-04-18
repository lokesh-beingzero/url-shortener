import { User } from "../models/user/user.model.js";

export const getUserDetails = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error while fetching user details: ', error);
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}