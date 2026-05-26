import { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('请填写用户名和密码');
      return;
    }

    // 模拟登录验证 (默认账号: admin / admin123)
    if (username === 'admin' && password === 'admin123') {
      setError('');
      onLogin();
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <Box
      className="size-full"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xs" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'white',
              mb: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Lock size={40} color="#667eea" />
          </Box>
          <Typography variant="h5" component="h1" fontWeight="bold" color="white" gutterBottom>
            企业办公管理系统
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            请登录以继续
          </Typography>
        </Box>

        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="用户名"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              fullWidth
              label="密码"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
            >
              登录
            </Button>
          </form>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
              测试账号
            </Typography>
            <Typography variant="body2">
              用户名: <strong>admin</strong>
            </Typography>
            <Typography variant="body2">
              密码: <strong>admin123</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
