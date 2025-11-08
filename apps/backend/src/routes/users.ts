import { Router } from 'express';
import { PostgresUserProfileDataSource } from '../services/PostgresUserProfileDataSource';
import { AuthRequest, authenticateToken } from '../middleware/auth';

const router = Router();
const userProfileDataSource = new PostgresUserProfileDataSource();

// Get user profile
router.get('/:userId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;

    const profile = await userProfileDataSource.getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Update user profile
router.patch('/:userId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Ensure user can only update their own profile
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const profile = await userProfileDataSource.updateUserProfile(userId, updates);
    res.json({ profile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Search users
router.post('/search', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const filters = req.body;

    // Add tenant filtering if applicable
    if (req.tenantId) {
      filters.tenantId = req.tenantId;
    }

    const users = await userProfileDataSource.searchUsers(filters);
    res.json({ users });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

export default router;
