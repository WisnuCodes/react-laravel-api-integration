import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api/client';
import {
  Box, Container, Typography, TextField, IconButton, 
  CircularProgress, Avatar, Paper, Divider, List, 
  ListItem, ListItemAvatar, ListItemText, ListItemButton, Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Messages() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeChatName, setActiveChatName] = useState('');
  const [messages, setMessages] = useState([]);
  
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef(null);
  const prevMsgCountRef = useRef(0);
  const isFirstLoadRef = useRef(true);

  // Cek apakah ada userId dari URL query param (misal dari tombol Chat Penjual)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const userName = params.get('userName') || 'Penjual';
    if (userId) {
      setActiveChatId(parseInt(userId));
      setActiveChatName(userName);
      
      // Bersihkan query param agar rapi
      navigate('/messages', { replace: true });
    }
  }, [location, navigate]);

  // Polling fetching conversations (kiri) — setiap 8 detik
  useEffect(() => {
    let intervalId;
    const fetchConversations = async () => {
      try {
        const data = await apiRequest('/messages');
        setConversations(data);
      } catch (err) {
        console.error("Gagal load obrolan", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
    intervalId = setInterval(fetchConversations, 8000);
    return () => clearInterval(intervalId);
  }, []);

  // Polling fetching aktif messages (kanan) — setiap 5 detik
  useEffect(() => {
    if (!activeChatId) return;

    isFirstLoadRef.current = true;
    prevMsgCountRef.current = 0;

    let intervalId;
    const fetchMessages = async () => {
      try {
        const data = await apiRequest(`/messages/${activeChatId}`);
        setMessages(data);
      } catch (err) {
        console.error("Gagal load pesan detail", err);
      }
    };
    
    fetchMessages();
    intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [activeChatId]);

  // Auto scroll ke bawah HANYA jika ada pesan baru
  useEffect(() => {
    const currentCount = messages.length;
    if (currentCount > prevMsgCountRef.current || isFirstLoadRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: isFirstLoadRef.current ? 'instant' : 'smooth' });
      isFirstLoadRef.current = false;
    }
    prevMsgCountRef.current = currentCount;
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatId) return;

    setSending(true);
    try {
      const payload = {
        receiver_id: activeChatId,
        message: newMessage
      };
      await apiRequest('/messages', { method: 'POST', body: JSON.stringify(payload) });
      setNewMessage('');
      
      // Fetch ulang agar instan
      const data = await apiRequest(`/messages/${activeChatId}`);
      setMessages(data);
    } catch (err) {
      console.error("Gagal mengirim pesan", err);
    } finally {
      setSending(false);
    }
  };

  const handleSelectChat = (userId, name) => {
    setActiveChatId(userId);
    setActiveChatName(name);
  };

  if (!user) return null;

  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 0, md: 3 }, py: { xs: 0, md: 4 }, flexGrow: 1, display: 'flex' }}>
        
        <Paper elevation={0} sx={{ 
          display: 'flex', width: '100%', 
          borderRadius: { xs: 0, md: '16px' }, 
          border: { xs: 'none', md: '1px solid #EAEAEA' }, 
          overflow: 'hidden', height: { xs: 'calc(100vh - 56px)', md: '75vh' },
          bgcolor: '#ffffff'
        }}>
          
          {/* Kolom Kiri: Daftar Obrolan */}
          <Box sx={{ 
            width: { xs: activeChatId ? '0%' : '100%', md: '320px' }, 
            borderRight: '1px solid #EAEAEA',
            display: { xs: activeChatId ? 'none' : 'flex', md: 'flex' },
            flexDirection: 'column'
          }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid #f4f4f5', bgcolor: '#ffffff' }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: '#09090b', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ChatBubbleOutlinedIcon fontSize="small" /> Kotak Masuk
              </Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', flexGrow: 1, bgcolor: '#ffffff' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress size={30} sx={{ color: '#09090b' }} /></Box>
              ) : conversations.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#71717a' }}>Belum ada pesan.</Typography>
                </Box>
              ) : (
                <List disablePadding>
                  {conversations.map((chat) => (
                    <Box key={chat.user_id}>
                      <ListItemButton 
                        selected={activeChatId === chat.user_id}
                        onClick={() => handleSelectChat(chat.user_id, chat.name)}
                        sx={{
                          py: 2, px: 2.5,
                          '&.Mui-selected': { bgcolor: '#f4f4f5' },
                          '&:hover': { bgcolor: '#fafafa' }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#09090b', color: '#fff', width: 44, height: 44, fontWeight: 700 }}>
                            {chat.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography fontWeight={700} fontSize="0.95rem" sx={{ color: '#09090b' }}>
                                {chat.name}
                              </Typography>
                              {!chat.is_read && chat.sender_id !== user.user_id && (
                                <Badge color="error" variant="dot" />
                              )}
                            </Box>
                          } 
                          secondary={
                            <Typography variant="body2" sx={{ color: '#71717a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {chat.last_message}
                            </Typography>
                          } 
                        />
                      </ListItemButton>
                      <Divider component="li" />
                    </Box>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Kolom Kanan: Jendela Obrolan */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: activeChatId ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
            bgcolor: '#FAFAFA'
          }}>
            {activeChatId ? (
              <>
                {/* Header Chat */}
                <Box sx={{ p: 2, borderBottom: '1px solid #EAEAEA', bgcolor: '#ffffff', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton 
                    onClick={() => setActiveChatId(null)}
                    sx={{ display: { xs: 'flex', md: 'none' }, color: '#09090b' }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Avatar sx={{ bgcolor: '#09090b', color: '#fff', width: 40, height: 40, fontWeight: 700 }}>
                    {activeChatName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#09090b' }}>
                    {activeChatName}
                  </Typography>
                </Box>

                {/* Area Pesan */}
                <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {messages.length === 0 ? (
                    <Box sx={{ m: 'auto', textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#71717a' }}>Kirim pesan untuk memulai percakapan.</Typography>
                    </Box>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.sender_id === user.user_id;
                      return (
                        <Box key={msg.id} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                          <Box sx={{ 
                            maxWidth: '75%', 
                            p: 2, 
                            borderRadius: '16px',
                            bgcolor: isMe ? '#09090b' : '#ffffff',
                            color: isMe ? '#ffffff' : '#09090b',
                            border: isMe ? 'none' : '1px solid #EAEAEA',
                            borderBottomRightRadius: isMe ? '4px' : '16px',
                            borderBottomLeftRadius: isMe ? '16px' : '4px',
                            boxShadow: isMe ? 'none' : '0 1px 2px rgba(0,0,0,0.02)'
                          }}>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                              {msg.message}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, opacity: 0.7, fontSize: '0.65rem' }}>
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Area Input (Kirim Pesan) */}
                <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, bgcolor: '#ffffff', borderTop: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                    autoComplete="off"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                        bgcolor: '#f4f4f5',
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': { border: 'none' },
                        '& input': { py: 1.5, px: 2, fontSize: '0.95rem' }
                      }
                    }}
                  />
                  <IconButton 
                    type="submit" 
                    disabled={!newMessage.trim() || sending}
                    sx={{ 
                      bgcolor: '#09090b', color: '#fff', width: 44, height: 44,
                      '&:hover': { bgcolor: '#27272a' },
                      '&.Mui-disabled': { bgcolor: '#e4e4e7', color: '#a1a1aa' }
                    }}
                  >
                    {sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon fontSize="small" sx={{ ml: 0.5 }} />}
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box sx={{ m: 'auto', textAlign: 'center', color: '#a1a1aa' }}>
                <ChatBubbleOutlinedIcon sx={{ fontSize: 64, opacity: 0.2, mb: 2 }} />
                <Typography variant="body1" fontWeight={500}>Pilih percakapan untuk mulai membaca</Typography>
              </Box>
            )}
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}
