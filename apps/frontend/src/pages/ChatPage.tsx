import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { socketService } from '../services/socket';
import { matchmakingApi, userApi } from '../services/api';

export const ChatPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!matchId) return;

    // Connect socket
    socketService.connect();
    socketService.joinMatch(matchId);

    // Load match details
    loadMatchDetails();

    // Listen for new messages
    socketService.onNewMessage((message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    // Listen for typing indicator
    socketService.onUserTyping((data) => {
      if (data.userId !== currentUserId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      socketService.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  const loadMatchDetails = async () => {
    if (!matchId) return;

    try {
      const { match } = await matchmakingApi.getMatch(matchId);
      const otherUserId = match.userId1 === currentUserId ? match.userId2 : match.userId1;
      
      const { profile } = await userApi.getProfile(otherUserId);
      setOtherUser(profile);
    } catch (error) {
      console.error('Error loading match details:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !matchId) return;

    const message = {
      matchId,
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date(),
    };

    socketService.sendMessage(matchId, message);
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleTyping = () => {
    if (matchId && currentUserId) {
      socketService.sendTyping(matchId, currentUserId);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center gap-4">
          {otherUser?.avatarUrl ? (
            <img
              src={otherUser.avatarUrl}
              alt={otherUser.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-xl text-white font-bold">
                {otherUser?.displayName?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
          )}
          <div>
            <h2 className="font-bold text-lg">{otherUser?.displayName || 'Loading...'}</h2>
            {isTyping && <p className="text-sm text-gray-500">Typing...</p>}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId;
              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      isCurrentUser
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-primary-200' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleTyping}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
