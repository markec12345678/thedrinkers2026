'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Beer, 
  Music, 
  MessageCircle, 
  Volume2, 
  VolumeX,
  Send,
  Users,
  Sparkles,
  ExternalLink,
  Disc
} from 'lucide-react';
import { getDiscordAuthUrl } from '@/lib/discord-api';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: Date;
  tier?: 'free' | 'fan' | 'vip' | 'og';
}

interface VirtualBarUser {
  id: string;
  username: string;
  avatar: string;
  x: number;
  y: number;
  status: 'online' | 'away' | 'busy';
}

export default function VirtualBar() {
  const [isConnected, setIsConnected] = useState(false);
  const [discordUser, setDiscordUser] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Pijemo ga radi');
  const [users, setUsers] = useState<VirtualBarUser[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const DRINKS = [
    { id: 'beer', name: 'Pivo', icon: '🍺', price: 5 },
    { id: 'wine', name: 'Vino', icon: '🍷', price: 6 },
    { id: 'cocktail', name: 'Koktajl', icon: '🍹', price: 8 },
    { id: 'whiskey', name: 'Whiskey', icon: '🥃', price: 7 },
  ];

  // Mock users in bar
  useEffect(() => {
    const mockUsers: VirtualBarUser[] = [
      { id: '1', username: 'RockFan99', avatar: '😎', x: 20, y: 30, status: 'online' },
      { id: '2', username: 'MusicLover', avatar: '🎸', x: 50, y: 40, status: 'online' },
      { id: '3', username: 'DrinkersOG', avatar: '👑', x: 70, y: 25, status: 'away' },
      { id: '4', username: 'PartyGirl', avatar: '💃', x: 35, y: 60, status: 'online' },
      { id: '5', username: 'BarRegular', avatar: '🍺', x: 60, y: 70, status: 'busy' },
    ];
    setUsers(mockUsers);

    // Mock messages
    const mockMessages: ChatMessage[] = [
      { id: '1', userId: '1', username: 'RockFan99', message: 'Živjo! Kdo je za poslušanje novega albuma?', timestamp: new Date(Date.now() - 300000), tier: 'fan' },
      { id: '2', userId: '2', username: 'MusicLover', message: 'Jaz sem! 🎵', timestamp: new Date(Date.now() - 240000), tier: 'free' },
      { id: '3', userId: '3', username: 'DrinkersOG', message: 'OG member reporting! 👑', timestamp: new Date(Date.now() - 180000), tier: 'og' },
      { id: '4', userId: '4', username: 'PartyGirl', message: 'Kje dobim virtualno pivo? 🍺', timestamp: new Date(Date.now() - 120000), tier: 'vip' },
    ];
    setMessages(mockMessages);

    // Simulate incoming messages
    const interval = setInterval(() => {
      const randomMessages = [
        'Odličen koncert včeraj!',
        'Kdo gre na naslednji koncert?',
        'Nova pesmi je fire! 🔥',
        'Pozdrav iz Maribora!',
        'The Drinkers so najboljši! 🎸',
      ];
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        userId: randomUser.id,
        username: randomUser.username,
        message: randomMessage,
        timestamp: new Date(),
        tier: 'fan',
      }]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleConnectDiscord = () => {
    const authUrl = getDiscordAuthUrl(Date.now().toString());
    window.open(authUrl, '_blank');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isConnected) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      userId: 'current',
      username: discordUser?.username || 'You',
      message: newMessage,
      timestamp: new Date(),
      tier: 'fan',
    }]);

    setNewMessage('');
  };

  const handleOrderDrink = (drinkId: string) => {
    setSelectedDrink(drinkId);
    const drink = DRINKS.find(d => d.id === drinkId);
    
    // Add system message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      userId: 'system',
      username: '🤖 Bartender',
      message: `🍺 ${drink?.name} served! Na zdravje!`,
      timestamp: new Date(),
      tier: 'free',
    }]);
  };

  const tierColors = {
    free: 'text-gray-400',
    fan: 'text-blue-400',
    vip: 'text-purple-400',
    og: 'text-amber-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Beer className="w-10 h-10 text-amber-500" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              Virtual Bar
            </h1>
            <Music className="w-10 h-10 text-amber-500 animate-pulse" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            Druži se z drugimi fani v virtualnem baru
          </p>
          <p className="text-sm text-rock-muted">
            🎵 Playing: {currentTrack} {isMuted ? '(Muted)' : ''}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Bar Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bar Visualization */}
            <GlassCard variant="dark" className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent" />
              
              {/* Bar Counter */}
              <div className="relative h-64 bg-amber-900/20 rounded-lg border-2 border-amber-700/30 mb-4">
                {/* Users in bar */}
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: `${user.x}%`, top: `${user.y}%` }}
                    title={user.username}
                  >
                    <div className="text-4xl relative">
                      {user.avatar}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-amber-900 ${
                        user.status === 'online' ? 'bg-green-500' :
                        user.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <div className="text-xs text-white text-center mt-1 whitespace-nowrap bg-black/50 px-2 rounded">
                      {user.username}
                    </div>
                  </motion.div>
                ))}

                {/* Bartender */}
                <div className="absolute bottom-4 right-4 text-4xl" title="Bartender">
                  🤖
                  <div className="text-xs text-white text-center mt-1 bg-black/50 px-2 rounded">
                    Bartender
                  </div>
                </div>
              </div>

              {/* Drink Menu */}
              <div className="grid grid-cols-4 gap-3">
                {DRINKS.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => handleOrderDrink(drink.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedDrink === drink.id
                        ? 'bg-amber-500/20 border-amber-500'
                        : 'bg-rock-gray/50 border-amber-700/30 hover:border-amber-500'
                    }`}
                  >
                    <div className="text-3xl mb-1">{drink.icon}</div>
                    <div className="text-xs font-medium text-white">{drink.name}</div>
                    <div className="text-xs text-amber-500">{drink.price}€</div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Chat */}
            <GlassCard variant="dark" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-amber-500" />
                  Chat
                </h2>
                <div className="flex items-center gap-2 text-sm text-rock-muted">
                  <Users className="w-4 h-4" />
                  {users.length} online
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto mb-4 space-y-3 pr-2">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-3 ${
                      msg.userId === 'current' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="text-2xl">
                      {msg.userId === 'system' ? '🤖' : '😎'}
                    </div>
                    <div className={`flex-1 ${
                      msg.userId === 'current' ? 'text-right' : ''
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.userId !== 'current' && (
                          <span className={`text-sm font-bold ${tierColors[msg.tier || 'free']}`}>
                            {msg.username}
                          </span>
                        )}
                        {msg.userId === 'current' && (
                          <span className="text-sm font-bold text-crimson">
                            {msg.username}
                          </span>
                        )}
                        {msg.userId !== 'current' && msg.userId !== 'system' && (
                          <span className="text-xs text-rock-muted">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                        msg.userId === 'current'
                          ? 'bg-crimson/20 text-white'
                          : msg.userId === 'system'
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'bg-rock-gray/50 text-white'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-rock-muted mb-4">
                    Poveži Discord za sodelovanje v chatu
                  </p>
                  <button
                    onClick={handleConnectDiscord}
                    className="btn-primary flex items-center gap-2 mx-auto"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Poveži Discord
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-rock-gray/50 border border-amber-700/30 rounded-lg text-white placeholder-rock-muted focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="btn-primary px-6 flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Music Player */}
            <GlassCard variant="dark" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Disc className="w-5 h-5 text-amber-500 animate-spin-slow" />
                  Glasba
                </h3>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-rock-gray rounded-lg transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-rock-muted" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-amber-500" />
                  )}
                </button>
              </div>

              <div className="bg-rock-gray/50 rounded-lg p-4 mb-4">
                <div className="text-sm text-rock-muted mb-1">Now Playing</div>
                <div className="text-white font-medium">{currentTrack}</div>
                <div className="text-xs text-rock-muted mt-1">The Drinkers</div>
              </div>

              {/* Visualizer */}
              <div className="flex items-end justify-center gap-1 h-16">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isMuted ? 4 : [8, 24, 12, 32, 16][i % 5],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.1,
                    }}
                    className="w-2 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full"
                  />
                ))}
              </div>
            </GlassCard>

            {/* Online Users */}
            <GlassCard variant="dark" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                V Baru ({users.length})
              </h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 bg-rock-gray/50 rounded-lg"
                  >
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        {user.username}
                      </div>
                      <div className="text-xs text-rock-muted capitalize">
                        {user.status}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Info */}
            <GlassCard variant="dark" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-bold text-white">Dogodki</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="font-medium text-amber-400 mb-1">
                    🎧 Listening Party
                  </div>
                  <div className="text-rock-muted">Petek, 21:00</div>
                  <div className="text-xs text-rock-muted mt-1">
                    Skupno poslušanje novega albuma
                  </div>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="font-medium text-purple-400 mb-1">
                    ❓ Q&A Session
                  </div>
                  <div className="text-rock-muted">Monthly (VIP+)</div>
                  <div className="text-xs text-rock-muted mt-1">
                    Vprašaj band karkoli
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
