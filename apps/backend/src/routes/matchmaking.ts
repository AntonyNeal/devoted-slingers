import { Router } from 'express';
import { PostgresMatchmakingDataSource } from '../services/PostgresMatchmakingDataSource';
import { AuthRequest, authenticateToken } from '../middleware/auth';

const router = Router();
const matchmakingDataSource = new PostgresMatchmakingDataSource();

// Get potential matches for swiping
router.get('/potential', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 10;

    const potentialMatchIds = await matchmakingDataSource.getPotentialMatches(userId, limit);
    res.json({ userIds: potentialMatchIds });
  } catch (error) {
    console.error('Error getting potential matches:', error);
    res.status(500).json({ error: 'Failed to get potential matches' });
  }
});

// Record a swipe
router.post('/swipe', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const { targetUserId, action } = req.body;

    if (!targetUserId || !action || !['like', 'pass'].includes(action)) {
      return res.status(400).json({ error: 'Invalid swipe data' });
    }

    await matchmakingDataSource.recordSwipe({
      userId,
      targetUserId,
      action,
      timestamp: new Date(),
    });

    // Check if this created a match
    const match = await matchmakingDataSource.checkMatch(userId, targetUserId);

    res.json({ success: true, match: match ? true : false, matchData: match });
  } catch (error) {
    console.error('Error recording swipe:', error);
    res.status(500).json({ error: 'Failed to record swipe' });
  }
});

// Get user's matches
router.get('/matches', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const status = req.query.status as string | undefined;

    const matches = await matchmakingDataSource.getUserMatches(userId, status as any);
    res.json({ matches });
  } catch (error) {
    console.error('Error getting matches:', error);
    res.status(500).json({ error: 'Failed to get matches' });
  }
});

// Get match by ID
router.get('/matches/:matchId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { matchId } = req.params;

    const match = await matchmakingDataSource.getMatchById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json({ match });
  } catch (error) {
    console.error('Error getting match:', error);
    res.status(500).json({ error: 'Failed to get match' });
  }
});

// Update match status
router.patch('/matches/:matchId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const match = await matchmakingDataSource.updateMatchStatus(matchId, status);
    res.json({ match });
  } catch (error) {
    console.error('Error updating match:', error);
    res.status(500).json({ error: 'Failed to update match' });
  }
});

export default router;
