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
  Stack,
  Fab,
} from '@mui/material';
import { Plus, Edit, Trash2, Layers, Eye, Package } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  deviceCount: number;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'IT设备', deviceCount: 5 },
    { id: 2, name: '办公耗材', deviceCount: 3 },
    { id: 3, name: '网络设备', deviceCount: 0 },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [formError, setFormError] = useState('');

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      setEditingCategory(null);
      setFormData({ name: '' });
    }
    setFormError('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: '' });
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 1 || formData.name.length > 20) {
      setFormError('分类名称必填，长度1-20个字符');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: formData.name }
            : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: formData.name,
        deviceCount: 0,
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseDialog();
  };

  const handleDelete = (category: Category) => {
    if (category.deviceCount > 0) {
      alert(`分类下存在${category.deviceCount}个设备，无法删除`);
      return;
    }
    if (window.confirm('确定要删除该分类吗?')) {
      setCategories(categories.filter((cat) => cat.id !== category.id));
    }
  };

  const handleViewDevices = (category: Category) => {
    alert(`查看"${category.name}"分类下的设备\n(此功能在设备管理模块中实现)`);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          共 {categories.length} 个分类
        </Typography>
      </Box>

      <Stack spacing={2}>
        {categories.map((category) => (
          <Card key={category.id} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'primary.light',
                    }}
                  >
                    <Layers size={24} color="#1976d2" />
                  </Box>
                  <Box>
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {category.id}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(category)}
                    disabled={category.deviceCount > 0}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Package size={16} color="#666" />
                <Typography variant="body2" color="text.secondary">
                  {category.deviceCount} 个设备
                </Typography>
                {category.deviceCount > 0 && (
                  <Chip label="有设备" size="small" color="primary" />
                )}
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Eye size={18} />}
                onClick={() => handleViewDevices(category)}
              >
                查看设备
              </Button>
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
        <DialogTitle>{editingCategory ? '编辑分类' : '添加分类'}</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="分类名称"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            helperText="1-20个字符"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCategory ? '保存' : '添加'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
