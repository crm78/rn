import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Card,
  CardContent,
  Fab,
  Divider,
  Stack,
} from '@mui/material';
import { Plus, Edit, Trash2, Mail, Calendar } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  age: number;
  email: string;
  createdAt: string;
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: '张三',
      age: 28,
      email: 'zhangsan@company.com',
      createdAt: '2024-05-20 10:30',
    },
    {
      id: 2,
      name: '李四',
      age: 32,
      email: 'lisi@company.com',
      createdAt: '2024-05-19 14:20',
    },
    {
      id: 3,
      name: '王五',
      age: 25,
      email: 'wangwu@company.com',
      createdAt: '2024-05-18 09:15',
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });
  const [formError, setFormError] = useState('');

  const handleOpenDialog = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        age: employee.age.toString(),
        email: employee.email,
      });
    } else {
      setEditingEmployee(null);
      setFormData({ name: '', age: '', email: '' });
    }
    setFormError('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployee(null);
    setFormData({ name: '', age: '', email: '' });
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 1 || formData.name.length > 20) {
      setFormError('姓名必填，长度1-20个字符');
      return false;
    }
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 18 || age > 60) {
      setFormError('年龄必须在18-60之间');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('邮箱格式不正确');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name: formData.name,
                age: parseInt(formData.age),
                email: formData.email,
              }
            : emp
        )
      );
    } else {
      const newEmployee: Employee = {
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
        name: formData.name,
        age: parseInt(formData.age),
        email: formData.email,
        createdAt: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }).replace(/\//g, '-'),
      };
      setEmployees([newEmployee, ...employees]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除该员工吗?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          共 {employees.length} 名员工
        </Typography>
      </Box>

      <Stack spacing={2}>
        {employees.map((employee) => (
          <Card key={employee.id} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {employee.name}
                  </Typography>
                  <Chip label={`${employee.age}岁`} size="small" color="primary" />
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(employee)}
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">
                    {employee.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">
                    创建于 {employee.createdAt}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <Plus size={24} />
      </Fab>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>{editingEmployee ? '编辑员工' : '添加员工'}</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="姓名"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            helperText="1-20个字符"
          />
          <TextField
            fullWidth
            label="年龄"
            type="number"
            margin="normal"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            helperText="18-60岁"
          />
          <TextField
            fullWidth
            label="邮箱"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            helperText="请输入有效的邮箱地址"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingEmployee ? '保存' : '添加'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
