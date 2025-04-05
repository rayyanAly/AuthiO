import express from 'express';
import {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    registerUser,
    updateUser,
    updateUserProfile,
    forgotPassword,
	resetPassword,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// User Routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Admin Routes
router.route('/')
    .get(protect, admin, getUsers);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
