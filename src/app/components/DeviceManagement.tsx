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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  Fab,
  Divider,
} from '@mui/material';
import { Plus, Edit, Trash2, Package, Layers, Filter } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  model: string;
  categoryId: number;
  categoryName: string;
}

interface Category {
  id: number;
  name: string;
}

export default function DeviceManagement() {
  const categories: Category[] = [
    { id: 1, name: 'IT设备' },
    { id: 2, name: '办公耗材' },
    { id: 3, name: '网络设备' },
  ];

  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: 'Dell笔记本电脑',
      model: 'XPS 15 9520',
      categoryId: 1,
      categoryName: 'IT设备',
    },
    {
      id: 2,
      name: 'HP激光打印机',
      model: 'LaserJet Pro M428',
      categoryId: 2,
      categoryName: '办公耗材',
    },
    {
      id: 3,
      name: 'ThinkPad笔记本',
      model: 'X1 Carbon Gen 10',
      categoryId: 1,
      categoryName: 'IT设备',
    },
    {
      id: 4,
      name: 'LG显示器',
      model: '27UK850-W',
      categoryId: 1,
      categoryName: 'IT设备',
    },
    {
      id: 5,
      name: 'Canon扫描仪',
      model: 'DR-C225W',
      categoryId: 2,
      categoryName: '办公耗材',
    },
    {
      id: 6,
      name: '得力订书机',
      model: '0383',
      categoryId: 2,
      categoryName: '办公耗材',
    },
    {
      id: 7,
      name: 'MacBook Pro',
      model: 'M3 Pro 14"',
      categoryId: 1,
      categoryName: 'IT设备',
    },
    {
      id: 8,
      name: '罗技无线鼠标',
      model: 'MX Master 3S',
      categoryId: 1,
      categoryName: 'IT设备',
    },
  ]);

  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    categoryId: '',
  });
  const [formError, setFormError] = useState('');

  const filteredDevices =
    filterCategory === 'all'
      ? devices
      : devices.filter((device) => device.categoryId === filterCategory);

  const handleOpenDialog = (device?: Device) => {
    if (device) {
      setEditingDevice(device);
      setFormData({
        name: device.name,
        model: device.model,
        categoryId: device.categoryId.toString(),
      });
    } else {
      setEditingDevice(null);
      setFormData({ name: '', model: '', categoryId: '' });
    }
    setFormError('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingDevice(null);
    setFormData({ name: '', model: '', categoryId: '' });
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 1) {
      setFormError('设备名称必填');
      return false;
    }
    if (!formData.categoryId) {
      setFormError('请选择设备分类');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const categoryId = parseInt(formData.categoryId);
    const category = categories.find((c) => c.id === categoryId);

    if (editingDevice) {
      setDevices(
        devices.map((dev) =>
          dev.id === editingDevice.id
            ? {
                ...dev,
                name: formData.name,
                model: formData.model,
                categoryId: categoryId,
                categoryName: category?.name || '',
              }
            : dev
        )
      );
    } else {
      const newDevice: Device = {
        id: Math.max(...devices.map((d) => d.id), 0) + 1,
        name: formData.name,
        model: formData.model,
        categoryId: categoryId,
        categoryName: category?.name || '',
      };
      setDevices([newDevice, ...devices]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除该设备吗?')) {
      setDevices(devices.filter((dev) => dev.id !== id));
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 2 }} elevation={1}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Filter size={18} color="#666" />
            <Typography variant="body2" fontWeight="medium">
              筛选设备
            </Typography>
          </Box>
          <FormControl fullWidth size="small">
            <InputLabel>按分类筛选</InputLabel>
            <Select
              value={filterCategory}
              label="按分类筛选"
              onChange={(e) => setFilterCategory(e.target.value as number | 'all')}
            >
              <MenuItem value="all">全部分类</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          共 {filteredDevices.length} 个设备
          {filterCategory !== 'all' &&
            ` (${categories.find((c) => c.id === filterCategory)?.name})`}
        </Typography>
      </Box>

      <Stack spacing={2}>
        {filteredDevices.map((device) => (
          <Card key={device.id} elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {device.name}
                  </Typography>
                  <Chip
                    label={device.categoryName}
                    size="small"
                    color="primary"
                    icon={<Layers size={14} />}
                  />
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(device)}
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(device.id)}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Package size={16} color="#666" />
                <Typography variant="body2" color="text.secondary">
                  型号: {device.model || '未填写'}
                </Typography>
              </Box>
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
        <DialogTitle>{editingDevice ? '编辑设备' : '添加设备'}</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="设备名称"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            helperText="必填项"
            required
          />
          <TextField
            fullWidth
            label="型号"
            margin="normal"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            helperText="选填项"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>所属分类</InputLabel>
            <Select
              value={formData.categoryId}
              label="所属分类"
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>必须选择一个分类</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingDevice ? '保存' : '添加'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
