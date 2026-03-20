'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Beer, Clock, Users, Music, MapPin, Star, Calendar, Volume2 } from 'lucide-react';

interface BarStool {
  id: number;
  occupied: boolean;
  occupant: string;
  joinedAt: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
}

const avatars = ['🍺', '🍻', '🥃', '🍷', '🍸', '🍾'];
const names = ['Pivni Prijatelj', 'Rock Fan', 'Glasbenik', 'Barman', 'Pivovar', 'Koncertnik'];

export default function VirtualBar() {
  const [stools, setStools] = useState<BarStool[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [userStool, setUserStool] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initialize bar stools
    const initialStools: BarStool[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      occupied: false,
      occupant: '',
      joinedAt: ''
    }));
    setStools(initialStools);

    // Add some AI patrons
    setTimeout(() => addAIPatrons(), 1000);

    // Update time
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addAIPatrons = () => {
    const aiPatrons = [
      { name: 'Matjaž Živković', stool: 1 },
      { name: 'Simon Kavšek', stool: 3 },
      { name: 'Robert Likar', stool: 5 },
      { name: 'Miro Mutvar', stool: 7 },
      { name: 'Roman Milavec', stool: 9 },
    ];

    aiPatrons.forEach(patron => {
      setStools(prev => prev.map(stool => 
        stool.id === patron.stool 
          ? { ...stool, occupied: true, occupant: patron.name, joinedAt: new Date().toISOString() }
          : stool
      ));

      // Add welcome message
      setTimeout(() => {
        const message: ChatMessage = {
          id: Date.now().toString(),
          user: patron.name,
          message: `Pijemo ga radi! 🍺 Na srečno v The Drinkers baru!`,
          timestamp: new Date().toISOString(),
          avatar: '🎸'
        };
        setMessages(prev => [...prev, message]);
      }, Math.random() * 3000 + 1000);
    });
  };

  const joinBar = () => {
    if (!userName.trim()) return;

    // Find empty stool
    const emptyStool = stools.find(stool => !stool.occupied);
    if (!emptyStool) {
      alert('Bar je poln! Počakaj, da se kdo odpravi.');
      return;
    }

    // Occupy stool
    setStools(prev => prev.map(stool => 
      stool.id === emptyStool.id 
        ? { ...stool, occupied: true, occupant: userName, joinedAt: new Date().toISOString() }
        : stool
    ));

    setUserStool(emptyStool.id);
    setIsJoined(true);

    // Add join message
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: `Prispel/a sem v bar! 🍺 Pijemo ga radi!`,
      timestamp: new Date().toISOString(),
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };
    setMessages(prev => [...prev, message]);
  };

  const leaveBar = () => {
    if (userStool === null) return;

    // Free stool
    setStools(prev => prev.map(stool => 
      stool.id === userStool 
        ? { ...stool, occupied: false, occupant: '', joinedAt: '' }
        : stool
    ));

    // Add leave message
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: `Odhajam! Nasvidenje! 🍻`,
      timestamp: new Date().toISOString(),
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };
    setMessages(prev => [...prev, message]);

    setUserStool(null);
    setIsJoined(false);
    setUserName('');
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !isJoined) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: newMessage,
      timestamp: new Date().toISOString(),
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate AI responses
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const aiResponses = [
          'Slovensko pivo je najbolje! 🍺',
          'Pijemo ga radi od 1993! 🎸',
          'Kdo piva, tudi ziva! 🍻',
          'The Drinkers rule! 🤘',
          'Na zdravje! 🥃',
        ];
        
        const randomPatron = stools.find(s => s.occupied && s.occupant !== userName);
        if (randomPatron) {
          const response: ChatMessage = {
            id: (Date.now() + 1).toString(),
            user: randomPatron.occupant,
            message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
            timestamp: new Date().toISOString(),
            avatar: '🎸'
          };
          setMessages(prev => [...prev, response]);
        }
      }, Math.random() * 2000 + 1000);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-rock-black to-rock-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Beer className="w-12 h-12 text-crimson" />
            <h1 className="text-5xl font-bold text-gradient">The Drinkers Virtual Bar</h1>
            <MapPin className="w-12 h-12 text-crimson" />
          </div>
          <p className="text-xl text-rock-muted">Pridruži se pivnici! {currentTime.toLocaleTimeString('sl-SI')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-8 border border-crimson/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-crimson" />
                Bar Stools ({stools.filter(s => s.occupied).length}/12)
              </h2>
              
              {/* Stools Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {stools.map((stool) => (
                  <motion.div
                    key={stool.id}
                    whileHover={{ scale: 1.05 }}
                    className={`relative p-4 rounded-2xl border-2 transition-all ${
                      stool.occupied 
                        ? 'bg-crimson/20 border-crimson' 
                        : 'bg-rock-gray/30 border-rock-border'
                    } ${userStool === stool.id ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {stool.occupied ? '🪑' : '🪑'}
                      </div>
                      <div className="text-xs font-medium">
                        {stool.occupied ? (
                          <div>
                            <p className="truncate">{stool.occupant}</p>
                            <p className="text-rock-muted">{formatTime(stool.joinedAt)}</p>
                          </div>
                        ) : (
                          <p className="text-rock-muted">Stool {stool.id}</p>
                        )}
                      </div>
                      {userStool === stool.id && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                          YOU
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Join/Leave Controls */}
              {!isJoined ? (
                <div className="bg-rock-gray/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Join the Bar</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex-1 px-4 py-2 bg-rock-surface border border-rock-border rounded-lg text-white placeholder-rock-muted"
                    />
                    <button
                      onClick={joinBar}
                      className="btn-primary"
                    >
                      Join Bar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-crimson/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Welcome, {userName}!</h3>
                      <p className="text-rock-muted">You&apos;re at stool {userStool}</p>
                    </div>
                    <button
                      onClick={leaveBar}
                      className="btn-secondary"
                    >
                      Leave Bar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-rock-surface/80 backdrop-blur-lg rounded-3xl p-6 border border-crimson/30 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-crimson" />
                Bar Chat
              </h2>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.user === userName ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="text-2xl">{message.avatar}</div>
                    <div className={`max-w-[80%] ${
                      message.user === userName 
                        ? 'bg-crimson text-white' 
                        : 'bg-rock-gray text-white'
                    } rounded-2xl px-4 py-2`}>
                      <div className="font-medium text-sm">{message.user}</div>
                      <div>{message.message}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              {isJoined && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 px-4 py-2 bg-rock-gray border border-rock-border rounded-lg text-white placeholder-rock-muted"
                  />
                  <button
                    onClick={sendMessage}
                    className="btn-primary"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bar Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-crimson" />
                <span>Open 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-crimson" />
                <span>Since 1993</span>
              </div>
              <div className="flex items-center gap-2">
                <Beer className="w-5 h-5 text-crimson" />
                <span>Pijemo ga radi!</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
