
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserPlus,
  Settings,
  FileText,
  MessageSquare,
  Stethoscope,
  Plus,
  Clock
} from 'lucide-react';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Agenda',
    url: '/agenda',
    icon: Calendar,
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: Users,
  },
  {
    title: 'Profissionais',
    url: '/professionals',
    icon: UserPlus,
  },
  {
    title: 'Serviços',
    url: '/services',
    icon: Stethoscope,
  },
  {
    title: 'Prontuários',
    url: '/medical-records',
    icon: FileText,
  },
  {
    title: 'Marketing',
    url: '/marketing',
    icon: MessageSquare,
  },
  {
    title: 'Configurações',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible>
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4">
          <Logo size={collapsed ? 'sm' : 'md'} showText={!collapsed} />
        </div>

        {!collapsed && (
          <div className="px-4 pb-4">
            <Button 
              className="w-full bg-gradient-clinvia hover:opacity-90 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
