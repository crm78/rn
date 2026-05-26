import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { Users, Package, Layers, LogOut } from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import CategoryManagement from './CategoryManagement';
import DeviceManagement from './DeviceManagement';

interface DashboardProps {
  onLogout: () => void;
}

type Page = 'employees' | 'categories' | 'devices';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>('employees');

  const renderPage = () => {
    switch (currentPage) {
      case 'employees':
        return <EmployeeManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'devices':
        return <DeviceManagement />;
      default:
        return <EmployeeManagement />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'employees':
        return '员工管理';
      case 'categories':
        return '设备分类';
      case 'devices':
        return '设备管理';
      default:
        return '员工管理';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          <IconButton color="inherit" onClick={onLogout} title="退出">
            <LogOut size={20} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          pt: 9,
          pb: 9,
          overflow: 'auto',
        }}
      >
        {renderPage()}
      </Box>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={currentPage}
          onChange={(event, newValue) => {
            setCurrentPage(newValue as Page);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="员工"
            value="employees"
            icon={<Users size={22} />}
          />
          <BottomNavigationAction
            label="分类"
            value="categories"
            icon={<Layers size={22} />}
          />
          <BottomNavigationAction
            label="设备"
            value="devices"
            icon={<Package size={22} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
