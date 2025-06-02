
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  User,
  FileText,
  MessageSquare,
  Stethoscope,
  UserPlus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../ui/logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
  { title: 'Agenda', url: '/agenda', icon: Calendar },
  { title: 'Pacientes', url: '/patients', icon: Users },
  { title: 'Profissionais', url: '/professionals', icon: Stethoscope },
  { title: 'Procedimentos', url: '/procedures', icon: FileText },
  { title: 'Marketing', url: '/marketing', icon: MessageSquare },
  { title: 'Configurações', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [agendaOpen, setAgendaOpen] = useState(currentPath.startsWith('/agenda'));

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (path: string) =>
    isActive(path) 
      ? "bg-blue-100 text-blue-700 font-medium border-r-2 border-blue-700" 
      : "text-gray-700 hover:bg-gray-100";

  return (
    <Sidebar
      className={open ? "w-64" : "w-16"}
      collapsible="icon"
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clinvia
              </h1>
              <p className="text-xs text-gray-500">Gestão Inteligente</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className={open ? "block" : "hidden"}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {open && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/novo-agendamento" 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 font-medium"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Novo Agendamento</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/novo-paciente" 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-600 hover:bg-green-50 font-medium"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Novo Paciente</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <div className="p-4 border-t">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
